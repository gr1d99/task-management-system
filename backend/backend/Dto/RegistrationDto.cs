using System.ComponentModel.DataAnnotations;

namespace backend.Dto;

public class RegistrationDto : PersonRequestDto
{
    [Required(ErrorMessage = "Password is required")]
    [MinLength(6, ErrorMessage = "Password must have a minimum length of '6'")]
    public string Password { get; set; } = string.Empty;
    [Compare(nameof(Password), ErrorMessage = "Passwords do not match")]
    public string ConfirmPassword { get; set; } = string.Empty;
}