/**
==========================================================
KATIENE BARBOSA YES ERP
Api.gs

API REST PRINCIPAL

Recebe:
GitHub Pages
    ↓
POST JSON
    ↓
doPost(e)

Envia:
    ↓
Clientes.gs
    ↓
Produtos.gs
    ↓
Pedidos.gs
    ↓
Dashboard.gs
    ↓
Google Sheets

==========================================================
*/


/**
==========================================================
CONFIGURAÇÃO CORS
==========================================================
*/


function doOptions(e){


return ContentService

.createTextOutput("")

.setMimeType(

ContentService.MimeType.TEXT

);

}




/**
==========================================================
POST PRINCIPAL
==========================================================
*/


function doPost(e){



try{


const requisicao =

JSON.parse(

e.postData.contents

);



const acao =

requisicao.acao;



const dados =

requisicao.dados || {};





let resposta;



switch(acao){



/**
==============================
TESTE API
==============================
*/


case "teste":



resposta = {


sucesso:true,


mensagem:

"API YES FREE ONLINE",


sistema:

"KATIENE BARBOSA YES ERP"



};



break;



/**
==============================
CLIENTES
==============================
*/


case "listarClientes":



resposta = {


sucesso:true,


dados:

listarClientes()



};



break;




case "salvarCliente":



resposta =

salvarCliente(

dados

);



break;




case "buscarCliente":



resposta = {


sucesso:true,


dados:

buscarCliente(

dados.id

)



};



break;




case "excluirCliente":



resposta =

excluirCliente(

dados.id

);



break;




/**
==============================
PRODUTOS
==============================
*/


case "listarProdutos":



resposta = {


sucesso:true,


dados:

listarProdutos()



};



break;




case "salvarProduto":



resposta =

salvarProduto(

dados

);



break;




case "buscarProduto":



resposta = {


sucesso:true,


dados:

buscarProduto(

dados.id

)



};



break;




case "excluirProduto":



resposta =

excluirProduto(

dados.id

);



break;




/**
==============================
PEDIDOS
==============================
*/


case "salvarPedido":



resposta =

salvarPedido(

dados

);



break;




/**
==============================
PDF
==============================
*/


case "gerarPDF":



resposta =

gerarPDF(

dados.id

);



break;




/**
==============================
WHATSAPP
==============================
*/


case "whatsappCliente":



resposta =

gerarWhatsAppCliente(

dados.id

);



break;



case "whatsappPedido":



resposta =

gerarWhatsAppPedido(

dados.id

);



break;




/**
==============================
DASHBOARD
==============================
*/


case "dashboard":



resposta = {


sucesso:true,


dados:

gerarDashboard()



};



break;




default:



resposta = {


sucesso:false,


mensagem:

"Ação não encontrada: "

+

acao



};



}





return respostaJSON(

resposta

);



}

catch(erro){



return respostaJSON({



sucesso:false,


mensagem:

erro.message,


linha:

erro.stack



});



}



}



/**
==========================================================
RETORNO JSON
==========================================================
*/


function respostaJSON(
dados
){



return ContentService

.createTextOutput(

JSON.stringify(

dados

)

)

.setMimeType(

ContentService.MimeType.JSON

);



}
