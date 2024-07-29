namespace NetCoreRedis.Entities;

using NetCoreRedis.Enums;

public class GroupEntity
{
    public Guid Id { get; set; }
    public int EnrolmentYear { get; set; } = DateTime.Now.Year;
    public SpecialtyEntity Specialty { get; set; }
    public int CurrentSemester { get; set; } = 1;
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
    public ICollection<StudentEntity> Students { get; set; } = [];
};
