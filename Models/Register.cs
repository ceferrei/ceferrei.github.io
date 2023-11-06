using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.Security.Cryptography;
using System.Text;

namespace MyProducts.Models
{
    public class Register
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        //public int ClientId { get; set; } 
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } // Corrigido para ser uma propriedade

        [Required]
        [DataType(DataType.Password)]
        [Compare(nameof(Password), ErrorMessage = "As senhas não coincidem")]
        public string ConfirmPassword { get; set; }

        //public virtual List<ProductInStock>? ProductsInStock { get; set; }
    }
}


