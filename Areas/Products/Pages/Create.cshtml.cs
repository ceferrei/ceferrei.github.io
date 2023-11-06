
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;
using MyProducts.Services;

namespace MyProducts.Areas.Products.Pages;

public class CreateModel : PageModel
{
    private readonly ApplicationDbContext ctx;
    private readonly ImageService imageService;

    public CreateModel(ApplicationDbContext ctx, ImageService imageService)
    {
        this.ctx = ctx;
        this.imageService = imageService;
    }

    public IActionResult OnGet()
    {
        return Page();
    }

    [BindProperty]
    public ProductInStock ProductInStock { get; set; } =  new();



    public async Task<IActionResult> OnPostAsync()
    {
        var newProductInStock = new ProductInStock();

        if (ProductInStock != null)
        {
            if (ProductInStock.Image != null)
            {
                newProductInStock.Image = await imageService.UploadAsync(ProductInStock.Image);
            }

            if (await TryUpdateModelAsync(newProductInStock, "productInStock", f => f.Name, f => f.Description))
            {
                var productNameExists = await ctx.ProductsInStock.FirstOrDefaultAsync(p => p.Name == newProductInStock.Name);
                if (productNameExists != null)
                {
                    ModelState.AddModelError("ProductInStock.Name", "The product name already exists. Choose a different name.");
                    return Page();
                }

                ctx.ProductsInStock.Add(newProductInStock);
                await ctx.SaveChangesAsync();
                return RedirectToPage("./Index", new { CreateSuccessMessage = "Produto criado com sucesso." });

            }
        }
        return Page();
    }
}

