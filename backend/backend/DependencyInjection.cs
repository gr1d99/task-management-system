using backend.Data;
using Microsoft.EntityFrameworkCore;

namespace backend;

public static class DependencyInjection
{
    public static IServiceCollection ConfigureDatabase(this IServiceCollection services, WebApplicationBuilder builder)
    {
        builder.Services.AddDbContextPool<TmsDataContext>(opts =>
            opts
                .UseNpgsql(builder.Configuration.GetConnectionString("TmsContext")).
                UseSnakeCaseNamingConvention());

        return services;
    }
}