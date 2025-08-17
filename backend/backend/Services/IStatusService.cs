using API.Dto;
using backend.Models;

namespace backend.Services;

public interface IStatusService
{
    Task<PaginatedResponseDto<Status>> GetAllAsync(PaginationFilterDto query);

}