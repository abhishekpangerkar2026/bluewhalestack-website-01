using System.Data;
using System.Security.Cryptography;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;

namespace WaslFit.Api;

public record RegisterRequest(string Phone, string Name, string Password);
public record LoginRequest(string Phone, string Password);
public record LeaseRequest(Guid CommunityId, string Unit);
public record SlotBookingRequest(Guid SlotId);
public record TrainerBookingRequest(Guid TrainerId, DateTime StartsAt);
public record CheckInRequest(string QrToken);
public record TopUpRequest(decimal AmountAed);
public record SlotDto(Guid Id, DateTime StartsAt, DateTime EndsAt, Audience Audience, decimal PriceAed, int Capacity, int Booked)
{
    public int SpotsLeft => Capacity - Booked;
}

public static partial class ApiRoutes
{
    [GeneratedRegex(@"^\+?\d{8,15}$")]
    private static partial Regex PhoneRegex();

    private static IResult Problem(int status, string detail) => Results.Problem(statusCode: status, detail: detail);

    private static string NewQrToken() => Convert.ToBase64String(RandomNumberGenerator.GetBytes(24))
        .Replace('+', '-').Replace('/', '_').TrimEnd('=');

    private static async Task<decimal> BalanceAsync(AppDb db, Guid userId) =>
        await db.WalletTxns.Where(t => t.UserId == userId).SumAsync(t => t.AmountAed);

    private static async Task<bool> HasLeaseAsync(AppDb db, Guid userId, Guid communityId) =>
        await db.Leases.AnyAsync(l => l.UserId == userId && l.CommunityId == communityId && l.EndDate > DateTime.UtcNow);

    // Adds a charge to the current unit of work. Caller saves.
    private static async Task<bool> TryChargeAsync(AppDb db, Guid userId, decimal price, string reference)
    {
        if (price <= 0) return true;
        if (await BalanceAsync(db, userId) < price) return false;
        db.WalletTxns.Add(new WalletTxn { UserId = userId, AmountAed = -price, Kind = TxnKind.Charge, Reference = reference });
        return true;
    }

