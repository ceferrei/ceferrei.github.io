using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;
using MyProducts.Services;

namespace MyProducts.Areas.DisplayCases.Pages;

public class CompatibilityTestModel : PageModel
{
    private readonly ImageService _imageService;
    private readonly ApplicationDbContext _context;

    public CompatibilityTestModel(ApplicationDbContext context, ImageService imageService)
    {
        _context = context;
        _imageService = imageService;
    }

    public DisplayCase DisplayCase { get; set; }

    public async Task<IActionResult> OnGetAsync(int id)
    {
        DisplayCase = await _context.DisplayCases
            .FirstOrDefaultAsync(dc => dc.DisplayCaseId == id);

        if (DisplayCase == null)
        {
            return NotFound();
        }

        return Page();
    }
}
