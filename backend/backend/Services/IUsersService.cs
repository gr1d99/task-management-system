using API.Dto;
using backend.Dto;

namespace backend.Services;

public interface IUsersService
{
    Task<PaginatedResponseDto<PersonResponseDto>> GetAllAsync(PaginationFilterDto filter);
}