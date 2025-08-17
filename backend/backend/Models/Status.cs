namespace backend.Models;

public class Status
{
    public long Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    
    public List<Task> Tasks { get; set; } = new();
}