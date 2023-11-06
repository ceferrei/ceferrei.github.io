using System.ComponentModel.DataAnnotations.Schema;

namespace MyProducts.Models;

public class Compatibility
{
    public int CompatibilityId { get; set; }

    // Relacionamento com a vitrine
    public int DisplayCaseId { get; set; }
    public DisplayCase DisplayCase { get; set; }

    // Informações de compatibilidade
    public bool TestResultBool { get; set; }
    public float TestResultPerc { get; set; }

    // Informações relativas à foto tirada
    [NotMapped]
    public IFormFile TakenPhoto { get; set; }
    public string Path { get; set; }
}

