using Microsoft.EntityFrameworkCore;
using NetCoreRedis.Infrastructure;
using NetCoreRedis.Infrastructure.Services;

var builder = WebApplication.CreateBuilder(args);
{
    var services = builder.Services;
    var configurations = builder.Configuration;

    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
    services.AddDbContext<ApplicationDbContext>(options =>
    {
        options.UseNpgsql(configurations.GetConnectionString("Application"));
    });
    services.AddScoped<ICacheService, CacheService>();

    services.AddCors(options =>
    {
        options.AddDefaultPolicy(policy =>
        {
            policy.WithOrigins("http://localhost:5173");
            policy.AllowAnyHeader();
            policy.AllowAnyMethod();
        });
    });

    services.AddControllers();
}
;

var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.MapControllers();
    app.UseCors();
    app.Run();
}
;