    public static void Map(WebApplication app)
    {
        var auth = app.MapGroup("/auth").WithTags("Auth");

        auth.MapPost("/register", async (RegisterRequest req, AppDb db, TokenService tokens) =>
        {
            var phone = req.Phone.Trim();
            if (!PhoneRegex().IsMatch(phone)) return Problem(400, "Enter a valid phone number, e.g. +971501234567.");
            if (string.IsNullOrWhiteSpace(req.Name)) return Problem(400, "Name is required.");
            if (req.Password.Length < 8) return Problem(400, "Password must be at least 8 characters.");
            if (await db.Users.AnyAsync(u => u.Phone == phone)) return Problem(409, "This phone number is already registered.");

            var user = new User { Phone = phone, Name = req.Name.Trim(), PasswordHash = BCrypt.Net.BCrypt.HashPassword(req.Password) };
            db.Users.Add(user);
            await db.SaveChangesAsync();
            return Results.Ok(new { token = tokens.Create(user), user = new { user.Id, user.Name, user.Phone, user.Role } });
        });

        auth.MapPost("/login", async (LoginRequest req, AppDb db, TokenService tokens) =>
        {
            var user = await db.Users.FirstOrDefaultAsync(u => u.Phone == req.Phone.Trim());
            if (user is null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
                return Problem(401, "Incorrect phone number or password.");
            return Results.Ok(new { token = tokens.Create(user), user = new { user.Id, user.Name, user.Phone, user.Role } });
        });

        var api = app.MapGroup("").RequireAuthorization();

        // ---- Profile and lease ----
        api.MapGet("/me", async (ClaimsPrincipal p, AppDb db) =>
        {
            var uid = p.UserId();
            var user = await db.Users.FindAsync(uid);
            if (user is null) return Results.NotFound();
            var leases = await db.Leases.Where(l => l.UserId == uid)
                .Select(l => new { l.Id, l.CommunityId, Community = l.Community!.Name, l.Unit, l.EndDate }).ToListAsync();
            return Results.Ok(new { user.Id, user.Name, user.Phone, user.Role, leases });
        }).WithTags("Profile");

        // Stand-in for verification against the Wasl leasing system. Off unless SELF_SERVE_LEASE=true.
        api.MapPost("/me/leases", async (LeaseRequest req, ClaimsPrincipal p, AppDb db, IConfiguration cfg) =>
        {
            if (!cfg.GetValue<bool>("SELF_SERVE_LEASE"))
                return Problem(501, "Lease verification against Wasl is not connected yet.");
            if (string.IsNullOrWhiteSpace(req.Unit)) return Problem(400, "Unit is required.");
            if (!await db.Communities.AnyAsync(c => c.Id == req.CommunityId)) return Problem(404, "Community not found.");

            var uid = p.UserId();
            var unit = req.Unit.Trim();
            var existing = await db.Leases.FirstOrDefaultAsync(l => l.UserId == uid && l.CommunityId == req.CommunityId);
            if (existing is not null) { existing.Unit = unit; existing.EndDate = DateTime.UtcNow.AddYears(1); }
            else db.Leases.Add(new Lease { UserId = uid, CommunityId = req.CommunityId, Unit = unit, EndDate = DateTime.UtcNow.AddYears(1) });
            await db.SaveChangesAsync();
            return Results.NoContent();
        }).WithTags("Profile");

        // ---- Communities and facilities ----
        api.MapGet("/communities", async (AppDb db) =>
            Results.Ok(await db.Communities.OrderBy(c => c.Name).Select(c => new { c.Id, c.Name, c.Area }).ToListAsync()))
            .WithTags("Facilities");

        api.MapGet("/communities/{id:guid}/facilities", async (Guid id, AppDb db) =>
            Results.Ok(await db.Facilities.Where(f => f.CommunityId == id)
                .Select(f => new { f.Id, f.Name, f.Type, f.Capacity }).ToListAsync()))
            .WithTags("Facilities");

        api.MapGet("/facilities/{id:guid}/occupancy", async (Guid id, AppDb db) =>
        {
            var facility = await db.Facilities.FindAsync(id);
            if (facility is null) return Results.NotFound();
            var now = DateTime.UtcNow;
            var inside = await db.Bookings.CountAsync(b => b.Slot!.FacilityId == id
                && b.Status == BookingStatus.CheckedIn && b.StartsAt <= now && b.EndsAt > now);
            var pct = facility.Capacity == 0 ? 0 : inside * 100 / facility.Capacity;
            return Results.Ok(new { facility.Capacity, Inside = inside, Level = pct < 40 ? "Quiet" : pct < 75 ? "Moderate" : "Busy" });
        }).WithTags("Facilities");

        api.MapGet("/facilities/{id:guid}/slots", async (Guid id, string? date, AppDb db) =>
        {
            var day = DateTime.UtcNow.Add(Seed.Dubai).Date;
            if (!string.IsNullOrEmpty(date) && !DateTime.TryParse(date, out day)) return Problem(400, "date must be yyyy-MM-dd.");
            var from = DateTime.SpecifyKind(day.Date - Seed.Dubai, DateTimeKind.Utc);
            var to = from.AddDays(1);
            var slots = await db.Slots.Where(s => s.FacilityId == id && s.StartsAt >= from && s.StartsAt < to)
                .OrderBy(s => s.StartsAt)
                .Select(s => new SlotDto(s.Id, s.StartsAt, s.EndsAt, s.Audience, s.PriceAed, s.Capacity,
                    db.Bookings.Count(b => b.SlotId == s.Id && b.Status != BookingStatus.Cancelled)))
                .ToListAsync();
            return Results.Ok(slots);
        }).WithTags("Facilities");

        // ---- Trainers ----
        api.MapGet("/trainers", async (string? speciality, AppDb db) =>
        {
            var q = db.Trainers.Where(t => t.Verified);
            if (!string.IsNullOrWhiteSpace(speciality)) q = q.Where(t => t.Speciality == speciality);
            return Results.Ok(await q.OrderByDescending(t => t.Rating)
                .Select(t => new { t.Id, t.User!.Name, t.Speciality, t.Languages, t.RateAed, t.Rating, t.ReviewCount }).ToListAsync());
        }).WithTags("Trainers");

        api.MapGet("/trainers/{id:guid}", async (Guid id, AppDb db) =>
        {
            var t = await db.Trainers.Where(x => x.Id == id)
                .Select(x => new { x.Id, x.User!.Name, x.Speciality, x.Languages, x.Bio, x.RateAed, x.Rating, x.ReviewCount, x.Verified, x.CommunityId })
                .FirstOrDefaultAsync();
            return t is null ? Results.NotFound() : Results.Ok(t);
        }).WithTags("Trainers");

        // ---- Bookings ----
        api.MapPost("/bookings/slot", async (SlotBookingRequest req, ClaimsPrincipal p, AppDb db) =>
        {
            var uid = p.UserId();
            await using var tx = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable);
            try
            {
                var slot = await db.Slots.Include(s => s.Facility).FirstOrDefaultAsync(s => s.Id == req.SlotId);
                if (slot is null) return Problem(404, "Slot not found.");
                if (slot.StartsAt <= DateTime.UtcNow) return Problem(400, "This slot has already started.");
                if (!await HasLeaseAsync(db, uid, slot.Facility!.CommunityId))
                    return Problem(403, "An active Wasl lease in this community is required.");
                if (await db.Bookings.AnyAsync(b => b.UserId == uid && b.SlotId == slot.Id && b.Status != BookingStatus.Cancelled))
                    return Problem(409, "You already booked this slot.");

                var booked = await db.Bookings.CountAsync(b => b.SlotId == slot.Id && b.Status != BookingStatus.Cancelled);
                if (booked >= slot.Capacity) return Problem(409, "This slot is full.");
                if (!await TryChargeAsync(db, uid, slot.PriceAed, $"slot:{slot.Id}"))
                    return Problem(402, "Insufficient wallet balance.");

                var booking = new Booking
                {
                    UserId = uid, SlotId = slot.Id, CommunityId = slot.Facility.CommunityId,
                    StartsAt = slot.StartsAt, EndsAt = slot.EndsAt, PriceAed = slot.PriceAed, QrToken = NewQrToken(),
                };
                db.Bookings.Add(booking);
                await db.SaveChangesAsync();
                await tx.CommitAsync();
                return Results.Ok(new { booking.Id, booking.StartsAt, booking.EndsAt, booking.PriceAed, booking.QrToken });
            }
            catch (Exception ex) when (ex is DbUpdateException or InvalidOperationException or Npgsql.PostgresException)
            {
                return Problem(409, "Another booking changed availability. Please try again.");
            }
        }).WithTags("Bookings");

        api.MapPost("/bookings/trainer", async (TrainerBookingRequest req, ClaimsPrincipal p, AppDb db) =>
        {
            var uid = p.UserId();
            var start = DateTime.SpecifyKind(req.StartsAt, DateTimeKind.Utc);
            var end = start.AddHours(1);
            if (start <= DateTime.UtcNow) return Problem(400, "Pick a time in the future.");

            await using var tx = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable);
            try
            {
                var trainer = await db.Trainers.FirstOrDefaultAsync(t => t.Id == req.TrainerId && t.Verified);
                if (trainer is null) return Problem(404, "Trainer not found.");
                if (!await HasLeaseAsync(db, uid, trainer.CommunityId))
                    return Problem(403, "An active Wasl lease in this community is required.");
                if (await db.Bookings.AnyAsync(b => b.TrainerId == trainer.Id && b.Status != BookingStatus.Cancelled
                        && b.StartsAt < end && b.EndsAt > start))
                    return Problem(409, "This trainer is already booked at that time.");
                if (!await TryChargeAsync(db, uid, trainer.RateAed, $"trainer:{trainer.Id}"))
                    return Problem(402, "Insufficient wallet balance.");

                var booking = new Booking
                {
                    UserId = uid, TrainerId = trainer.Id, CommunityId = trainer.CommunityId,
                    StartsAt = start, EndsAt = end, PriceAed = trainer.RateAed, QrToken = NewQrToken(),
                };
                db.Bookings.Add(booking);
                await db.SaveChangesAsync();
                await tx.CommitAsync();
                return Results.Ok(new { booking.Id, booking.StartsAt, booking.EndsAt, booking.PriceAed, booking.QrToken });
            }
            catch (Exception ex) when (ex is DbUpdateException or InvalidOperationException or Npgsql.PostgresException)
            {
                return Problem(409, "Another booking changed availability. Please try again.");
            }
        }).WithTags("Bookings");

