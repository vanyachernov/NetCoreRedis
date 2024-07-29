using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NetCoreRedis.Entities;
using NetCoreRedis.Infrastructure.Seeds;

namespace NetCoreRedis.Infrastructure.Configurations;

public class GroupConfiguration : IEntityTypeConfiguration<GroupEntity>
{
    public void Configure(EntityTypeBuilder<GroupEntity> builder)
    {
        builder.HasKey(g => g.Id);
        builder
            .HasMany(g => g.Students)
            .WithOne(s => s.Group)
            .HasForeignKey(s => s.GroupId);
        builder
            .Property(g => g.Specialty)
            .IsRequired()
            .HasConversion<int>();

        builder.HasData(SeedData.GetGroups());
    }
}