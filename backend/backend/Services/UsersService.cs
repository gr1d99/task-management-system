using API.Dto;
using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UsersService(
    TmsDataContext dbContext, IPaginationService paginationService) : IUsersService
{
    public async Task<PaginatedResponseDto<PersonResponseDto>> GetAllAsync(PaginationFilterDto query)
    {
        IQueryable<Person> queryable = dbContext.People
            .OrderByDescending(p => p.CreatedAt);

        int totalCount = await queryable.CountAsync();

        var result = paginationService
            .Paginate(queryable, query)
            .Select(p => new PersonResponseDto()
            {
                Id = p.Id,
                Email = p.Email,
                Username = p.Username
            });

        return new PaginatedResponseDto<PersonResponseDto>()
        {
            Limit = query.Limit,
            Page = query.Page,
            Total = totalCount,
            Results = await result.ToListAsync()
        };
    }
}