        api.MapGet("/bookings/mine", async (ClaimsPrincipal p, AppDb db) =>
        {
            var uid = p.UserId();
            var rows = await db.Bookings.Where(b => b.UserId == uid).OrderBy(b => b.StartsAt)
                .Select(b => new
                {
                    b.Id, b.StartsAt, b.EndsAt, b.PriceAed, b.Status, b.QrToken,
                    Kind = b.TrainerId != null ? "Trainer" : "Slot",
                    Trainer = b.TrainerId != null ? b.Trainer!.User!.Name : null,
                    Facility = b.SlotId != null ? b.Slot!.Facility!.Name : null,
                }).ToListAsync();
            return Results.Ok(rows);
        }).WithTags("Bookings");

        // Free cancellation up to 2 hours before start; the charge is refunded to the wallet.
        api.MapDelete("/bookings/{id:guid}", async (Guid id, ClaimsPrincipal p, AppDb db) =>
        {
            var uid = p.UserId();
            var b = await db.Bookings.FirstOrDefaultAsync(x => x.Id == id && x.UserId == uid);
            if (b is null) return Problem(404, "Booking not found.");
            if (b.Status != BookingStatus.Confirmed) return Problem(409, "Only confirmed bookings can be cancelled.");

            var refundable = b.StartsAt - DateTime.UtcNow >= TimeSpan.FromHours(2);
            b.Status = BookingStatus.Cancelled;
            if (refundable && b.PriceAed > 0)
                db.WalletTxns.Add(new WalletTxn { UserId = uid, AmountAed = b.PriceAed, Kind = TxnKind.Refund, Reference = $"booking:{b.Id}" });
            await db.SaveChangesAsync();
            return Results.Ok(new { refunded = refundable && b.PriceAed > 0 });
        }).WithTags("Bookings");

