using Microsoft.EntityFrameworkCore;

namespace Januszex.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext (DbContextOptions<ApplicationDbContext> options) : base(options) {}
        public DbSet<Offer> Offers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            DotNetEnv.Env.Load("./.env");
            optionsBuilder.UseNpgsql(DotNetEnv.Env.GetString("DB__CONNECTION__STRING")).UseSnakeCaseNamingConvention();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Offer>().ToTable("Offer");
        }
    }
}