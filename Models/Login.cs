using System.ComponentModel.DataAnnotations;

namespace MyProducts.Models;

public class Login
{
    [Microsoft.Build.Framework.Required]
    [DataType(DataType.EmailAddress)]
    public string Email { get; set; }

    [Required]
    [DataType((DataType.Password))]
    public string Password { get; set; }


    public bool RememberMe { get; set; }
}