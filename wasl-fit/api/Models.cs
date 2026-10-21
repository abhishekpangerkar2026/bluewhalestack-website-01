namespace WaslFit.Api;

public enum Role { Resident, Trainer, Staff, Admin }
public enum Audience { Mixed, Women, Men }
public enum FacilityType { Gym, Pool, Court, Studio }
public enum BookingStatus { Confirmed, Cancelled, CheckedIn, NoShow }
public enum TxnKind { TopUp, Charge, Refund }

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Phone { get; set; } = "";
    public string Name { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public Role Role { get; set; } = Role.Resident;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Community
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public string Area { get; set; } = "";
}

// Mirrors an active Wasl lease. In production this is verified against the Wasl leasing system.
public class Lease
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid CommunityId { get; set; }
    public Community? Community { get; set; }
    public string Unit { get; set; } = "";
    public DateTime EndDate { get; set; }
}

public class Facility
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid CommunityId { get; set; }
    public Community? Community { get; set; }
    public string Name { get; set; } = "";
    public FacilityType Type { get; set; }
    public int Capacity { get; set; }
}

public class Slot
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid FacilityId { get; set; }
    public Facility? Facility { get; set; }
    public DateTime StartsAt { get; set; }
    public DateTime EndsAt { get; set; }
    public int Capacity { get; set; }
    public Audience Audience { get; set; }
    public decimal PriceAed { get; set; }
}

public class Trainer
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public User? User { get; set; }
    public Guid CommunityId { get; set; }
    public string Speciality { get; set; } = "";
    public string Languages { get; set; } = "";
    public string Bio { get; set; } = "";
    public decimal RateAed { get; set; }
    public double Rating { get; set; }
    public int ReviewCount { get; set; }
    public bool Verified { get; set; }
}

public class Booking
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public Guid? SlotId { get; set; }
    public Slot? Slot { get; set; }
    public Guid? TrainerId { get; set; }
    public Trainer? Trainer { get; set; }
    public Guid CommunityId { get; set; }
    public DateTime StartsAt { get; set; }
    public DateTime EndsAt { get; set; }
    public decimal PriceAed { get; set; }
    public BookingStatus Status { get; set; } = BookingStatus.Confirmed;
    public string QrToken { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class WalletTxn
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid UserId { get; set; }
    public decimal AmountAed { get; set; }
    public TxnKind Kind { get; set; }
    public string Reference { get; set; } = "";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
