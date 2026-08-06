/**
==========================================================
YES FREE ERP
Menu.gs
Menus personalizados Google Sheets
==========================================================
*/


/**
==========================================================
CRIAR MENU
==========================================================
*/

function onOpen(){



SpreadsheetApp

.getUi()

.createMenu(

"YES FREE ERP"

)



.addItem(

"Dashboard",

"abrirDashboard"

)



.addSeparator()



.addItem(

"Cadastrar Cliente",

"abrirCadastroCliente"

)



.addItem(

"Cadastrar Produto",

"abrirCadastroProduto"

)



.addItem(

"Novo Pedido",

"abrirNovoPedido"

)



.addSeparator()



.addItem(

"Atualizar Validações",

"criarValidacoes"

)



.addItem(

"Gerar Backup",

"dbBackup"

)



.addToUi();



}



/**
==========================================================
ABRIR DASHBOARD
==========================================================
*/

function abrirDashboard(){


SpreadsheetApp

.getUi()

.alert(

"Dashboard YES FREE disponível na interface Web."

);



}



/**
==========================================================
CADASTRO CLIENTE
==========================================================
*/

function abrirCadastroCliente(){



SpreadsheetApp

.getUi()

.alert(

"Acesse pelo sistema Web YES FREE."

);



}



/**
==========================================================
CADASTRO PRODUTO
==========================================================
*/

function abrirCadastroProduto(){



SpreadsheetApp

.getUi()

.alert(

"Acesse pelo sistema Web YES FREE."

);



}



/**
==========================================================
NOVO PEDIDO
==========================================================
*/

function abrirNovoPedido(){



SpreadsheetApp

.getUi()

.alert(

"Acesse pelo sistema Web YES FREE."

);



}



/**
==========================================================
WEB APP
==========================================================
*/

function doGet(){



return HtmlService

.createTemplateFromFile(

"index"

)

.evaluate()

.setTitle(

"YES FREE ERP"

)

.setXFrameOptionsMode(

HtmlService.XFrameOptionsMode.ALLOWALL

);



}



/**
==========================================================
INICIALIZAÇÃO SISTEMA
==========================================================
*/

function inicializarSistema(){



criarEstruturaAbas();


criarValidacoes();


registrarLog(

"SISTEMA",

"INICIALIZADO",

""

);



return resposta(

true,

"Sistema inicializado"

);



}
