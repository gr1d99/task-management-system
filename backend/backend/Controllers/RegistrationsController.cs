using backend.Dto;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/auth/[controller]")]
public class RegistrationsController(
    IRegistrationService registrationService) : ControllerBase
{
    [HttpPost("")]
    public async Task<IResult> Create([FromBody] RegistrationDto data)
    {
        try
        {
            var result = await registrationService.CreateAsync(data);
            
            return Results.Created(nameof(Create), result);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }
}