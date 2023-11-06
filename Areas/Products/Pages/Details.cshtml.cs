using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;

namespace MyProducts.Areas.Products.Pages
{
    public class DetailsModel : PageModel
    {
        private readonly MyProducts.Data.ApplicationDbContext ctx;

        public DetailsModel(MyProducts.Data.ApplicationDbContext ctx)
        {
            this.ctx = ctx;
        }

      public ProductInStock ProductInStock { get; set; } = default!; 

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || ctx.ProductsInStock == null)
            {
                return NotFound();
            }

            var productInStock = await ctx.ProductsInStock.FirstOrDefaultAsync(m => m.ProductInStockId == id);
            if (productInStock == null)
            {
                return NotFound();
            }
            else 
            {
                ProductInStock = productInStock;
            }
            return Page();
        }
    }
}
