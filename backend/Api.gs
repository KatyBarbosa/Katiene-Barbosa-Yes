/**
==========================================================
YES FREE ERP
API.gs
Camada de comunicação Frontend ↔ Apps Script ↔ Sheets
==========================================================
*/


/**
 * Dados iniciais do sistema
 */
function apiInicial(){


return {


sistema:{

nome:
CONFIG.EMPRESA.NOME,

versao:
CONFIG.EMPRESA.VERSAO

},


usuario:{

nome:
Session
.getActiveUser()
.getEmail()

}


};


}



/**
==========================================================
CLIENTES
==========================================================
*/


function apiListarClientes(){


const dados =
listarClientes();



return dados.map(function(c){


return {


id:c[0],

nome:c[1],

tipoPessoa:c[2],

cpf:c[3],

telefone:c[5],

whatsapp:c[6],

email:c[7],

cidade:c[12],

endereco:c[9],

status:c[15]


};


});


}



function apiBuscarClienteVenda(valor){


return buscarClienteVenda(valor);


}



function apiBuscarCliente(id){


return buscarCliente(id);


}



function apiSalvarCliente(dados){


return cadastrarClienteCompleto(dados);


}



/**
==========================================================
PRODUTOS
==========================================================
*/


function apiListarProdutos(){


const dados =
listarProdutos();



return dados.map(function(p){


return {


id:p[1],

codigo:p[2],

nome:p[3],

categoria:p[4],

unidade:p[5],

precoRevenda:
p[6],

preco:
p[7],

estoque:
p[8]


};


});


}



function apiBuscarProduto(nome){


return buscarProduto(nome);


}



function apiSalvarProduto(dados){


return cadastrarProdutoCompleto(dados);


}



/**
==========================================================
PEDIDOS
==========================================================
*/


function apiSalvarPedido(dados){


return salvarPedidoCompleto(dados);


}



function apiListarPedidos(){


return listarPedidos();


}



/**
==========================================================
DASHBOARD
==========================================================
*/


function apiDashboard(){


return montarDashboard();


}



/**
==========================================================
PDF
==========================================================
*/


function apiGerarPDF(
idPedido,
tipo
){


return gerarPDF(
idPedido,
tipo
);


}



/**
==========================================================
WHATSAPP
==========================================================
*/


function apiWhatsappCliente(
idCliente
){


return enviarWhatsappCadastro(
idCliente
);


}



function apiWhatsappPedido(
idPedido,
tipo
){


return enviarWhatsappPedido(
idPedido,
tipo
);


}



/**
==========================================================
ESTOQUE
==========================================================
*/


function apiEstoque(){


return listarEstoque();


}



/**
==========================================================
FINANCEIRO
==========================================================
*/


function apiFinanceiro(){


return listarContasReceber();


}



/**
==========================================================
RELATÓRIOS
==========================================================
*/


function apiRelatorioVendas(
inicio,
fim
){


return relatorioVendas(
inicio,
fim
);


}



function apiRelatorioFinanceiro(){


return relatorioFinanceiro();


}



/**
==========================================================
UPLOAD / INCLUDE HTML
==========================================================
*/


function include(
arquivo
){


return HtmlService

.createHtmlOutputFromFile(
arquivo
)

.getContent();


}
