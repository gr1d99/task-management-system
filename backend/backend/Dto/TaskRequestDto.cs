using System.ComponentModel.DataAnnotations;

namespace backend.Dto;

public class TaskRequestDto
{
    [Required(ErrorMessage = "Task name is required")]
    [MaxLength(50, ErrorMessage = "Task name must not exceed 50 characters")]
    public string Title { get; set; }
    [Required(ErrorMessage = "Task description is required")]
    public string Description { get; set; } = string.Empty;
    [Required(ErrorMessage = "Task assignee is required")]
    public long? AssigneeId { get; set; }
    public long? StatusId { get; set; }
    public DateTime? CompletedAt { get; set; }
}
