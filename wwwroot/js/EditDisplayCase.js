window.axios.defaults.withCredentials = true;

$(document).ready(() => {
    var selectedCell = null
    var token = $("input[name='__RequestVerificationToken']").val()

    $(document).ready(function () {
        $('#file-upload').change(function (e) {
            var file = e.target.files[0];
            var reader = new FileReader();

            $(this).val(null)

            reader.onload = function (e) {
                var contents = e.target.result;
                var rows = contents.split('\n').map(row => row.split(','));

                var rowIdx = 0;
                var colIdx = 0;

                rows.forEach(row => {
                    colIdx = 0;

                    row.forEach(cell => {
                        var cellData = cell.trim();

                        var currentCell = $(`#product-table .product-row:eq(${rowIdx}) .cell:eq(${colIdx})`);

                        if (currentCell.length > 0) {
                            const product = $('#product-select').find(`option[data-product-name="${cellData}"]`)

                            if (product.length > 0) {
                                addProductToCell(currentCell, product.val(), product.data('product-image'), cellData)
                            } else {
                                setEmptyCell(currentCell)
                            }
                        }

                        colIdx++;
                    });

                    rowIdx++;
                });
            };

            reader.readAsText(file);
        });
    });


    $(".cell").click(select);

    function select(event) {

        event.stopPropagation(); // Isso impede que o evento click se propague até o document

        if ($(this).hasClass("selected")) {

            $(this).removeClass("selected");

            selectedCell = null;

            return;

        }

        if (selectedCell) {

            selectedCell.removeClass("selected");

        }

        $(this).addClass("selected");

        selectedCell = $(this);


        var selectedProductId = $(this).attr("data-product-id");

        if (selectedProductId !== "") {

            $("#product-select").val(selectedProductId).trigger("change");

        } else {

            $("#product-select").val("0").trigger("change");

        }

    }


    // se clicar fora do select tira a cecula selecionada   

    $(document).click(function (event) { 
        if ($(event.target).closest('.cell, #product-select').length) return;
            if(selectedCell) {
                selectedCell.removeClass("selected");
                selectedCell = null;
            }
    });

    function setEmptyCell(selectedCell) {
        selectedCell.find('.icon-plus').removeClass("d-none")
        selectedCell.find('.product-image').addClass('d-none')

        selectedCell.find('.product-name').text('');
        selectedCell.find('.product-name').addClass('d-none');

        selectedCell.attr("data-product-id", -1)
    }

    function addProductToCell(selectedCell, selectedProductId, selectedProductImage, selectedProductName) {
        selectedCell.find('.product-image').attr('src', "/" + selectedProductImage);
        selectedCell.find('.icon-plus').addClass("d-none")
        selectedCell.find('.product-image').removeClass('d-none')

        selectedCell.find('.product-name').text(selectedProductName);
        selectedCell.find('.product-name').removeClass('d-none');

        selectedCell.attr("data-product-id", selectedProductId);
    }


    $('#product-select').change(function () {//no select, quando mudamos a escolha
        var selectedProductId = $(this).val();//o id do produto do select no momento
        var selectedProduct = $(`#product-select option[value="${selectedProductId}"]`)

        if (selectedCell !== null && selectedProductId !== null) {//tirar um produto
            if (selectedProductId === "0") {
                setEmptyCell(selectedCell)
            } else {//adicionar um produto
                addProductToCell(selectedCell, selectedProductId, selectedProduct.data('product-image'), selectedProduct.text())
                //$(this).val("0").change();
                //$("#product-select").val("0").trigger("change");
            }
        }
    });

    function updateShelfCountAndProductsPerShelf() {
        var rowCount = $(".product-row").length;
        var cellCount = $(".cell").length;

        // Atualiza o valor de ShelfCount com o número de prateleiras
        $("#shelfs").val(rowCount);

        // Calcula o valor de ProductsPerShelf e atualiza o campo correspondente
        if (rowCount > 0) {
            $("#products-per-shelf").val(cellCount / rowCount);
        } else {
            $("#products-per-shelf").val(0);
        }
    }

    $("#add-row").click(function () {
        var newRow = $(".product-row").last().clone()

        newRow.children(".cell").each(function () {
            $(this).find('input[type="hidden"]').val('');//tirar o texto

            $(this).find('.product-image').addClass('d-none')
            $(this).find('.icon-plus').removeClass('d-none')

            $(this).find('.product-name').text('').addClass('d-none');//escondo o nome do produto

            $(this).removeClass('selected');//quando ele faz clone de uma selecionada, a nova tmb fica e nao queremos isso. NAO ESTA A FUNCIONAR
            $(this).on('click', select)//adicionamos o click às clonadas

            // Set id and product to -1
            $(this).attr("data-cell-id", -1)
            $(this).attr("data-product-id", -1)

            $(this).attr("data-shelf", parseInt($(this).data("shelf")) + 1)
        })

        $("#product-table").append(newRow)
        updateShelfCountAndProductsPerShelf();
    })

    $("#remove-row").click(function () {
        $(".product-row").last().remove()
        updateShelfCountAndProductsPerShelf();
    })
    //updateShelfCountAndProductsPerShelf();

    $("#add-column").click(function () {
        $(".product-row").each(function () {
            var newCell = $(this).find(".cell").last().clone();

            newCell.find('input[type="hidden"]').val('');

            newCell.find('.product-image').addClass('d-none')
            newCell.find('.icon-plus').removeClass('d-none')

            newCell.find('.product-name').text('').addClass('d-none');

            // Adicione a classe "cell" às novas células
            newCell.removeClass('selected');
            newCell.on('click', select);

            // Set id and product to -1
            newCell.attr("data-cell-id", -1);
            newCell.attr("data-product-id", -1);

            newCell.attr("data-column", parseInt(newCell.data("column")) + 1);

            $(this).append(newCell);
        });

        // Atualize ShelfCount e ProductsPerShelf após adicionar coluna
        updateShelfCountAndProductsPerShelf();
    });



    $("#remove-column").click(function () {
        $(".product-row").each(function () {
            $(this).find(".cell").last().remove();
        });

        // Atualize ShelfCount e ProductsPerShelf após remover coluna
        updateShelfCountAndProductsPerShelf();
    });

    $("#btn-submit").click(function () {
        var Name = $("#name").val()

        // Initialize an empty array to store the data
        var DisplayTables = [];

        // Use jQuery to select the elements by their class
        $('.cell').each(function () {
            var cell = $(this);
            var cellId = cell.attr('data-cell-id');
            var productId = cell.attr('data-product-id');
            var shelf = cell.attr("data-shelf")
            var column = cell.attr("data-column")

            // Create an object with the data and push it to the array
            var dataObject = {
                CellId: cellId ? parseInt(cellId) : -1,
                ProductId: productId ? parseInt(productId) : -1,
                Shelf: shelf ? parseInt(shelf) : -1,
                Column: shelf ? parseInt(column) : -1
            };
            DisplayTables.push(dataObject);
        });

        // Get the current URL
        var url = new URL(window.location.href);

        // Get the search parameters as an object
        var queryParams = {};
        url.searchParams.forEach(function (value, key) {
            queryParams[key] = value;
        });

        axios.post("/DisplayCases/Edit", {
            Name,
            Id: queryParams.id,
            DisplayTables
        }, {
            headers: {
                RequestVerificationToken: token,
                'Content-Type': 'application/json'
            }
        }).then(function (res) {
            if (res.status === 200) {
                window.location.replace("/DisplayCases")
            }
        })
    })
    // Função para mostrar a visualização da imagem selecionada
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#imagePreview').attr('src', e.target.result);
                $('#imagePreview').show();
            }

            reader.readAsDataURL(input.files[0]);
        }
    }

    // Vincule a função ao evento change do input de arquivo
    $('#imageInput').change(function () {
        readURL(this);
    });

    // Função para tirar uma foto (usando a API de mídia)
    $("#take-photo").click(takePhoto)
    function takePhoto() {
        // Adicione aqui o código para tirar uma foto usando a API de mídia (ex: getUserMedia)
        // Exemplo simples:
        alert("Tirando foto..."); // Substitua isso com a lógica real para tirar uma foto.
    }

    // Função para carregar uma foto (ativando o input de arquivo)
    $("#upload-photo").click(browsePhoto)
    function browsePhoto() {
        $('#imageInput').click();
    }

    $("#submit-test").click(simulateCompatibilityTest)
    function simulateCompatibilityTest() {

        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0]; // Obtém o arquivo selecionado pelo usuário

        if (file) {
            const formData = new FormData();
            formData.append('image', file, file.name); // Adiciona a imagem ao FormData

            // Envia a imagem para o endpoint usando Axios
            axios.post('http://localhost:8000/api/preview', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    // Manipula a resposta recebida, se houver alguma
                    console.log('Resposta do servidor:', response.data);
                })
                .catch(error => {
                    // Lida com erros, se houver algum
                    console.error('Erro ao enviar a imagem:', error);
                });
        }

        //    // Simulação de valores aleatórios de compatibilidade (substitua com lógica real quando estiver integrado com a IA)
        //    var compatibilidade = Math.random() * 100;

        //    // Determine se a compatibilidade é aprovada ou rejeitada (80% como critério)
        //    var aprovado = compatibilidade >= 80;

        //    // Exiba o balão com base na aprovação
        //    var balao = document.createElement("div");
        //    balao.className = "alert alert-" + (aprovado ? "success" : "danger");
        //    balao.innerHTML = (aprovado ? 'Approved' : 'Failure') + ' - Compatibility: ' + compatibilidade.toFixed(2) + '%';

        //    // Adicione o balão à página
        //    var container = document.querySelector("main .modal-body");
        //    console.log(container)
        //    container.appendChild(balao);
        //
    }
})
  
   
        
   