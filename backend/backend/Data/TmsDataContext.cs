using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class TmsDataContext(DbContextOptions<TmsDataContext> options) : DbContext(options)
{
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}