/**
==========================================================
YES FREE ERP
config.js
Configuração principal Frontend
GitHub Pages → Google Apps Script API
==========================================================
*/


/**
==========================================================
URL DA API GOOGLE APPS SCRIPT
==========================================================

Substituir pelo endereço publicado:

Implantar:
Google Apps Script
→ Implantar
→ Nova implantação
→ Aplicativo da Web
→ Executar como: Você
→ Quem tem acesso: Qualquer pessoa

Copiar URL /exec

==========================================================
*/


const API_URL =

"https://script.google.com/macros/s/SEU_ID_DA_IMPLANTACAO/exec";




/**
==========================================================
CONFIGURAÇÃO DO SISTEMA
==========================================================
*/


const SISTEMA = {


nome:

"YES FREE ERP",



empresa:

"YES FREE",



versao:

"1.0.0",



moeda:

"BRL",



idioma:

"pt-BR",



whatsapp:

"5591988198999"



};




/**
==========================================================
CHAMADA PADRÃO API
==========================================================
*/


async function chamarAPI(
acao,
dados={}
){



try{



const resposta =

await fetch(

API_URL,

{


method:

"POST",



headers:{


"Content-Type":

"application/json"


},



body:

JSON.stringify({


acao:

acao,


dados:

dados



})



}

);



const resultado =

await resposta.json();



return resultado;



}

catch(erro){



console.error(

"Erro API:",

erro

);



return {


sucesso:false,


mensagem:

"Erro de conexão com servidor"



};



}



}



/**
==========================================================
TESTE DE CONEXÃO
==========================================================
*/


async function testarAPI(){



const retorno =

await chamarAPI(

"teste"

);



console.log(

retorno

);



return retorno;



}
