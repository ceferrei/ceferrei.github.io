
using System.Configuration;
using System.Formats.Asn1;
using System.Globalization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using MyProducts.Data;
using MyProducts.Models;
using Newtonsoft.Json;
using CsvHelper;

namespace MyProducts.Areas.DisplayCases.Pages;

public class EditModel : PageModel
{
    private readonly ApplicationDbContext _ctx;
    public TableDisplayCase[,] TableDisplayCases { get; set; }// matriz bidimensional
    [BindProperty]
    public int DisplayCaseId { get; set; }
    [BindProperty]
    public string Name { get; set; }
    [BindProperty]
    public int ShelfCount { get; set; }
    [BindProperty]
    public int ProductsPerShelf { get; set; }
    public List<ProductInStock> ProductInStock { get; set; }

    public List<SelectedProduct> SelectedProducts { get; set; }

    public EditModel(ApplicationDbContext ctx)
    {
        _ctx = ctx;
    }

    public class PostResponse
    {
        public class DisplayTableData
        {
            public int CellId { get; set; }
            public int ProductId { get; set; }
            public int Shelf { get; set; }
            public int Column { get; set; }
        }

        public string Name { get; set; }
        public int Id { get; set; }
        public List<DisplayTableData> DisplayTables { get; set; }
    }



    //async-> pq realiza acoes sem bloquear a execução, é usado para ações que demoram, por ex para ir à BD
    //task-> retorna um objeto task que é como uma promessa de que a tarefa será concluída no futuro
    //IActionResult-> é o tipo de retorno, pode retornar respostas HTTP, redirecionamentos, paginas ou json
    //OnGetAsync-> trata dos pedidos
    public async Task<IActionResult> OnGetAsync(int? id)
    {

        if (id == null || _ctx.DisplayCases == null)
        {
            return NotFound();
        }
        //await->usado para esperar que a operação de consulta termine para continuAR    (nao dá para usar o await sem usar o async.)
        //include-> vai carregar os dados das ceculas para a vitrine e dos produtos para a vitrine
        //FirstOrDefaultAsync -> executa a consulta na BD. Vai procurar o primeiro registo (ou null) na tabela DisplayCases onde a propriedade DisplayCaseId corresponde ao valor do parâmetro id e devolve so um obj

        var displaycase = await _ctx.DisplayCases.Include(dc => dc.TableDisplayCases).Include(t => t.ProductsInStock).FirstOrDefaultAsync(m => m.DisplayCaseId == id);

        if (displaycase == null)//se a consulta não encontrou nenhum registro na BD
        {
            return NotFound();
        }
        else
        {

            //inicializo a matriz e digo-lhe os valores que toma
            TableDisplayCases = new TableDisplayCase[displaycase.ShelfCount, displaycase.ProductsPerShelf];

            foreach (var tableDisplayCase in displaycase.TableDisplayCases)//percorro todAS as ceculas e para cada uma dou-lhes o numero do seu row e col
            {
                int rowIndex = tableDisplayCase.Shelf - 1;
                int columnIndex = tableDisplayCase.Column - 1;
                TableDisplayCases[rowIndex, columnIndex] = tableDisplayCase;//vou popular essa cecula com o objeto
            }
        }

        //vou buscar os produtos
        // Tenho de ir buscar a imagem com o include porque vou por as fotos a aparecer na tabela.
        // ToListAsync-> nao uso FirstOrDefaultAsync porque ele so devolvia um e agora quero uma lista

        ProductInStock = await _ctx.ProductsInStock.Include(i => i.Image).ToListAsync();

        //sem esta linha o nome da vitrine nao aparece porque nao conseguia usar o name no html
        Name = displaycase.Name;
        DisplayCaseId = displaycase.DisplayCaseId;
        ShelfCount = displaycase.ShelfCount;
        ProductsPerShelf = displaycase.ProductsPerShelf;
        return Page();
    }

