using API.Dto;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]")]
public class UsersController(IUsersService usersService) : ControllerBase
{
    [HttpGet("")]
    public async Task<IResult> GetUsers([FromQuery] PaginationFilterDto query)
    {
        try
        {
            var users = await usersService.GetAllAsync(query);
            
            return Results.Ok(users);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }
}