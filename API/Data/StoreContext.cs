using System;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class StoreContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Product> Products { get; set; }
    public required DbSet<Cart> Carts { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<IdentityRole>()
            .HasData(
                new IdentityRole {Id="4c2b33eb-c9f0-4bd5-8036-30c74603d0c5", Name = "Member", NormalizedName = "MEMBER" },
                new IdentityRole {Id="72a229bd-d733-48c7-a06e-884ec17671a1"  ,Name = "Admin", NormalizedName = "ADMIN" }
            );
    }
}
