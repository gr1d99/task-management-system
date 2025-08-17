using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data.Extensions;

public static class SeedDataExtensions
{
    public static void SeedRoles(this ModelBuilder builder)
    {
        builder.Entity<Role>().HasData(
            new Role()
            {
                Id = 1001,
                Name = "Admin",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                UpdatedAt = null,
                DeletedAt = null,
            },
            new Role()
            {
                Id = 1002,
                Name = "User",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                UpdatedAt = null,
                DeletedAt = null,
            },
            new Role()
            {
                Id = 1003,
                Name = "Guest",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                UpdatedAt = null,
                DeletedAt = null,
            });
        builder.Entity<PersonRole>().HasData(
            new PersonRole()
            {
                RoleId = 1001,
                PersonId = 1001
            },
            new PersonRole()
            {
                RoleId = 1002,
                PersonId = 1002
            },
            new PersonRole()
            {
                RoleId = 1003,
                PersonId = 1003
            });
    }
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
                UpdatedAt = null,
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
                UpdatedAt = null,
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
                UpdatedAt = null,
                DeletedAt = null
            });
    }
    
    public static void SeedStatuses(this ModelBuilder builder)
    {
        builder.Entity<Status>().HasData(
            new Status()
            {
                Id = 1001,
                Name = "TODO",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                UpdatedAt = null,
            },
            new Status()
            {
                Id = 1002,
                Name = "IN_PROGRESS",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                UpdatedAt = null,
            },
            new Status()
            {
                Id = 1003,
                Name = "DONE",
                CreatedAt = new DateTimeOffset(new DateTime(2025, 1, 1), TimeSpan.Zero),
                UpdatedAt = null,
            });
    }

}