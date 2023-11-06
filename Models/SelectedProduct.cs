using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace MyProducts.Models;

public class SelectedProduct
{
    public int SelectedProductId { get; set; }
    [StringLength(50, MinimumLength = 3)]
    [Required]
    [Display(Name = "Product name")]
    public string? Name { get; set; }
    [Display(Name = "Description")]
    public string? Description { get; set; }
    public virtual Image? Image { get; set; } 
    public int DisplayCaseId { get; set; }
    public DisplayCase DisplayCase { get; set; }
}

