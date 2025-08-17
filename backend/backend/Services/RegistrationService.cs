using backend.Data;
using backend.Dto;
using backend.Models;
using backend.Services.Helpers;

namespace backend.Services;

public class RegistrationService(
    TmsDataContext dbContext) : IRegistrationService
{
    public async Task<PersonResponseDto> CreateAsync(RegistrationDto data)
    {
        Person? person = new Person()
        {
            Username = data.Username,
            Email = data.Email,
            PasswordHash = PasswordHasher.HashPassword(data.Password)
        };
        
        await dbContext.People.AddAsync(person);
        await dbContext.SaveChangesAsync();
        
        person = dbContext.People.FirstOrDefault(p => p.Email == data.Email);

        if (person is null)
        {
            throw new Exception("Person not found");
        }

        return new PersonResponseDto()
        {
            Id = person.Id,
            Email = person.Email,
            Username = person.Username
        };
    }
}