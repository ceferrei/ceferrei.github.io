using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;
using MyProducts.Services;
using System.Linq;

namespace MyProducts.Areas.DisplayCases.Pages;

public class IndexModel : PageModel
{
    private readonly ApplicationDbContext ctx;
    private readonly IConfiguration _configuration;

    public IndexModel(ApplicationDbContext ctx, IConfiguration configuration)
    {
        this.ctx = ctx;
        _configuration = configuration;
    }

    public PaginatedList<DisplayCase> DisplayCase { get; set; } = default!;
    public string NameSortParm { get; set; }
    public string TotalProductsSortParm { get; set; }
    public string IsFilledSortParm { get; set; }
    public string LastUpdatedDateSortParm { get; set; }
    public string SortParm { get; set; }
    public string CurrentFilter { get; set; }
    public string SearchString { get; set; }
    public string ErrorMessage { get; set; }

    public async Task OnGetAsync(string sortOrder, string searchString, int? pageIndex)
    {
        NameSortParm = sortOrder == "name" ? "name_desc": "name";
        TotalProductsSortParm = sortOrder == "totalProducts" ? "totalProducts_desc" : "totalProducts";
        LastUpdatedDateSortParm = sortOrder == "lastUpdatedDate" ? "lastUpdatedDate_desc" : "lastUpdatedDate";
        IsFilledSortParm = sortOrder == "isFilled" ? "isFilled_desc" : "isFilled";
        SortParm = sortOrder;

        if (searchString != null)
        {
            pageIndex = 1;
        }
        else
        {
            searchString = CurrentFilter;
        }

        // Query para obter display cases
        var displayCasesQuery = ctx.DisplayCases.AsQueryable();

        // Recuperar os dados antes de aplicar o filtro e a ordenação
        var displayCasesList = await displayCasesQuery.ToListAsync();

        // Atualizar as propriedades de pesquisa
        SearchString = searchString;

        // Atualizar o filtro atual
        CurrentFilter = searchString;

        // Apply filter for name
        if (!string.IsNullOrEmpty(searchString))
        {
            searchString = searchString.ToLower(); 
            displayCasesQuery = displayCasesQuery.Where(p =>
                p.Name.ToLower().Contains(searchString) || (p.ShelfCount * p.ProductsPerShelf).ToString() == searchString);
        }

        // Aplicar ordenação após o filtro
        switch (sortOrder)
        {
            case "name":
                displayCasesQuery = displayCasesQuery.OrderBy(p => p.Name);
                break;
            case "name_desc":
                displayCasesQuery = displayCasesQuery.OrderByDescending(p => p.Name);
                break;
            case "totalProducts":
                displayCasesQuery = displayCasesQuery.OrderBy(p => p.ShelfCount * p.ProductsPerShelf);
                break;
            case "totalProducts_desc":
                displayCasesQuery = displayCasesQuery.OrderByDescending(p => p.ShelfCount * p.ProductsPerShelf);
                break;
            case "lastUpdatedDate":
                displayCasesQuery = displayCasesQuery.OrderBy(p => p.LastUpdatedDate);
                break;
            case "lastUpdatedDate_desc":
                displayCasesQuery = displayCasesQuery.OrderByDescending(p => p.LastUpdatedDate);
                break;
            case "isFilled":
                displayCasesQuery = displayCasesQuery.OrderBy(p => p.IsFilled);
                break;
            case "isFilled_desc":
                displayCasesQuery = displayCasesQuery.OrderByDescending(p => p.IsFilled);
                break;
            default:
                break;
        }

        var pageSize = _configuration.GetValue("PageSize", 4);
        DisplayCase = await PaginatedList<DisplayCase>.CreateAsync(
            displayCasesQuery.AsNoTracking(), pageIndex ?? 1, pageSize);

        
    }
    public async Task<IActionResult> OnPostDisplayCaseDeleteAsync(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var displayCaseToDelete = await ctx.DisplayCases
            .FirstOrDefaultAsync(f => f.DisplayCaseId == id);

        if (displayCaseToDelete == null)
        {
            return NotFound();
        }

        try
        {            
            ctx.DisplayCases.Remove(displayCaseToDelete);

            
            await ctx.SaveChangesAsync();
            return RedirectToPage("./Index", new { DeleteSuccessMessage = "Produto eliminado com sucesso." });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return RedirectToAction("./Index", new { id, hasErrorMessage = true });
        }
    }
}


