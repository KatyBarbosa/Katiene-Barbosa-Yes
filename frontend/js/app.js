/**
==========================================================
YES FREE ERP
app.js
Controle principal SPA Frontend
Google Apps Script Web App
==========================================================
*/


/**
==========================================================
VARIÁVEIS GLOBAIS
==========================================================
*/


let sistema = {};

let telaAtual = "";

let dadosAplicacao = {};



/**
==========================================================
INICIALIZAÇÃO
==========================================================
*/

function iniciarSistema(){



google.script.run

.withSuccessHandler(function(res){


sistema = res;



console.log(
"YES FREE iniciado",
sistema
);



})

.apiInicial();



}



/**
==========================================================
NAVEGAÇÃO SPA
==========================================================
*/

function abrirTela(
tela
){



telaAtual = tela;



const area =

document.getElementById(
"conteudo"
);



if(!area){

return;

}



switch(tela){



case "dashboard":


telaDashboard();


break;



case "clientes":


telaClientes();


break;



case "produtos":


telaProdutos();


break;



case "venda":


telaVenda();


break;



case "pedidos":


telaPedidos();


break;



case "financeiro":


telaFinanceiro();


break;



default:



area.innerHTML =

`

<div class="card">

<h2>
Tela não encontrada
</h2>

</div>

`;



}



}



/**
==========================================================
CARREGAR COMPONENTE HTML
==========================================================
*/

function carregarComponente(
id
){



const componente =

document.getElementById(
id
);



return componente
?
componente.innerHTML
:
"";



}



/**
==========================================================
CRIAR CONTEÚDO DINÂMICO
==========================================================
*/

function criarHTML(
html
){



document

.getElementById(
"conteudo"
)

.innerHTML = html;



}



/**
==========================================================
MENSAGENS SISTEMA
==========================================================
*/

function mensagem(
texto,
tipo
){



let cor = "";



switch(tipo){


case "erro":

cor="#dc3545";

break;



case "sucesso":

cor="#28a745";

break;



default:

cor="#002A47";


}



const box =

document.createElement(
"div"
);



box.innerHTML = texto;



box.style.position="fixed";

box.style.top="20px";

box.style.right="20px";

box.style.padding="15px";

box.style.background=cor;

box.style.color="white";

box.style.borderRadius="8px";

box.style.zIndex="9999";



document.body.appendChild(box);



setTimeout(function(){


box.remove();


},3000);



}



/**
==========================================================
FORMATA MOEDA
==========================================================
*/

function moeda(
valor
){



return Number(valor || 0)

.toLocaleString(

"pt-BR",

{

style:"currency",

currency:"BRL"

}

);



}



/**
==========================================================
FORMATA DATA
==========================================================
*/

function dataBR(
data
){



if(!data){

return "";

}



return new Date(data)

.toLocaleDateString(
"pt-BR"
);



}



/**
==========================================================
CONFIRMAÇÃO
==========================================================
*/

function confirmar(
texto
){


return window.confirm(
texto
);


}



/**
==========================================================
EXECUTA GOOGLE SCRIPT
==========================================================
*/

function executar(
funcao,
dados,
sucesso
){



google.script.run



.withSuccessHandler(function(res){



if(sucesso){


sucesso(res);


}



})



.withFailureHandler(function(erro){



mensagem(

erro.message,

"erro"

);



})



[funcao](dados);



}



/**
==========================================================
INÍCIO
==========================================================
*/


window.addEventListener(

"load",

function(){


iniciarSistema();


}

);
