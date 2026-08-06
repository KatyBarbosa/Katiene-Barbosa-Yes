/**
==========================================================
YES FREE ERP
config.js
GitHub Pages → Google Apps Script API
==========================================================
*/


const API_URL =

"https://script.google.com/macros/s/AKfycbyjMeqqz3WiX4nG6Q3Bwbt5dJx7_mmgqAUc68KHyb4BZZh41JTQ3C4FNoD6elFIeNFI0A/exec";



const DATABASE_CONFIG = {


nomePlanilha:

"Pedidos",


idPlanilha:

"1rgYIXTXltzc7vCRQFhge0y_L7-V0UdPrMoImv77jolA"



};



const SISTEMA = {


nome:

"Katiene Barbosa Yes",


empresa:

"Katiene Barbosa Yes",


versao:

"1.0.0",


moeda:

"BRL",


idioma:

"pt-BR",


whatsapp:

"5591988198999"



};



async function chamarAPI(
acao,
dados={}
){


try{


const resposta = await fetch(

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

dados,


planilha:

DATABASE_CONFIG.idPlanilha


})


}

);



return await resposta.json();



}

catch(erro){


console.error(

"Erro API:",

erro

);



return {


sucesso:false,


mensagem:

"Falha de conexão com API"


};



}



}



async function testarAPI(){


return await chamarAPI(

"teste"

);


}
