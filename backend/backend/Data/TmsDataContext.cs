using backend.Data.Configurations;
using backend.Data.Extensions;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Task = backend.Models.Task;

namespace backend.Data;

public class TmsDataContext(DbContextOptions<TmsDataContext> options) : DbContext(options)
{
    public DbSet<Person> People { get; set; }
    public DbSet<Task> Tasks { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.ApplyConfiguration(new PersonConfiguration());
        modelBuilder.ApplyConfiguration(new TaskConfiguration());
        
        modelBuilder.SeedUsers();
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
    {
        var entries = ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Modified).ToList();

        foreach (var entry in entries)
        {
            entry.Property("UpdatedAt").CurrentValue = DateTime.UtcNow;
        }
        
        return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }
}
