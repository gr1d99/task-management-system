namespace backend.Dto;

public class LoginResponseDto
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
    public string ExpiresIn { get; set; } = string.Empty;
    public PersonResponseDto User { get; set; } = new PersonResponseDto();
}