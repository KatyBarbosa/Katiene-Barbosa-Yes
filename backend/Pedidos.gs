/**
==========================================================
YES FREE ERP
Pedidos.gs
Venda Consumidor + Venda Revenda
Itens + Cálculos + Integração Estoque/Financeiro
==========================================================
*/


/**
==========================================================
LISTAR PEDIDOS
==========================================================
*/

function listarPedidos(){


return dbListar(

CONFIG.ABAS.PEDIDOS_CONSUMIDOR

);


}



/**
==========================================================
SALVAR PEDIDO COMPLETO
==========================================================
*/

function salvarPedidoCompleto(
dados
){



return dbTransacao(

function(){



const idPedido =

gerarID(
"PED"
);



const data =
new Date();



let totalProdutos = 0;



dados.itens.forEach(function(i){


totalProdutos +=

Number(i.total || 0);



});




let valorTotal =


totalProdutos

-

Number(dados.desconto || 0)

-

Number(dados.cupom || 0)

+

Number(dados.frete || 0);



/**
 Cabeçalho Pedido
*/

const pedido = [



idPedido,


data,


dados.idCliente || "",


dados.cliente || "",


dados.cpfCnpj || "",


dados.tipoVenda || "VENDA",


totalProdutos,


Number(dados.desconto || 0),


Number(dados.frete || 0),


valorTotal,


dados.formaPagamento || "",


"PENDENTE",


"PENDENTE",


dados.observacoes || "",


usuarioAtual(),


data,


data



];



dbInserir(

CONFIG.ABAS.PEDIDOS_CONSUMIDOR,

pedido

);



/**
 Itens do pedido
*/

let itens = [];



dados.itens.forEach(function(i){



const idItem =

gerarID(
"ITEM"
);



itens.push([



idItem,


idPedido,


i.id || "",


i.codigo || "",


i.produto,


Number(i.quantidade),


Number(i.preco),


Number(i.desconto || 0),


Number(i.total)



]);



/**
 baixa estoque consumidor
*/

if(

CONFIG.REGRAS.BAIXAR_ESTOQUE_CONSUMIDOR

){


baixarEstoque(

i.id,

i.quantidade,

idPedido

);



}



});



dbInserirLote(

CONFIG.ABAS.ITENS_PEDIDO_CONSUMIDOR,

itens

);



/**
 Financeiro automático
*/

if(

CONFIG.REGRAS.GERAR_FINANCEIRO_AUTOMATICO

){


criarFinanceiroConsumidor(

{

idPedido:idPedido,

cliente:dados.cliente,

idCliente:dados.idCliente,

valor:valorTotal,

formaPagamento:dados.formaPagamento

}

);


}



/**
 Log
*/

registrarLog(

"PEDIDO",

"CRIADO",

idPedido

);



return resposta(

true,

"Pedido criado",

{

id:idPedido,

valorTotal:valorTotal

}

);



}

);



}



/**
==========================================================
BUSCAR PEDIDO
==========================================================
*/

function buscarPedido(
id
){



const pedido =

dbBuscarPorId(

CONFIG.ABAS.PEDIDOS_CONSUMIDOR,

id

);



if(!pedido){

return null;

}



return pedido.dados;



}



/**
==========================================================
LISTAR ITENS PEDIDO
==========================================================
*/

function listarItensPedido(
idPedido
){



const itens =

dbListar(

CONFIG.ABAS.ITENS_PEDIDO_CONSUMIDOR

);



return itens.filter(function(i){



return i[1] == idPedido;



});



}



/**
==========================================================
EXCLUIR PEDIDO
==========================================================
*/

function excluirPedido(
idPedido
){



const registro =

dbBuscarPorId(

CONFIG.ABAS.PEDIDOS_CONSUMIDOR,

idPedido

);



if(!registro){

return resposta(

false,

"Pedido não encontrado"

);

}



dbExcluir(

CONFIG.ABAS.PEDIDOS_CONSUMIDOR,

registro.linha

);



registrarLog(

"PEDIDO",

"EXCLUIDO",

idPedido

);



return resposta(

true,

"Pedido excluído"

);



}



/**
==========================================================
CALCULAR PEDIDO
==========================================================
*/

function calcularPedido(
itens,
desconto,
frete,
cupom
){



let total = 0;



itens.forEach(function(i){


total += Number(i.total || 0);


});



return (

total

-

Number(desconto || 0)

-

Number(cupom || 0)

+

Number(frete || 0)

);



}
