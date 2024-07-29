using NetCoreRedis.Entities;
using NetCoreRedis.Enums;

namespace NetCoreRedis.Infrastructure.Seeds;

public static class SeedData
{
    public static GroupEntity[] GetGroups()
    {
        return
        [
            new GroupEntity
            {
                Id = Guid.NewGuid(),
                Specialty = SpecialtyEntity.SoftwareEngineering
            },
            new GroupEntity
            {
                Id = Guid.NewGuid(),
                Specialty = SpecialtyEntity.ComputerEngineering
            },
            new GroupEntity
            {
                Id = Guid.NewGuid(),
                Specialty = SpecialtyEntity.SoftwareEngineering
            },
            new GroupEntity
            {
                Id = Guid.NewGuid(),
                EnrolmentYear = 2021,
                Specialty = SpecialtyEntity.ComputerEngineering
            }
        ];
    }
};
