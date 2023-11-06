using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyProducts.Models;
using System.Reflection.Metadata;

namespace MyProducts.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        public DbSet<ProductInStock>? ProductsInStock { get; set; }
        public DbSet<Image>? Images { get; set; }
        public DbSet<DisplayCase>? DisplayCases { get; set; }
        public DbSet<TableDisplayCase>? TableDisplayCases { get; set; }
        public DbSet<Compatibility>? Compatibility { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DisplayCase>()
                .HasMany(e => e.ProductsInStock)
                .WithMany(e => e.DisplayCases)
                .UsingEntity<TableDisplayCase>();

            modelBuilder.Entity<TableDisplayCase>()
                .HasOne(e => e.ProductInStock)
                .WithMany(e => e.TableDisplayCases)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<DisplayCase>()
                .HasMany(e => e.TableDisplayCases)
                .WithOne(e => e.DisplayCase)
                .IsRequired(true)
                .OnDelete(DeleteBehavior.Cascade);

           /* modelBuilder.Entity<Client>()
             .HasMany(e => e.ProductsInStock)
             .WithOne(e => e.Client)
             .HasForeignKey(e => e.ClientId)
             .IsRequired(true);*/

            base.OnModelCreating(modelBuilder);
        }


    }
 
}