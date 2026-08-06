/**
==========================================================
KATIENE BARBOSA YES ERP
app.js
Controle principal SPA Frontend
GitHub Pages → API REST → Google Apps Script
==========================================================
*/


let telaAtual = "";

let sistemaDados = {};



/**
==========================================================
INICIALIZAÇÃO
==========================================================
*/


async function iniciarSistema(){


try{


const resposta = await chamarAPI(

"teste"

);



if(resposta.sucesso){


console.log(

"Sistema conectado",

resposta

);



sistemaDados = resposta;



}

else{


console.warn(

"API sem resposta"

);



}



}

catch(erro){



console.error(

erro

);



}



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



const conteudo =

document.getElementById(

"conteudo"

);



if(!conteudo){

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



case "vendas":


telaVendas();


break;



case "financeiro":


telaFinanceiro();


break;



default:



conteudo.innerHTML =

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
RENDERIZA HTML
==========================================================
*/


function renderizar(
html
){



const area =

document.getElementById(

"conteudo"

);



if(area){


area.innerHTML = html;


}



}



/**
==========================================================
EXECUTAR API
==========================================================
*/


async function executarAPI(
acao,
dados={},
callback
){



const resposta =

await chamarAPI(

acao,

dados

);



if(

callback

){



callback(

resposta

);



}



return resposta;



}



/**
==========================================================
MENSAGENS
==========================================================
*/


function mensagem(
texto,
tipo="sucesso"
){



const div =

document.createElement(

"div"

);



div.className =

"mensagem " + tipo;



div.innerHTML = texto;



document.body.appendChild(

div

);



setTimeout(

()=>{


div.remove();



},

3000

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


return confirm(

texto

);


}



/**
==========================================================
FORMATA MOEDA
==========================================================
*/


function moeda(
valor
){



return Number(

valor || 0

)

.toLocaleString(

"pt-BR",

{


style:

"currency",


currency:

"BRL"


}

);



}



/**
==========================================================
FORMATA DATA
==========================================================
*/


function dataBR(
valor
){



if(!valor){

return "";

}



return new Date(

valor

)

.toLocaleDateString(

"pt-BR"

);



}



/**
==========================================================
CARREGAMENTO INICIAL
==========================================================
*/


document.addEventListener(

"DOMContentLoaded",

function(){



iniciarSistema();



}

);
