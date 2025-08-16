using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Extensions;

public static class Seed
{
    public static void SeedUsers(this ModelBuilder builder)
    {
        builder.Entity<Person>().HasData(
            new Person()
            {
                Id = 1001,
                Token = new Guid("11111111-1111-1111-1111-111111111111"),
                Email = "admin@tms.com",
                FirstName = "Tms",
                LastName = "Admin",
                PasswordHash = "Password",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                Updated = null,
                DeletedAt = null
            },
            new Person()
            {
                Id = 1002,
                Token = new Guid("22222222-2222-2222-2222-222222222222"),
                Email = "gideon@tms.com",
                FirstName = "Gideon",
                LastName = "Tms",
                PasswordHash = "Password",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                Updated = null,
                DeletedAt = null
            },
            new Person()
            {
                Id = 1003,
                Token = new Guid("33333333-3333-3333-3333-333333333333"),
                Email = "guest@tms.com",
                FirstName = "Guest",
                LastName = "Tms",
                PasswordHash = "Password",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                Updated = null,
                DeletedAt = null
            });
    }
}