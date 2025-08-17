using API.Dto;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]")]
public class StatusesController(IStatusService statusService) : ControllerBase
{
    [HttpGet("")]
    public async Task<IResult> GetUsers([FromQuery] PaginationFilterDto query)
    {
        try
        {
            var users = await statusService.GetAllAsync(query);
            
            return Results.Ok(users);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }
}