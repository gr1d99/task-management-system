using System.Text.Json.Serialization;

namespace backend.Models;

public class Person
{
    public long Id { get; set; }
    public Guid Token { get; set; }
    public string Email { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    [JsonIgnore]
    public string PasswordHash { get; set; } = null!;
    public DateTimeOffset? DeletedAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? Updated { get; set; }
    
    public List<Task> Tasks { get; set; } = new();
}
