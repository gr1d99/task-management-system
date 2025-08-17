using System.Security.Authentication;
using backend.Dto;
using backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
public class LoginController(ILoginService loginService) : ControllerBase
{
    [HttpPost("")]
    public async Task<IResult> Create([FromBody] LoginRequestDto data)
    {
        try
        {
            var result = await loginService.CreateAsync(data);

            return Results.Ok(result);
        }
        catch (InvalidCredentialException e)
        {
            return Results.BadRequest(e.Message);
        }
        catch (Exception e)
        {
            return Results.Problem(e.Message);
        }
    }
}