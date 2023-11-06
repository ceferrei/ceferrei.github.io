using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace MyProducts.Pages
{
    public class PrivacyModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public PrivacyModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {

        }
    }
}