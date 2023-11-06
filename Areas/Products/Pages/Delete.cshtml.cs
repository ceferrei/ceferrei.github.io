using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;
using MyProducts.Services;

namespace MyProducts.Areas.Products.Pages;

public class DeleteModel : PageModel
{
    private readonly MyProducts.Data.ApplicationDbContext ctx;
    private readonly ImageService imageService;


    public DeleteModel(MyProducts.Data.ApplicationDbContext context, ImageService imageService)
    {
        this.ctx = context;
        this.imageService = imageService;
    }

    [BindProperty]
    public ProductInStock ProductInStock { get; set; } = default!;
    public string ErrorMessage { get; set; }
    public async Task<IActionResult> OnGetAsync(int? id, bool? hasErrorMessage = false)
    {
        if (id == null)
        {
            return NotFound();
        }

        ProductInStock = await ctx.ProductsInStock
            .AsNoTracking()
            .FirstOrDefaultAsync(m => m.ProductInStockId == id);

        if (ProductInStock == null)
        {
            return NotFound();
        }
        
        if (hasErrorMessage.GetValueOrDefault())
        {
            ErrorMessage = $"Ocorreu um erro ao eliminar o produto {ProductInStock.Name} {ProductInStock.Description} com o ID {ProductInStock.ProductInStockId}.";
        }

        return Page();
    }

    public async Task<IActionResult> OnPostAsync(int? id)
    {
        if (id == null )
        {
            return NotFound();
        }

        var productToDelete = await ctx.ProductsInStock
            .Include(f => f.Image)
            .FirstOrDefaultAsync(f => f.ProductInStockId == id);

        if(productToDelete == null)
        {
            return NotFound();
        }

        try
        {
            imageService.DeleteUploadedFile(productToDelete.Image);
            ctx.ProductsInStock.Remove(productToDelete);
            await ctx.SaveChangesAsync();
            TempData["DeleteSuccessMessage"] = "Produto eliminado com sucesso.";
            return RedirectToPage("./Index");
        }
        catch (Exception)
        {
            return RedirectToAction("./Delete", new {id, hasErrorMessage = true});
        }
    }
}
