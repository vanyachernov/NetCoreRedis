using Microsoft.EntityFrameworkCore;
using NetCoreRedis.Entities;
using NetCoreRedis.Infrastructure.Configurations;

namespace NetCoreRedis.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options) { }

    public DbSet<GroupEntity> Groups { get; set; }
    public DbSet<StudentEntity> Students { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new GroupConfiguration());
        modelBuilder.ApplyConfiguration(new StudentConfiguration());

        base.OnModelCreating(modelBuilder);
    }
}
