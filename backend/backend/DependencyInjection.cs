using backend.Data;
using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureDatabase(this IServiceCollection services,
        WebApplicationBuilder builder)
    {
        builder.Services.AddDbContextPool<TmsDataContext>(opts =>
            opts
                .UseNpgsql(builder.Configuration
                    .GetConnectionString("TmsContext"))
                .UseSnakeCaseNamingConvention());

        return services;
    }

    public static IServiceCollection ConfigureTmsServices(this IServiceCollection services,
        WebApplicationBuilder builder)
    {
        builder.Services.AddScoped<ITaskService, TaskService>();
        builder.Services.AddScoped<IPaginationService, PaginationService>();

        return services;
    }
}