        // Gym staff or trainers scan the resident's QR at the door.
        api.MapPost("/checkin", async (CheckInRequest req, AppDb db) =>
        {
            var b = await db.Bookings.FirstOrDefaultAsync(x => x.QrToken == req.QrToken);
            if (b is null) return Problem(404, "Unknown code.");
            if (b.Status == BookingStatus.CheckedIn) return Problem(409, "Already checked in.");
            if (b.Status != BookingStatus.Confirmed) return Problem(409, $"Booking is {b.Status}.");
            var now = DateTime.UtcNow;
            if (now < b.StartsAt.AddMinutes(-15) || now > b.EndsAt) return Problem(409, "Outside the booking window.");

            b.Status = BookingStatus.CheckedIn;
            await db.SaveChangesAsync();
            var name = await db.Users.Where(u => u.Id == b.UserId).Select(u => u.Name).FirstAsync();
            return Results.Ok(new { resident = name, b.StartsAt, b.EndsAt });
        }).RequireAuthorization(p => p.RequireRole("Staff", "Trainer", "Admin")).WithTags("Bookings");

        // ---- Wallet ----
        api.MapGet("/wallet", async (ClaimsPrincipal p, AppDb db) =>
        {
            var uid = p.UserId();
            var txns = await db.WalletTxns.Where(t => t.UserId == uid).OrderByDescending(t => t.CreatedAt).Take(50)
                .Select(t => new { t.Id, t.AmountAed, t.Kind, t.Reference, t.CreatedAt }).ToListAsync();
            return Results.Ok(new { balanceAed = await BalanceAsync(db, uid), transactions = txns });
        }).WithTags("Wallet");

        // Stub: credits the wallet without a payment. Replace with a payment gateway intent + webhook.
        api.MapPost("/wallet/topup", async (TopUpRequest req, ClaimsPrincipal p, AppDb db, IConfiguration cfg) =>
        {
            if (!cfg.GetValue<bool>("FAKE_PAYMENTS"))
                return Problem(501, "Payments are not connected yet.");
            if (req.AmountAed is < 10 or > 2000) return Problem(400, "Top up between AED 10 and AED 2,000.");
            var uid = p.UserId();
            db.WalletTxns.Add(new WalletTxn { UserId = uid, AmountAed = req.AmountAed, Kind = TxnKind.TopUp, Reference = "fake" });
            await db.SaveChangesAsync();
            return Results.Ok(new { balanceAed = await BalanceAsync(db, uid) });
        }).WithTags("Wallet");
    }
}
