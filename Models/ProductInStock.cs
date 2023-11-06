using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace MyProducts.Models;

public class ProductInStock
{
    public int ProductInStockId { get; set; }
    [StringLength(50, MinimumLength = 3)]
    [Required]
    [Display(Name = "Product name")]
    public string Name { get; set; }
    [Display(Name = "Description")]
    public string? Description { get; set; }
    public virtual Image? Image { get; set; }
    public List<TableDisplayCase> TableDisplayCases { get; set; } = new();
    public List<DisplayCase> DisplayCases { get; set; } = new();
    //public string ClientId { get; set; }
    //public Client? Client { get; set; }
}
