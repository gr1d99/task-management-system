using System.IdentityModel.Tokens.Jwt;
using System.Security.Authentication;
using System.Security.Claims;
using System.Text;
using backend.Data;
using backend.Dto;
using backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services;

public class LoginService(
    TmsDataContext dbContext,
    IConfiguration configuration) : ILoginService
{
    public async Task<LoginResponseDto> CreateAsync(LoginRequestDto data)
    {
        Person? person = await dbContext.People.FirstOrDefaultAsync(p => p.Email == data.Email);

        if (person is null)
        {
            throw new InvalidCredentialException("Invalid username or password");
        }

        var accessToken = GenerateTokens(person);
        var expirationDuration = configuration["Jwt:Expiry"];

        return new LoginResponseDto()
        {
            AccessToken = accessToken,
            ExpiresIn = $"{expirationDuration} Minutes",
            User = new PersonResponseDto()
            {
                Id = person.Id,
                Email = person.Email,
                Username = person.Username
            }
        };
    }
    
    private string GenerateTokens(Person person)
    {
        var issuer = configuration["JWT:Issuer"];
        var audience = configuration["JWT:Audience"];
        var key = Encoding.UTF8.GetBytes(configuration["JWT:SigningKey"]!);

        var tokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim("Id", Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, person.Email),
                new Claim("Roles", "Admin"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            }),
            Expires = DateTime.UtcNow.AddMinutes(configuration.GetValue<int>("JWT:Expiry")),
            Issuer = issuer,
            Audience = audience,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwtToken = tokenHandler.WriteToken(token);
        
        return jwtToken;
    }
}