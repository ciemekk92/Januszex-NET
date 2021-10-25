using Microsoft.EntityFrameworkCore;

namespace Januszex.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Offer> Offers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;Password=my_pw");
        }
    }
}