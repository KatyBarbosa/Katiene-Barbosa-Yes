/**
==========================================================
YES FREE ERP
Dashboard.gs
Indicadores e informações gerenciais
==========================================================
*/


/**
==========================================================
MONTAR DASHBOARD COMPLETO
==========================================================
*/

function montarDashboard(){


return {


vendasHoje:

vendasPeriodo(
new Date(),

new Date()

),



vendasMes:

vendasMesAtual(),



quantidadePedidos:

quantidadePedidos(),



clientes:

dbContar(

CONFIG.ABAS.CLIENTES

),



produtos:

dbContar(

CONFIG.ABAS.PRODUTOS

),



estoqueBaixo:

listarEstoqueBaixo()

.length,



contasAReceber:

totalContasReceber(),



financeiro:

resumoFinanceiro()



};


}



/**
==========================================================
VENDAS DO DIA
==========================================================
*/

function vendasHoje(){


const hoje =

new Date();



return vendasPeriodo(

hoje,

hoje

);


}



/**
==========================================================
VENDAS POR PERÍODO
==========================================================
*/

function vendasPeriodo(
inicio,
fim
){



const pedidos =

dbListar(

CONFIG.ABAS.PEDIDOS_CONSUMIDOR

);



let total = 0;



pedidos.forEach(function(p){



let data =

new Date(p[1]);



if(

data >= inicio

&&

data <= fim

){


total +=

Number(p[9] || 0);


}



});



return total;



}



/**
==========================================================
VENDAS DO MÊS
==========================================================
*/

function vendasMesAtual(){



const hoje =

new Date();



const inicio =

new Date(

hoje.getFullYear(),

hoje.getMonth(),

1

);



return vendasPeriodo(

inicio,

hoje

);



}



/**
==========================================================
QUANTIDADE PEDIDOS
==========================================================
*/

function quantidadePedidos(){



return dbContar(

CONFIG.ABAS.PEDIDOS_CONSUMIDOR

);



}



/**
==========================================================
RESUMO FINANCEIRO
==========================================================
*/

function resumoFinanceiro(){



const financeiro =

listarFinanceiroConsumidor();



let recebido = 0;


let aberto = 0;



financeiro.forEach(function(f){



if(

f[12]=="PAGO"

){


recebido +=

Number(f[11] || 0);


}

else{


aberto +=

Number(f[11] || 0);


}



});



return {


recebido:recebido,


aberto:aberto,


total:

recebido + aberto



};



}



/**
==========================================================
PRODUTOS MAIS VENDIDOS
==========================================================
*/

function produtosMaisVendidos(){



const itens =

dbListar(

CONFIG.ABAS.ITENS_PEDIDO_CONSUMIDOR

);



const resultado = {};



itens.forEach(function(i){



let produto = i[4];


let qtd =

Number(i[5] || 0);



if(
!resultado[produto]
){

resultado[produto]=0;


}



resultado[produto]+=qtd;



});



return resultado;



}



/**
==========================================================
CLIENTES NOVOS MÊS
==========================================================
*/

function clientesNovosMes(){



const clientes =

listarClientes();



const hoje =

new Date();



let total = 0;



clientes.forEach(function(c){



let data =

new Date(c[4]);



if(

data.getMonth()

===

hoje.getMonth()

&&

data.getFullYear()

===

hoje.getFullYear()

){



total++;



}



});



return total;



}
