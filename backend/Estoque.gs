/**
==========================================================
YES FREE ERP
Estoque.gs
Controle de estoque
Entrada / Saída / Ajuste
Integração Produtos + Movimentação_Estoque
==========================================================
*/


/**
==========================================================
LISTAR ESTOQUE
==========================================================
*/

function listarEstoque(){


return dbListar(

CONFIG.ABAS.ESTOQUE

);


}



/**
==========================================================
CRIAR ESTOQUE PRODUTO
==========================================================
*/

function criarEstoqueProduto(
idProduto,
produto,
categoria,
estoqueInicial,
estoqueMinimo
){



const idEstoque =

gerarID(
"EST"
);



const linha = [



idEstoque,


idProduto,


"",


produto,


categoria || "",


"",


Number(estoqueInicial || 0),


0,


0,


0,


Number(estoqueInicial || 0),


Number(estoqueMinimo || 0),


"OK",


new Date()



];



dbInserir(

CONFIG.ABAS.ESTOQUE,

linha

);



return true;



}



/**
==========================================================
BUSCAR ESTOQUE PRODUTO
==========================================================
*/

function buscarEstoqueProduto(
idProduto
){



const dados =

listarEstoque();



for(
let i=0;
i<dados.length;
i++
){


if(
dados[i][1] == idProduto
){


return {


linha:i+2,

dados:dados[i]


};



}



}



return null;



}



/**
==========================================================
BAIXAR ESTOQUE
==========================================================
*/

function baixarEstoque(
idProduto,
quantidade,
idPedido
){



const estoque =

buscarEstoqueProduto(
idProduto
);



if(!estoque){


return false;


}



let e =

estoque.dados;



let atual =

Number(e[10] || 0);



let qtd =

Number(quantidade || 0);



if(

!CONFIG.REGRAS.PERMITIR_ESTOQUE_NEGATIVO

&&

atual < qtd

){


throw new Error(

"Estoque insuficiente"

);


}



e[8] =

Number(e[8] || 0)

+

qtd;



e[10] =

atual

-

qtd;



e[13] =

new Date();



dbAtualizarLinha(

CONFIG.ABAS.ESTOQUE,

estoque.linha,

e

);



registrarMovimentacaoEstoque(

"SAIDA",

idProduto,

qtd,

idPedido

);



atualizarProdutoEstoque(

idProduto,

e[10]

);



return true;



}



/**
==========================================================
ENTRADA ESTOQUE
==========================================================
*/

function entradaEstoque(
idProduto,
quantidade,
origem
){



const estoque =

buscarEstoqueProduto(
idProduto
);



if(!estoque){

return false;

}



let e =

estoque.dados;



let qtd =

Number(quantidade || 0);



e[7] =

Number(e[7] || 0)

+

qtd;



e[10] =

Number(e[10] || 0)

+

qtd;



e[13] =

new Date();



dbAtualizarLinha(

CONFIG.ABAS.ESTOQUE,

estoque.linha,

e

);



registrarMovimentacaoEstoque(

"ENTRADA",

idProduto,

qtd,

origem

);



atualizarProdutoEstoque(

idProduto,

e[10]

);



return true;



}



/**
==========================================================
AJUSTE DE ESTOQUE
==========================================================
*/

function ajustarEstoque(
idProduto,
novoValor,
motivo
){



const estoque =

buscarEstoqueProduto(
idProduto
);



if(!estoque){

return false;

}



let e =
estoque.dados;



let atual =

Number(e[10] || 0);



e[9] =

Number(e[9] || 0)

+

(

Number(novoValor)

-

atual

);



e[10] =

Number(novoValor);



e[13] =

new Date();



dbAtualizarLinha(

CONFIG.ABAS.ESTOQUE,

estoque.linha,

e

);



registrarMovimentacaoEstoque(

"AJUSTE",

idProduto,

novoValor,

motivo

);



atualizarProdutoEstoque(

idProduto,

novoValor

);



return true;



}



/**
==========================================================
MOVIMENTAÇÃO
==========================================================
*/

function registrarMovimentacaoEstoque(
tipo,
idProduto,
quantidade,
origem
){



const produto =

buscarProdutoId(
idProduto
);



const linha = [



gerarID(
"MOV"
),


new Date(),


tipo,


idProduto,


produto ? produto.nome : "",


Number(quantidade || 0),


origem || "",


"",


usuarioAtual(),


""



];



dbInserir(

CONFIG.ABAS.MOVIMENTACAO_ESTOQUE,

linha

);



}



/**
==========================================================
ATUALIZAR PRODUTO
==========================================================
*/

function atualizarProdutoEstoque(
idProduto,
quantidade
){



const registro =

dbBuscarPorId(

CONFIG.ABAS.PRODUTOS,

idProduto

);



if(!registro){

return;

}



let p =

registro.dados;



p[8] =

Number(quantidade);



p[12] =

new Date();



dbAtualizarLinha(

CONFIG.ABAS.PRODUTOS,

registro.linha,

p

);



}



/**
==========================================================
ESTOQUE BAIXO
==========================================================
*/

function listarEstoqueBaixo(){



const dados =

listarEstoque();



return dados.filter(function(e){


return Number(e[10])

<=

Number(e[11]);


});


}
