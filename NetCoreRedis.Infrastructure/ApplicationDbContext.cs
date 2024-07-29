using Microsoft.EntityFrameworkCore;
using NetCoreRedis.Entities;

namespace NetCoreRedis.Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options) { }

    public DbSet<GroupEntity> Groups { get; set; }
    public DbSet<StudentEntity> Students { get; set; }
}
