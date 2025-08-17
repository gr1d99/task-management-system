namespace backend.Models;

public class Role
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTimeOffset? DeletedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? UpdatedAt { get; set; }
    
    public List<PersonRole> PersonRoles { get; set; } = new();
}