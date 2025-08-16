using API.Dto;
using backend.Dto;

namespace backend.Services;

public interface ITaskService
{
    Task<TaskResponseDto> CreateAsync(TaskRequestDto data);
    Task<TaskResponseDto> GetAsync(Guid token);
    Task<PaginatedResponseDto<TaskResponseDto>> GetAllAsync(TasksFilerDto query);
    Task UpdateAsync(Guid token, TaskRequestDto data);
}