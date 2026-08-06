/**
==========================================================
KATIENE BARBOSA YES ERP
Database.gs

Camada de acesso ao banco de dados

Responsável por:
- Conexão com Google Sheets
- Controle das abas
- Leitura
- Escrita
- Atualização
- Exclusão
- Criação automática das estruturas

Banco:
Google Planilha
ID:
1rgYIXTXltzc7vCRQFhge0y_L7-V0UdPrMoImv77jolA

==========================================================
*/


/**
==========================================================
CONFIGURAÇÃO BANCO
==========================================================
*/


const DATABASE = {


ID:

"1rgYIXTXltzc7vCRQFhge0y_L7-V0UdPrMoImv77jolA",



NOME:

"Pedidos",



ABAS:{


CLIENTES:

"Clientes",


PRODUTOS:

"Produtos",


PEDIDOS:

"Pedidos",


ITENS_PEDIDOS:

"Itens_Pedidos",


ESTOQUE:

"Estoque",


FINANCEIRO:

"Financeiro",


DASHBOARD:

"Dashboard",


LOGS:

"Logs"



}



};




/**
==========================================================
ABRIR PLANILHA
==========================================================
*/


function abrirBanco(){



return SpreadsheetApp.openById(

DATABASE.ID

);



}



/**
==========================================================
PEGAR ABA
==========================================================
*/


function obterAba(
nome
){



const planilha =

abrirBanco();



let aba =

planilha.getSheetByName(

nome

);



if(!aba){



aba =

planilha.insertSheet(

nome

);



}



return aba;



}



/**
==========================================================
CRIAR ESTRUTURA BANCO
==========================================================
*/


function inicializarBanco(){



const estrutura = {



Clientes:[

"ID",

"Nome",

"Tipo",

"CPF_CNPJ",

"Telefone",

"Email",

"Endereco",

"Data_Cadastro",

"Status"

],



Produtos:[

"ID",

"Codigo",

"Nome",

"Categoria",

"Unidade",

"Preco_Consumidor",

"Preco_Revenda",

"Estoque",

"Estoque_Minimo",

"Status"

],



Pedidos:[

"ID",

"Data",

"Cliente",

"Tipo",

"Total",

"Desconto",

"Frete",

"Status"

],



Itens_Pedidos:[

"ID",

"Pedido_ID",

"Produto",

"Quantidade",

"Valor",

"Subtotal"

],



Estoque:[

"ID",

"Produto",

"Entrada",

"Saida",

"Saldo",

"Data"

],



Financeiro:[

"ID",

"Pedido",

"Tipo",

"Valor",

"Status",

"Data"

],



Logs:[

"ID",

"Data",

"Usuario",

"Acao"

]



};





Object.keys(estrutura)

.forEach(function(nome){



const aba =

obterAba(

nome

);



if(

aba.getLastRow()

===0

){



aba

.appendRow(

estrutura[nome]

);



}



});




return {


sucesso:true,


mensagem:

"Banco inicializado"



};



}





/**
==========================================================
LER TODOS REGISTROS
==========================================================
*/


function bancoListar(
abaNome
){



const aba =

obterAba(

abaNome

);



const dados =

aba.getDataRange()

.getValues();



if(

dados.length<=1

){


return [];

}



const cabecalho =

dados.shift();



return dados.map(function(linha){



let objeto={};



cabecalho.forEach(function(coluna,index){



objeto[coluna]=

linha[index];



});



return objeto;



});



}



/**
==========================================================
INSERIR REGISTRO
==========================================================
*/


function bancoInserir(
abaNome,
dados
){



const aba =

obterAba(

abaNome

);



const cabecalho =

aba

.getRange(

1,

1,

1,

aba.getLastColumn()

)

.getValues()[0];



const linha =

cabecalho.map(function(coluna){



return dados[coluna] || "";



});



aba.appendRow(

linha

);



return {


sucesso:true


};



}





/**
==========================================================
ATUALIZAR REGISTRO
==========================================================
*/


function bancoAtualizar(
abaNome,
id,
dados
){



const registros =

bancoListar(

abaNome

);



const aba =

obterAba(

abaNome

);



const colunaID = 1;



for(

let i=0;

i<registros.length;

i++

){



if(

String(registros[i].ID)

===

String(id)

){



const linha = i+2;



const cabecalho =

aba

.getRange(

1,

1,

1,

aba.getLastColumn()

)

.getValues()[0];



cabecalho.forEach(function(coluna,index){



if(

dados[coluna]!==undefined

){



aba

.getRange(

linha,

index+1

)

.setValue(

dados[coluna]

);



}



});



return {


sucesso:true


};



}



}



return {


sucesso:false,


mensagem:

"Registro não encontrado"



};



}





/**
==========================================================
EXCLUIR REGISTRO
==========================================================
*/


function bancoExcluir(
abaNome,
id
){



const aba =

obterAba(

abaNome

);



const dados =

aba

.getDataRange()

.getValues();



for(

let i=dados.length-1;

i>0;

i--

){



if(

String(dados[i][0])

===

String(id)

){



aba

.deleteRow(

i+1

);



return {


sucesso:true


};



}



}



return {


sucesso:false,


mensagem:

"Registro não encontrado"



};



}
