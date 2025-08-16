using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace backend.Data.Configurations;

public class TaskConfiguration : IEntityTypeConfiguration<Models.Task>
{ 
    public void Configure(EntityTypeBuilder<Models.Task> builder)
    {
        builder.ToTable("tasks");
        builder.HasKey(t => t.Id);
        
        builder.Property(t => t.Name).HasMaxLength(50).IsRequired();
        builder.Property(t => t.Description).HasMaxLength(255).IsRequired();

        builder.Property(t => t.Token)
            .HasDefaultValueSql("uuid_generate_v4()");
        builder.Property(t => t.CreatedAt)
            .HasDefaultValueSql("now()");

        builder
            .HasOne<Person>(t => t.Assignee)
            .WithMany(p => p.Tasks)
            .HasForeignKey(t => t.AssigneeId);
    }
}