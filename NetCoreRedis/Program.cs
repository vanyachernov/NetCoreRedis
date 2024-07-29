using Microsoft.EntityFrameworkCore;
using NetCoreRedis.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
{
    var services = builder.Services;
    var configurations = builder.Configuration;

    services.AddEndpointsApiExplorer();
    services.AddSwaggerGen();
    services.AddDbContext<ApplicationDbContext>(options => {
        options.UseNpgsql(configurations.GetConnectionString("Application"));
    });
};

var app = builder.Build();
{
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    app.UseHttpsRedirection();
    app.Run();
};
