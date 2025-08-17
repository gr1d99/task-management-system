using System.ComponentModel.DataAnnotations;

namespace backend.Dto;

public class LoginRequestDto
{
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    [Required(ErrorMessage = "Email address is required.")]
    public string Email { get; set; } = string.Empty;
    [Required(ErrorMessage = "Password is required.")]
    public string Password { get; set; } = string.Empty;
}