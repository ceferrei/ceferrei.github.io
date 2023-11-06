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
    public class DetailsModel : PageModel
    {
        private readonly ApplicationDbContext _context;

        public DetailsModel(ApplicationDbContext context)
        {
            _context = context;
        }
        //[BindProperty]
        public DisplayCase DisplayCase { get; set; }
        public TableDisplayCase[,] TableDisplayCases { get; set; }
        [BindProperty]
        public bool IsFilled { get; set; }

        public async Task<IActionResult> OnGetAsync(int? id)
        {
            if (id == null || _context.DisplayCases == null)
            {
                return NotFound();
            }

            var displaycase = await _context.DisplayCases.Include(dc => dc.TableDisplayCases).FirstOrDefaultAsync(m => m.DisplayCaseId == id);
            if (displaycase == null)
            {
                return NotFound();
            }
            else 
            {
                DisplayCase = displaycase;
                TableDisplayCases = new TableDisplayCase[displaycase.ShelfCount, displaycase.TotalProducts];

                foreach (var tableDisplayCase in displaycase.TableDisplayCases)
                {
                    int rowIndex = tableDisplayCase.Shelf - 1;
                    int columnIndex = tableDisplayCase.Column - 1;

                    TableDisplayCases[rowIndex, columnIndex] = tableDisplayCase;
                }
            }
            IsFilled = DisplayCase.IsFilled;
            return Page();
        }
    }
}
