using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;
using MyProducts.Services;

namespace MyProducts.Areas.ProductsInStock.Pages;
//namespace MyProducts.Areas.Products.Pages;

public class IndexModel : PageModel
{
    private readonly ApplicationDbContext ctx;
    private readonly IConfiguration _configuration;
    private readonly ImageService _imageService;

    public IndexModel(ApplicationDbContext ctx, ImageService imageService, IConfiguration configuration)
    {
        this.ctx = ctx;
        _configuration = configuration;
        _imageService = imageService;
    }

    public PaginatedList<ProductInStock> ProductInStock { get; set; } = default!;
    public string NameSortParm { get; set; }
    public string DescriptionSortParm { get; set; }
    public string SortParm { get; set; }
    public string CurrentFilter { get; set; }
    public string SearchString { get; set; }
    [BindProperty]
    public ProductInStock ProductToDelete { get; set; } = default!;

    public async Task OnGetAsync(string sortOrder, string searchString, int? pageIndex)
    {
        
        NameSortParm = sortOrder == "name" ? "name_desc" : "name";
        DescriptionSortParm = sortOrder == "description" ? "description_desc" : "description";
        SortParm = sortOrder;

        if (searchString != null)
        {
            pageIndex = 1;
        }
        else
        {
            searchString = CurrentFilter;
        }

        // Query para obter produtos
        var productsQuery = ctx.ProductsInStock.Include(i => i.Image).AsQueryable();

        // Recuperar os dados antes de aplicar o filtro e a ordenação
        var ProductsInStockList = await productsQuery.ToListAsync();

        // Atualizar as propriedades de pesquisa
        SearchString = searchString;

        if (!string.IsNullOrEmpty(searchString))
        {
            searchString = searchString.ToLower(); 
            productsQuery = productsQuery.Where(p =>
                p.Name.ToLower().Contains(searchString) || p.Description.ToLower().Contains(searchString));
        }

        // Aplicar classificação pelo campo Nome

        switch (sortOrder)
        {
            case "name":
                productsQuery = productsQuery.OrderBy(p => p.Name);
                break;
            case "name_desc":
                productsQuery = productsQuery.OrderByDescending(p => p.Name);
                break;
            case "description_desc":
                productsQuery = productsQuery.OrderByDescending(p => p.Description);
                break;
            case "description":
                productsQuery = productsQuery.OrderBy(p => p.Description);
                break;
            default:
                break;
        }

        var pageSize = _configuration.GetValue("PageSize", 5);
        ProductInStock = await PaginatedList<ProductInStock>.CreateAsync(
            productsQuery.AsNoTracking(), pageIndex ?? 1, pageSize);
    }

    public async Task<IActionResult> OnPostProductDeleteAsync(int? id)
    {
        if (id == null)
        {
            return NotFound();
        }

        var productToDelete = await ctx.ProductsInStock
            .Include(f => f.Image)
            .FirstOrDefaultAsync(f => f.ProductInStockId == id);

        if (productToDelete == null)
        {
            return NotFound();
        }

        try
        {
            var allAffectedDisplayCases = ctx.DisplayCases.Where(d => d.ProductsInStock.Contains(productToDelete));

            _imageService.DeleteUploadedFile(productToDelete.Image);
            ctx.ProductsInStock.Remove(productToDelete);

            foreach (var displayCase in allAffectedDisplayCases)
            {
                displayCase.IsFilled = false;
            }

            await ctx.SaveChangesAsync();
            return RedirectToPage("./Index", new { DeleteSuccessMessage = "Produto eliminado com sucesso." });

        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return RedirectToAction("./Index", new { id, hasErrorMessage = true});
        }
    }


}
