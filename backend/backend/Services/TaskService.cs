using API.Dto;
using backend.Data;
using backend.Dto;
using Microsoft.EntityFrameworkCore;
using Task = backend.Models.Task;

namespace backend.Services;

public class TaskService(
    TmsDataContext dbContext,
    IPaginationService paginationService) : ITaskService
{
    public async Task<TaskResponseDto> CreateAsync(TaskRequestDto data)
    {
        Task? task = new Task()
        {
            Name = data.Name,
            Description = data.Description,
            AssigneeId = data.AssigneeId,
        };

        await dbContext.AddAsync(task);

        await dbContext.SaveChangesAsync();

        task = await dbContext.Tasks
            .Include(t => t.Assignee)
            .FirstOrDefaultAsync(t => t.Token == task.Token);

        if (task is null)
        {
            throw new Exception("Task not found");
        }

        return ToTaskResponseDto(task);
    }
    public async Task<TaskResponseDto> GetAsync(Guid token)
    {
        Task? task = await dbContext.Tasks
            .Include(t => t.Assignee)
            .FirstOrDefaultAsync(t => t.Token == token);

        if (task is null)
        {
            throw new Exception("Task not found");
        }

        return ToTaskResponseDto(task);
    }
    public async Task<PaginatedResponseDto<TaskResponseDto>> GetAllAsync(TasksFilerDto query)
    {
        IQueryable<Task> queryable = dbContext.Tasks
            .OrderByDescending(t => t.CreatedAt)
            .Include(t => t.Assignee);

        if (query.AssigneeId != null)
        {
            queryable = queryable.Where(t => t.AssigneeId == query.AssigneeId);
        }

        int totalCount = await queryable.CountAsync();

        var result = paginationService
            .Paginate(queryable, query)
            .Select(task => ToTaskResponseDto(task));

        return new PaginatedResponseDto<TaskResponseDto>()
        {
            Limit = query.Limit,
            Page = query.Page,
            Total = totalCount,
            Results = await result.ToListAsync()
        };
    }
    public async System.Threading.Tasks.Task UpdateAsync(Guid token, TaskRequestDto data)
    {
        Task? task = await dbContext.Tasks.FirstOrDefaultAsync(t => t.Token == token);

        if (task is null)
        {
            throw new Exception("Task not found");
        }

        task.Name = data.Name;
        task.Description = data.Description;

        if (data.AssigneeId != null && data.AssigneeId != task.AssigneeId)
        {
            task.AssigneeId = data.AssigneeId;
        }

        if (data.CompletedAt != null)
        {
            var datetimeUtc = data.CompletedAt.Value.ToUniversalTime();
            task.CompletedAt = new DateTimeOffset(datetimeUtc);
        }

        await dbContext.SaveChangesAsync();
    }
    static TaskResponseDto ToTaskResponseDto(Task task)
    {
        return new TaskResponseDto()
        {
            Token = task.Token,
            Name = task.Name,
            AssigneeId = task.AssigneeId,
            Description = task.Description,
            CompletedAt = task.CompletedAt,
            CreatedAt = task.CreatedAt,
            Assignee = GetTaskAssignee(task)
        };
    }
    static PersonResponseDto? GetTaskAssignee(Task task)
    {
        if (task.Assignee is null)
        {
            return null;
        }

        return new PersonResponseDto()
        {
            Id = task.Assignee.Id,
            Email = task.Assignee.Email,
            FirstName = task.Assignee.FirstName,
            LastName = task.Assignee.LastName,
        };
    }
}