
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MyProducts.Data;
using MyProducts.Models;
using MyProducts.Services;

namespace MyProducts.Areas.DisplayCases.Pages;

public class CreateModel : PageModel
{
    private readonly ApplicationDbContext ctx;

    public CreateModel(ApplicationDbContext ctx)
    {
        this.ctx = ctx;
    }


    public IActionResult OnGet()
    {
        return Page();
    }

    public DisplayCase DisplayCase { get; set; } = new ();
    

    public async Task<IActionResult> OnPostAsync()//quando clicamos em criar chama o OnPostAsync
    {
        var newDisplayCase = new DisplayCase();

        if (DisplayCase != null)
        {
            newDisplayCase.LastUpdatedDate = DateTime.Now;

            //vou ao browser e meto o http:// localhost:entrada/docs,

            if (await TryUpdateModelAsync(newDisplayCase, "displayCase", f => f.Name, f => f.ShelfCount, f => f.ProductsPerShelf))
            {
                foreach (int shelf in Enumerable.Range(1, newDisplayCase.ShelfCount))
                {
                    foreach (int column in Enumerable.Range(1, newDisplayCase.ProductsPerShelf))
                    {
                        var newTable = new TableDisplayCase(shelf, column);
                        newTable.DisplayCase = newDisplayCase;

                        if (newTable != null)
                        {
                            ctx.TableDisplayCases.Add(newTable);
                        }
                    }
                }

                ctx.DisplayCases.Add(newDisplayCase);
                await ctx.SaveChangesAsync();
                return RedirectToPage("./Index", new { CreateSuccessMessage = "Produto criado com sucesso." });
            }
        }
        return Page();
    }
}
