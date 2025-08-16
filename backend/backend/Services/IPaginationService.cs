using API.Dto;

namespace backend.Services;

public interface IPaginationService
{
    public IQueryable<T> Paginate<T>(IQueryable<T> queryable, PaginationFilterDto filter);
}