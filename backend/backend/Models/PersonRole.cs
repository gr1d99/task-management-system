namespace backend.Models;

public class PersonRole
{
    public long PersonId { get; set; }
    public long RoleId { get; set; }
    
    public Person Person { get; set; } = new();
    public Role Role { get; set; } = new();
}
