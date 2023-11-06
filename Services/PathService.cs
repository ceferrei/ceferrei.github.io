using Microsoft.Data.SqlClient;
using MyProducts.Options;

namespace MyProducts.Services;

public class PathService
{
    private readonly IConfiguration configuration;//usada para aceder configurações de aplicativo
    private readonly IWebHostEnvironment env;//usada para informações sobre o ambiente de hospedagem da web

    public PathService(IConfiguration configuration, IWebHostEnvironment env)
    {
        this.configuration = configuration;
        this.env = env;
    }

    public string GetUploadsPath(string? filename = null, bool withWebRootPath = true, string chooseFolder = "productImages")// responsável por obter caminhos para uploads de arquivos.
    {
        var pathOptions = new PathOptions();
        configuration.GetSection(PathOptions.Path).Bind(pathOptions);//bind para vincular ou mapear

        var uploadsPath = "";
        switch (chooseFolder)
        {
            case "productImages":
                uploadsPath = pathOptions.ProductsImages;
                break;
            default:
                uploadsPath = pathOptions.DisplayCasesTakenPhoto;
                break;
        }
       
                

        if (null != filename)
            uploadsPath = Path.Combine(uploadsPath, filename);
        return withWebRootPath ? Path.Combine(env.WebRootPath, uploadsPath) : uploadsPath;
    }
}





