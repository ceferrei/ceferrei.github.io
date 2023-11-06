using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;

namespace MyProducts.Areas.DisplayCases.Pages
{
    public class DeleteModel : PageModel
    {
        private readonly MyProducts.Data.ApplicationDbContext _context;

        public DeleteModel(MyProducts.Data.ApplicationDbContext context)
        {
            _context = context;
        }

        [BindProperty]
      public DisplayCase DisplayCase { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.DisplayCases == null)
            {
                return NotFound();
            }

            var displaycase = await _context.DisplayCases.FirstOrDefaultAsync(m => m.DisplayCaseId == id);

            if (displaycase == null)
            {
                return NotFound();
            }
            else 
            {
                DisplayCase = displaycase;
            }
            return Page();
        }

        public async Task<IActionResult> OnPostAsync(int? id)
        {
            if (id == null || _context.DisplayCases == null)
            {
                return NotFound();
            }
            var displaycase = await _context.DisplayCases.FindAsync(id);

            if (displaycase != null)
            {
                DisplayCase = displaycase;
                _context.DisplayCases.Remove(DisplayCase);
                await _context.SaveChangesAsync();
            }

            return RedirectToPage("./Index");
        }
    }
}
