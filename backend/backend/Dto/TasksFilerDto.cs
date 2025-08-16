using API.Dto;

namespace backend.Dto;

public class TasksFilerDto : PaginationFilterDto
{
    public long? AssigneeId { get; set; }
}
