using backend.Dto;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Authorize]
[Route("api/v1/[controller]")]
public class TasksController(ITaskService taskService) : ControllerBase
{
    [HttpPost("")]
    public async Task<IResult> Create([FromBody] TaskRequestDto data)
    {
        try
        {
            var result = await taskService.CreateAsync(data);
            
            return Results.Created(nameof(GetTask), result);
        }
        catch (Exception ex)
        {
            return Results.Problem(ex.Message);
        }
    }

    [HttpGet("{token}")]
    public async Task<IResult> GetTask(Guid token)
    {
        try
        {
            var result = await taskService.GetAsync(token);
            
            return Results.Ok(result);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }

    [HttpGet("")]
    public async Task<IResult> GetTasks([FromQuery] TasksFilerDto query)
    {
        try
        {
            var result = await taskService.GetAllAsync(query);
            
            return Results.Ok(result);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }

    [HttpPut("{token}")]
    public async Task<IResult> UpdateTask(Guid token, [FromBody] TaskRequestDto data)
    {
        try
        {
            await taskService.UpdateAsync(token, data);
            
            return Results.NoContent();
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }
}