namespace NetCoreRedis.Entities;

using System.Text.Json.Serialization;
using NetCoreRedis.Enums;

public class StudentEntity
{
    public Guid Id { get; set; }
    public Guid GroupId { get; set; }
    public GroupEntity Group { get; set; } = null!;
    public string FirstName { get; set; } = string.Empty;
    public string MiddleName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public EducationFormEntity EducationForm { get; set; }
};
