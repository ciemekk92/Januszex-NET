using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Entities;
using Contracts;
using Repository;

namespace Januszex.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigurePgContext(this IServiceCollection services, IConfiguration config)
        {
            services.AddDbContext<RepositoryContext>(options =>
                options.UseNpgsql(
                    config.GetConnectionString("ApplicationDbContext")));
        }

        public static void ConfigureRepositoryWrapper(this IServiceCollection services)
        {
            services.AddScoped<IRepositoryWrapper, RepositoryWrapper>();
        }
    }
}
