using System.ComponentModel.DataAnnotations;

namespace backend.Dto;

public class PersonRequestDto
{
    [Required(ErrorMessage = "First name is required")]
    public string FirstName { get; set; } = string.Empty;
    [Required(ErrorMessage = "Last name is required")]
    public string LastName { get; set; } = string.Empty;
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; } = string.Empty;
}
