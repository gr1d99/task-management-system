using backend.Dto;

namespace backend.Services;

public interface IRegistrationService
{
    Task<PersonResponseDto> CreateAsync(RegistrationDto data);
}