    [HttpPost]// é usado para indicar que o método a seguir deve ser executado em resposta a uma solicitação HTTP POST.
    public async Task<IActionResult> OnPost()
    {
        // StreamReader-> classe que permite ler um fluxo de caracteres (no caso, o corpo da solicitação).
        //Request.Body -> propriedade que fornece acesso ao corpo da solicitação HTTP.É uma sequência de bytes que contém os dados enviados no corpo da solicitação.
        using (StreamReader reader = new StreamReader(Request.Body))
        {
            try
            {
                //reader-> le o request
                //ReadToEndAsync-> significa "le todo o conteúdo da solicitação"
                //PostResponse-> classe que representa um formato especifico de dados
                //JsonConvert.DeserializeObject<PostResponse>(json)-> Aqui, estamos usando uma biblioteca chamada "JsonConvert" para converter o texto (que está na variável json)
                //em um objeto do tipo PostResponse. Isso é necessário para que possamos usar os dados enviados na solicitação HTTP em nosso código de forma estruturada.

                string json = await reader.ReadToEndAsync();// lê todo o texto que foi enviado na solicitação e armazena esse texto na variável json
                PostResponse res = JsonConvert.DeserializeObject<PostResponse>(json);

                // Procura um caso de exibição no banco de dados com base no ID recebido na solicitação
                var DisplayCaseToUpdate = await _ctx.DisplayCases
                    .Include(dc => dc.TableDisplayCases)
                    .FirstOrDefaultAsync(f => f.DisplayCaseId == res.Id);

                if (DisplayCaseToUpdate == null)
                    return NotFound();

                if (DisplayCaseToUpdate != null)
                {
                    // Atualiza o nome do caso de exibição com base nos dados recebidos
                    DisplayCaseToUpdate.Name = res.Name;
                }

                DisplayCaseToUpdate.IsFilled = true;

                // Itera sobre as tabelas de exibição recebidas no JSON
                foreach (var tableDisplayCase in res.DisplayTables)
                {
                    if (tableDisplayCase.CellId == -1)
                    {
                        // Se CellId for -1, cria uma nova tabela de exibição
                        var newTable = new TableDisplayCase(tableDisplayCase.Shelf, tableDisplayCase.Column);
                        newTable.DisplayCaseId = res.Id;

                        if (tableDisplayCase.ProductId != -1)
                        {
                            // Se ProductId for diferente de -1, define ProductInStockId e isFilled como true
                            newTable.ProductInStockId = tableDisplayCase.ProductId;
                        }
                        else
                        {
                            DisplayCaseToUpdate.IsFilled = false;
                        }

                        // Adiciona a nova tabela de exibição ao contexto do banco de dados
                        _ctx.TableDisplayCases.Add(newTable);
                    }
                    else
                    {
                        // Se CellId não for -1, atualiza uma tabela de exibição existente
                        var tableDisplayCaseToUpdate = await _ctx.TableDisplayCases.FirstOrDefaultAsync(t => t.TableDisplayCaseId == tableDisplayCase.CellId);
                        if (tableDisplayCaseToUpdate == null)
                        {
                            continue;
                        }

                        if (tableDisplayCase.ProductId == -1)
                        {
                            // Se ProductId for -1, remove a associação com um produto e define isFilled como false
                            tableDisplayCaseToUpdate.ProductInStockId = null;
                            DisplayCaseToUpdate.IsFilled = false;
                        }
                        else
                        {
                            // Se ProductId for diferente de -1, atualiza a associação com um produto e define isFilled como true
                            tableDisplayCaseToUpdate.ProductInStockId = tableDisplayCase.ProductId;
                        }
                    }
                }

                // Atualiza a contagem de prateleiras e produtos por prateleira com base nos dados recebidos
                DisplayCaseToUpdate.ShelfCount = res.DisplayTables.OrderByDescending(x => x.Shelf).FirstOrDefault().Shelf;
                DisplayCaseToUpdate.ProductsPerShelf = res.DisplayTables.OrderByDescending(x => x.Column).FirstOrDefault().Column;
                DisplayCaseToUpdate.LastUpdatedDate = DateTime.Now;


                // Identifica as tabelas de exibição que devem ser excluídas
                var tablesToDelete = DisplayCaseToUpdate.TableDisplayCases.Where(t => t.Shelf > DisplayCaseToUpdate.ShelfCount || t.Column > DisplayCaseToUpdate.ProductsPerShelf);

                // Remove as tabelas de exibição excedentes
                _ctx.TableDisplayCases.RemoveRange(tablesToDelete);

                // Salva as alterações no banco de dados
                await _ctx.SaveChangesAsync();

                // Retorna um JSON como resposta
                return new JsonResult(res);
            }
            catch (Exception ex)
            {
                // Em caso de exceção, registra a exceção no console e retorna um erro 500
                Console.WriteLine(ex.ToString());
                return StatusCode(500, "An error occurred");
            }
        }
    }
    private bool DisplayCaseExists(int id)
    {
        return (_ctx.DisplayCases?.Any(e => e.DisplayCaseId == id)).GetValueOrDefault();
    }
}