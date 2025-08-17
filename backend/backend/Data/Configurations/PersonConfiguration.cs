using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configurations;

public class PersonConfiguration : IEntityTypeConfiguration<Person>
{
    public void Configure(EntityTypeBuilder<Person> builder)
    {
        builder.ToTable("people");
        builder.HasKey(p => p.Id);
        
        builder
            .HasIndex(p => p.Email)
            .IsUnique();
        builder
            .HasIndex(p => p.Username)
            .IsUnique();

        builder
            .Property(p => p.Email)
            .HasMaxLength(100)
            .IsRequired();
        builder
            .Property(p => p.Username)
            .HasMaxLength(100)
            .IsRequired();
        builder
            .Property(p => p.Token)
            .HasDefaultValueSql("uuid_generate_v4()");
        builder
            .Property(p => p.CreatedAt)
            .HasDefaultValueSql("now()");
    }
}