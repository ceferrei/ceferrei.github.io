using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace MyProducts.Models;

public class TableDisplayCase 
{
    public int TableDisplayCaseId { get; set; }
    public int Column { get; set; }
    public int Shelf { get; set; }


    public int DisplayCaseId { get; set; }
    public DisplayCase DisplayCase { get; set; } = null!;


    public int? ProductInStockId { get; set; }
    public DateTime LastUpdatedDate { get; set; }
    public ProductInStock ProductInStock { get; set; } = null!;

    
    public TableDisplayCase(int Shelf, int Column) 
    {
        this.LastUpdatedDate= DateTime.Now;
        this.Shelf = Shelf;
        this.Column = Column;
        this.ProductInStock = null;
    }
}
