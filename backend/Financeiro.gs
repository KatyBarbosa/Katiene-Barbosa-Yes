/**
==========================================================
YES FREE ERP
Financeiro.gs
Contas a Receber
Financeiro Consumidor + Revenda
Parcelas + Pagamentos
==========================================================
*/


/**
==========================================================
CRIAR FINANCEIRO CONSUMIDOR
==========================================================
*/

function criarFinanceiroConsumidor(
dados
){


const idFinanceiro =

gerarID(
"FIN"
);



const linha = [



idFinanceiro,


dados.idPedido || "",


new Date(),


dados.idCliente || "",


dados.cliente || "",


"",


Number(dados.valor || 0),


dados.formaPagamento || "",


1,


Number(dados.valor || 0),


new Date(),


0,


Number(dados.valor || 0),


"EM ABERTO",


"",


"",


new Date()



];



dbInserir(

CONFIG.ABAS.FINANCEIRO_CONSUMIDOR,

linha

);



criarParcela(

{

idFinanceiro:idFinanceiro,

cliente:dados.cliente,

valor:dados.valor

}

);



return idFinanceiro;



}



/**
==========================================================
CRIAR FINANCEIRO REVENDA
==========================================================
*/

function criarFinanceiroRevenda(
dados
){



const idFinanceiro =

gerarID(
"FINR"
);



const linha = [



idFinanceiro,


dados.idPedido || "",


dados.idRevendedor || "",


dados.revendedor || "",


dados.cpfCnpj || "",


new Date(),


Number(dados.valorPedido || 0),


Number(dados.desconto || 0),


Number(dados.valorFinal || 0),


Number(dados.entrada || 0),


Number(dados.saldo || 0),


dados.condicaoPagamento || "",


dados.vencimento || "",


"EM ABERTO",


"",


"",



];



dbInserir(

CONFIG.ABAS.FINANCEIRO_REVENDA,

linha

);



return idFinanceiro;



}



/**
==========================================================
CRIAR PARCELA
==========================================================
*/

function criarParcela(
dados
){



const idParcela =

gerarID(
"PAR"
);



const linha = [



idParcela,


dados.idFinanceiro,


dados.cliente || "",


dados.tipoVenda || "VENDA",


1,


Number(dados.valor || 0),


dados.vencimento || new Date(),


"",


"EM ABERTO"



];



dbInserir(

CONFIG.ABAS.PARCELAS,

linha

);



return idParcela;



}



/**
==========================================================
LISTAR CONTAS A RECEBER
==========================================================
*/

function listarContasReceber(){


return dbListar(

CONFIG.ABAS.CONTAS_RECEBER

);


}



/**
==========================================================
REGISTRAR PAGAMENTO
==========================================================
*/

function registrarPagamento(
idFinanceiro,
valorPago
){



const registro =

dbBuscarPorId(

CONFIG.ABAS.FINANCEIRO_CONSUMIDOR,

idFinanceiro

);



if(!registro){

return resposta(

false,

"Financeiro não encontrado"

);

}



let f =

registro.dados;



let valorAtual =

Number(f[11] || 0);



let novoSaldo =

Number(f[6])

-

(

valorAtual

+

Number(valorPago)

);



f[11] =

valorAtual

+

Number(valorPago);



f[12] =


novoSaldo <= 0

?

"PAGO"

:

"EM ABERTO";



f[13] =

new Date();



dbAtualizarLinha(

CONFIG.ABAS.FINANCEIRO_CONSUMIDOR,

registro.linha,

f

);



registrarLog(

"FINANCEIRO",

"PAGAMENTO",

idFinanceiro

);



return resposta(

true,

"Pagamento registrado"

);



}



/**
==========================================================
LISTAR FINANCEIRO
==========================================================
*/

function listarFinanceiroConsumidor(){


return dbListar(

CONFIG.ABAS.FINANCEIRO_CONSUMIDOR

);


}



/**
==========================================================
TOTAL RECEBER
==========================================================
*/

function totalContasReceber(){



const dados =

listarFinanceiroConsumidor();



let total = 0;



dados.forEach(function(f){



if(
f[12] !== "PAGO"
){


total += Number(f[11] || 0);


}



});



return total;



}



/**
==========================================================
RELATÓRIO FINANCEIRO
==========================================================
*/

function relatorioFinanceiro(){


return {


totalReceber:

totalContasReceber(),


quantidade:

listarFinanceiroConsumidor()

.length



};



}
