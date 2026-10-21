using Microsoft.EntityFrameworkCore;

namespace WaslFit.Api;

public class AppDb(DbContextOptions<AppDb> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Community> Communities => Set<Community>();
    public DbSet<Lease> Leases => Set<Lease>();
    public DbSet<Facility> Facilities => Set<Facility>();
    public DbSet<Slot> Slots => Set<Slot>();
    public DbSet<Trainer> Trainers => Set<Trainer>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<WalletTxn> WalletTxns => Set<WalletTxn>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<User>().HasIndex(u => u.Phone).IsUnique();
        b.Entity<User>().Property(u => u.Role).HasConversion<string>();
        b.Entity<Facility>().Property(f => f.Type).HasConversion<string>();
        b.Entity<Slot>().Property(s => s.Audience).HasConversion<string>();
        b.Entity<Slot>().HasIndex(s => new { s.FacilityId, s.StartsAt });
        b.Entity<Booking>().Property(x => x.Status).HasConversion<string>();
        b.Entity<Booking>().HasIndex(x => x.QrToken).IsUnique();
        b.Entity<Booking>().HasIndex(x => new { x.UserId, x.StartsAt });
        b.Entity<WalletTxn>().Property(t => t.Kind).HasConversion<string>();
        b.Entity<WalletTxn>().HasIndex(t => t.UserId);
        b.Entity<Slot>().Property(s => s.PriceAed).HasPrecision(10, 2);
        b.Entity<Trainer>().Property(t => t.RateAed).HasPrecision(10, 2);
        b.Entity<Booking>().Property(x => x.PriceAed).HasPrecision(10, 2);
        b.Entity<WalletTxn>().Property(t => t.AmountAed).HasPrecision(10, 2);
    }
}

public static class Seed
{
    // Dubai is UTC+4 all year. Slots are authored in local time and stored in UTC.
    public static readonly TimeSpan Dubai = TimeSpan.FromHours(4);

    public static async Task RunAsync(AppDb db)
    {
        await db.Database.EnsureCreatedAsync();
        if (await db.Communities.AnyAsync()) return;

        var communities = new[]
        {
            new Community { Name = "Wasl 1", Area = "Al Satwa" },
            new Community { Name = "Wasl Green Park", Area = "Ras Al Khor" },
            new Community { Name = "Wasl Gate", Area = "Jebel Ali" },
            new Community { Name = "Wasl Bay", Area = "Garhoud" },
        };
        db.Communities.AddRange(communities);

        var trainerSpecs = new (string Name, string Phone, string Speciality, string Languages, decimal Rate, double Rating, int Reviews, string Bio)[]
        {
            ("Omar Hassan", "+971500000001", "Strength", "English, Arabic", 180, 4.9, 128, "Strength and conditioning coach for first-timers and returning athletes."),
            ("Sara Al Ali", "+971500000002", "Yoga", "English, Arabic", 150, 4.8, 96, "Yoga and mobility for all levels."),
            ("Dmitri Koval", "+971500000003", "Swim", "English, Russian", 200, 4.7, 61, "Swim technique coaching for adults and kids."),
            ("Priya Nair", "+971500000004", "HIIT", "English, Hindi", 160, 4.8, 84, "HIIT and Pilates classes."),
        };
        var pw = BCrypt.Net.BCrypt.HashPassword("ChangeMe!123");
        foreach (var t in trainerSpecs)
        {
            var u = new User { Name = t.Name, Phone = t.Phone, PasswordHash = pw, Role = Role.Trainer };
            db.Users.Add(u);
            db.Trainers.Add(new Trainer
            {
                UserId = u.Id, CommunityId = communities[0].Id, Speciality = t.Speciality, Languages = t.Languages,
                Bio = t.Bio, RateAed = t.Rate, Rating = t.Rating, ReviewCount = t.Reviews, Verified = true,
            });
        }
        db.Users.Add(new User { Name = "Gym Staff", Phone = "+971500000099", PasswordHash = pw, Role = Role.Staff });

        var today = DateTime.UtcNow.Add(Dubai).Date;
        foreach (var c in communities)
        {
            var gym = new Facility { CommunityId = c.Id, Name = $"{c.Name} Gym", Type = FacilityType.Gym, Capacity = 60 };
            db.Facilities.Add(gym);
            for (var d = 0; d < 7; d++)
            {
                for (var h = 6; h < 23; h++)
                {
                    var audience = h < 12 ? Audience.Women : h < 17 ? Audience.Men : Audience.Mixed;
                    var start = DateTime.SpecifyKind(today.AddDays(d).AddHours(h) - Dubai, DateTimeKind.Utc);
                    db.Slots.Add(new Slot
                    {
                        FacilityId = gym.Id, StartsAt = start, EndsAt = start.AddHours(1),
                        Capacity = 20, Audience = audience, PriceAed = 0,
                    });
                }
            }
        }
        await db.SaveChangesAsync();
    }
}
