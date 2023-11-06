using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;
using MyProducts.Services;

namespace MyProducts.Areas.Products.Pages
{
    public class EditModel : PageModel
    {
        private readonly ApplicationDbContext ctx;
        private readonly ImageService imageService;

        public EditModel(ApplicationDbContext ctx, ImageService imageService)
        {
            this.ctx = ctx;
            this.imageService = imageService;
        }

        [BindProperty]
        public ProductInStock ProductInStock { get; set; } = default!;

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || ctx.ProductsInStock == null)
            {
                return NotFound();
            }

            ProductInStock =  await ctx.ProductsInStock
                .Include(f => f.Image)
                .AsNoTracking()
                .FirstOrDefaultAsync(m => m.ProductInStockId == id);

            if (ProductInStock == null)
                return NotFound();

            return Page();
        }

   
        public async Task<IActionResult> OnPostAsync(int id)
        {
            var productInStockToUpdate = await ctx.ProductsInStock
                    .Include(f => f.Image)
                    .FirstOrDefaultAsync(f => f.ProductInStockId == id);

            if (productInStockToUpdate == null)
                return NotFound();

            var uploadedImage = ProductInStock.Image;

            if(null != uploadedImage)
            {
                uploadedImage = await imageService.UploadAsync(uploadedImage);

                if (productInStockToUpdate.Image != null)
                {
                    imageService.DeleteUploadedFile(productInStockToUpdate.Image);
                    productInStockToUpdate.Image.Name = uploadedImage.Name;
                    productInStockToUpdate.Image.Path = uploadedImage.Path;
                }
                else
                    productInStockToUpdate.Image = uploadedImage;
            }

            if (await TryUpdateModelAsync(productInStockToUpdate, "productInStock", f => f.Name, f => f.Description))
            {
                await ctx.SaveChangesAsync();
                return RedirectToPage("./Index");
            }

            return Page();
        }

        private bool ProductExists(int id)
        {
          return (ctx.ProductsInStock?.Any(e => e.ProductInStockId == id)).GetValueOrDefault();
        }
    }
}
