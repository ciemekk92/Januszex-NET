using IdentityServer4.EntityFramework.Options;
using Microsoft.EntityFrameworkCore;
using Entities.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Entities
{
    public class RepositoryContext : ApiAuthorizationDbContext<User>
    {
        public RepositoryContext(DbContextOptions<RepositoryContext> options, IOptions<OperationalStoreOptions> operationalStoreOptions)
            : base(options, operationalStoreOptions) { }
        public DbSet<Offer> Offer { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<City> City { get; set; }
        public DbSet<Region> Region { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql().UseSnakeCaseNamingConvention();
            optionsBuilder.EnableSensitiveDataLogging();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Offer>()
                .Property(o => o.Created)
                .HasDefaultValueSql("current_timestamp");

            modelBuilder.Entity<Offer>()
                .Property(o => o.Price)
                .HasDefaultValue(0);

            modelBuilder.Entity<Offer>()
                .Property(o => o.IsActive)
                .HasDefaultValue(true);

            modelBuilder.Entity<Offer>()
                .HasOne(o => o.User)
                .WithMany(u => u.Offers)
                .HasForeignKey(o => o.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Offer>()
                .HasMany(o => o.Categories)
                .WithMany(c => c.Offers);

            modelBuilder.Entity<Offer>()
                .HasMany(o => o.Photos)
                .WithOne(p => p.Offer);

            modelBuilder.Entity<Category>()
                .Property(c => c.Created)
                .HasDefaultValueSql("current_timestamp");

            modelBuilder.Entity<Category>()
                .HasMany(c => c.Children)
                .WithOne(p => p.Parent)
                .HasForeignKey(e => e.ParentId);

            modelBuilder.Entity<User>()
                .Property(u => u.DarkMode)
                .HasDefaultValue(false);


            modelBuilder.Entity<Location>()
                .HasOne(l => l.City);

            modelBuilder.Entity<Location>()
                .HasOne(l => l.Region);

            modelBuilder.Entity<Offer>().ToTable("Offer");
            modelBuilder.Entity<User>().ToTable("Users");
            modelBuilder.Entity<Category>().ToTable("Category");
            modelBuilder.Entity<Location>().ToTable("Location");
            modelBuilder.Entity<City>().ToTable("City");
            modelBuilder.Entity<Region>().ToTable("Region");

            SeedUsers(modelBuilder);
            SeedRoles(modelBuilder);
            SeedUserRoles(modelBuilder);
        }

        private void SeedUsers(ModelBuilder modelBuilder)
        {
            User user = new User()
            {
                Id = "b74ddd14-6340-4840-95c2-db12554843e5",
                UserName = "Admin",
                Email = "admin@admin.com",
                LockoutEnabled = false,
                PhoneNumber = "1234567890"
            };

            PasswordHasher<User> passwordHasher = new PasswordHasher<User>();
            user.PasswordHash = passwordHasher.HashPassword(user, "admin");

            modelBuilder.Entity<User>().HasData(user);
        }

        private void SeedRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole>().HasData(
                new IdentityRole()
                {
                    Id = "fab4fac1-c546-41de-aebc-a14da6895711",
                    Name = "Admin",
                    ConcurrencyStamp = "1",
                    NormalizedName = "Admin"
                },
                new IdentityRole()
                {
                    Id = "c7b013f0-5201-4317-abd8-c211f91b7330",
                    Name = "Użytkownik",
                    ConcurrencyStamp = "2",
                    NormalizedName = "User"
                }
            );
        }

        private void SeedUserRoles(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityUserRole<string>>().HasData(
                new IdentityUserRole<string>()
                {
                    RoleId = "fab4fac1-c546-41de-aebc-a14da6895711",
                    UserId = "b74ddd14-6340-4840-95c2-db12554843e5"
                }
            );
        }
    }
}
