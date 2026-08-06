/**
==========================================================
YES FREE ERP
Produtos.gs
Cadastro / Consulta / Preços / Estoque
==========================================================

Regras:
- Produto consumidor usa PRECO_CONSUMIDOR
- Revenda usa PRECO_REVENDA
- Estoque controlado pela aba Estoque
==========================================================
*/


/**
==========================================================
LISTAR PRODUTOS
==========================================================
*/

function listarProdutos(){


return dbListar(
CONFIG.ABAS.PRODUTOS
);


}



/**
==========================================================
BUSCAR PRODUTO POR ID
==========================================================
*/

function buscarProdutoId(
id
){


const registro =

dbBuscarPorId(

CONFIG.ABAS.PRODUTOS,

id

);



if(!registro){

return null;

}



const p =
registro.dados;



return {


dataCadastro:p[0],


id:p[1],


codigo:p[2],


nome:p[3],


categoria:p[4],


unidade:p[5],


precoRevenda:Number(p[6]||0),


precoConsumidor:Number(p[7]||0),


estoque:Number(p[8]||0),


estoqueMinimo:Number(p[9]||0),


status:p[10],


observacoes:p[11],


atualizadoEm:p[12],


embalagem:p[13],


pesoVolume:p[14],


ativo:p[15]


};


}



/**
==========================================================
BUSCA INTELIGENTE
NOME / CODIGO / ID
==========================================================
*/

function buscarProduto(
nome
){



nome =

limparTexto(nome)

.toLowerCase();



const produtos =

listarProdutos();



for(
let i=0;
i<produtos.length;
i++
){



const p =
produtos[i];



if(

String(p[1])

.toLowerCase()

.includes(nome)

||


String(p[2])

.toLowerCase()

.includes(nome)

||


String(p[3])

.toLowerCase()

.includes(nome)

){



return {


id:p[1],


codigo:p[2],


nome:p[3],


categoria:p[4],


preco:

Number(p[7]||0),


precoRevenda:

Number(p[6]||0),


estoque:

Number(p[8]||0)


};



}



}



return null;



}



/**
==========================================================
CADASTRAR PRODUTO
==========================================================
*/

function cadastrarProdutoCompleto(
dados
){



const id =

gerarID(
"PRO"
);



const linha = [



new Date(),


id,


dados.codigo || "",


dados.nome || "",


dados.categoria || "",


dados.unidade || "UN",


Number(dados.precoRevenda||0),


Number(dados.precoConsumidor||0),


Number(dados.estoque||0),


Number(dados.estoqueMinimo||0),


CONFIG.STATUS.ATIVO,


dados.observacoes || "",


new Date(),


dados.embalagem || "",


dados.pesoVolume || "",


true



];



dbInserir(

CONFIG.ABAS.PRODUTOS,

linha

);



/*
Cria controle inicial estoque
*/

criarEstoqueProduto(
id,
dados.nome,
dados.categoria,
dados.estoque || 0,
dados.estoqueMinimo || 0
);



registrarLog(

"PRODUTO",

"CRIADO",

id

);



return resposta(

true,

"Produto cadastrado",

{

id:id

}

);



}



/**
==========================================================
ATUALIZAR PRODUTO
==========================================================
*/

function atualizarProduto(
id,
dados
){



const registro =

dbBuscarPorId(

CONFIG.ABAS.PRODUTOS,

id

);



if(!registro){


return resposta(

false,

"Produto não encontrado"

);


}



let p =
registro.dados;



p[2] =
dados.codigo || p[2];


p[3] =
dados.nome || p[3];


p[4] =
dados.categoria || p[4];


p[5] =
dados.unidade || p[5];


p[6] =
Number(dados.precoRevenda || p[6]);


p[7] =
Number(dados.precoConsumidor || p[7]);


p[9] =
Number(dados.estoqueMinimo || p[9]);


p[11] =
dados.observacoes || p[11];


p[12] =
new Date();



dbAtualizarLinha(

CONFIG.ABAS.PRODUTOS,

registro.linha,

p

);



registrarLog(

"PRODUTO",

"ATUALIZADO",

id

);



return resposta(

true,

"Produto atualizado"

);



}



/**
==========================================================
EXCLUIR PRODUTO
==========================================================
*/

function excluirProduto(
id
){



const registro =

dbBuscarPorId(

CONFIG.ABAS.PRODUTOS,

id

);



if(!registro){

return resposta(

false,

"Produto não encontrado"

);

}



dbExcluir(

CONFIG.ABAS.PRODUTOS,

registro.linha

);



registrarLog(

"PRODUTO",

"EXCLUIDO",

id

);



return resposta(

true,

"Produto excluído"

);



}



/**
==========================================================
OBTER PREÇO POR TIPO VENDA
==========================================================
*/

function obterPrecoProduto(
idProduto,
tipoVenda
){



const p =

buscarProdutoId(
idProduto
);



if(!p){

return 0;

}



if(
tipoVenda ===
"REVENDA"
){


return p.precoRevenda;


}



return p.precoConsumidor;



}



/**
==========================================================
VERIFICAR ESTOQUE DISPONÍVEL
==========================================================
*/

function verificarEstoqueProduto(
idProduto,
quantidade
){



const p =

buscarProdutoId(
idProduto
);



if(!p){

return false;

}



if(
CONFIG.REGRAS.PERMITIR_ESTOQUE_NEGATIVO
){

return true;

}



return (

Number(p.estoque)

>=

Number(quantidade)

);



}
