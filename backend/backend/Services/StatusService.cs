using API.Dto;
using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class StatusService(
    TmsDataContext dbContext,
    IPaginationService paginationService) : IStatusService
{
    public async Task<PaginatedResponseDto<Status>> GetAllAsync(PaginationFilterDto query)
    {
        IQueryable<Status> queryable = dbContext.Statuses;

        int totalCount = await queryable.CountAsync();

        var result = paginationService
            .Paginate(queryable, query)
            .Select(s => new Status()
            {
                Id = s.Id,
                Name = s.Name,
            });

        return new PaginatedResponseDto<Status>()
        {
            Limit = query.Limit,
            Page = query.Page,
            Total = totalCount,
            Results = await result.ToListAsync()
        };
    }
}