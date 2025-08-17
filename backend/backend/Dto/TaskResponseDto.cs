using backend.Models;

namespace backend.Dto;

public class TaskResponseDto
{
    public Guid Token { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public long? AssigneeId { get; set; }
    public DateTimeOffset? CompletedAt { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    
    public PersonResponseDto? Assignee { get; set; }
    public StatusDto? Status { get; set; }
}
