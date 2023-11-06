using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace MyProducts.Services;

[Route("api/[controller]")]
[ApiController]
public class ExternalApiService
{
    private readonly HttpClient _httpClient;

    public ExternalApiService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        // Configurações adicionais do HttpClient conforme necessário
    }

    public async Task<string> CallExternalApiAsync(string requestData)
    {
        try
        {
            // Lógica para enviar a solicitação para a REST API do outro programa
            var content = new StringContent(requestData, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync("http://127.0.0.1:10000/", content);//falta algo no url

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }
            else
            {
                // Lidar com os diferentes códigos de status de erro da API externa
                return "Erro ao chamar a API externa.";
            }
        }
        catch (Exception ex)
        {
            // Lidar com exceções de rede, etc.
            return $"Erro: {ex.Message}";
        }
    }
}
