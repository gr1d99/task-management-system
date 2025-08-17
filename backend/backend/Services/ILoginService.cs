using backend.Dto;

namespace backend.Services;

public interface ILoginService
{
    Task<LoginResponseDto> CreateAsync(LoginRequestDto data);
}