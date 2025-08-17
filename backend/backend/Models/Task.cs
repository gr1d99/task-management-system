namespace backend.Models;

public class Task
{
    public long Id { get; set; }
    public Guid Token { get; set; }
    public long? AssigneeId { get; set; }
    public long? StatusId { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTimeOffset? CompletedAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? UpdatedAt { get; set; }
    
    public Person? Assignee { get; set; }
    public Status? Status { get; set; }
}
