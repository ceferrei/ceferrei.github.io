using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Xml.Linq;

namespace MyProducts.Models;

public class Image
{
    public int ImageId { get; set; }
    public string? Name { get; set; }
    public string? Path { get; set; }

    [NotMapped]
    [Display(Name = "Image")]
    public IFormFile? File { get; set; }
    public int ProductInStockId { get; set; }
    public virtual ProductInStock? ProductInStock { get; set; }

    //public Image(int imageId, string name, string path, IFormFile file, int productInStockId, ProductInStock productInStock)
    //{
    //    ImageId = imageId;
    //    Name = name;
    //    Path = path;
    //    File = file;
    //    ProductInStockId = productInStockId;
    //    ProductInStock = productInStock;
    //}
}
