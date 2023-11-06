using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace MyProducts.Models;

public class DisplayCase
{
    public int DisplayCaseId { get; set; }

    [Required]
    [Display(Name = "Display case name")]
    public string Name { get; set; }

    [Required]
    [Display(Name = "Number of shelves")]
    public int ShelfCount { get; set; }

    [Required]
    [Display(Name = "Products per shelf")]
    public int ProductsPerShelf { get; set; }

    [Display(Name = "Last updated date")]
    public DateTime? LastUpdatedDate { get; set; }

    public bool IsFilled { get; set; }

    public DisplayCase()
    {
        IsFilled = false;
    }

    [Display(Name = "Total number of products")]
    public int TotalProducts
    {
        get { return ShelfCount * ProductsPerShelf; }
    }

    public List<TableDisplayCase> TableDisplayCases { get; set; } = new();
    public List<ProductInStock> ProductsInStock { get; set; } = new();


}
