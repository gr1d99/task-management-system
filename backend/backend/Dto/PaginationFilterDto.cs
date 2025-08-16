using System.ComponentModel;

namespace API.Dto;

public class PaginationFilterDto
{
    [DefaultValue(1)]
    public int Page { get; set; }
    
    [DefaultValue(100)]
    public int Limit { get; set; }
}