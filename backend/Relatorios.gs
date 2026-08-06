/**
==========================================================
YES FREE ERP
Relatorios.gs
Relatórios de vendas, estoque e financeiro
==========================================================
*/


/**
==========================================================
RELATÓRIO DE VENDAS
==========================================================
*/

function relatorioVendas(
inicio,
fim
){



const pedidos =

dbListar(

CONFIG.ABAS.PEDIDOS_CONSUMIDOR

);



let resultado = [];



let total = 0;



pedidos.forEach(function(p){



let data =

new Date(p[1]);



if(

(!inicio || data >= new Date(inicio))

&&

(!fim || data <= new Date(fim))

){



resultado.push({



id:p[0],


data:

formatarDataSimples(
p[1]
),


cliente:p[3],


tipo:p[5],


valor:

Number(p[9] || 0),


status:p[11]



});



total +=

Number(p[9] || 0);



}



});



return {


quantidade:

resultado.length,


total:

total,


pedidos:

resultado



};



}



/**
==========================================================
RELATÓRIO FINANCEIRO
==========================================================
*/

function relatorioFinanceiroCompleto(){



const dados =

dbListar(

CONFIG.ABAS.FINANCEIRO_CONSUMIDOR

);



let aberto = 0;


let pago = 0;


let total = 0;



dados.forEach(function(f){



let valor =

Number(f[11] || 0);



total += valor;



if(

f[12]=="PAGO"

){


pago += valor;


}

else{


aberto += valor;


}



});



return {


total:total,


pago:pago,


aberto:aberto,


quantidade:

dados.length



};



}



/**
==========================================================
RELATÓRIO ESTOQUE
==========================================================
*/

function relatorioEstoque(){



const estoque =

listarEstoque();



return estoque.map(function(e){



return {


id:e[1],


produto:e[3],


categoria:e[4],


estoqueAtual:

Number(e[10] || 0),


estoqueMinimo:

Number(e[11] || 0),


situacao:

Number(e[10])

<=

Number(e[11])

?

"BAIXO"

:

"OK"



};



});



}



/**
==========================================================
RELATÓRIO CLIENTES
==========================================================
*/

function relatorioClientes(){



const clientes =

listarClientes();



return {


total:

clientes.length,


ativos:

clientes.filter(function(c){


return c[15]=="ATIVO";


}).length,


clientes:

clientes.map(function(c){


return {


id:c[0],


nome:c[1],


telefone:c[5],


cidade:c[12],


status:c[15]


};


})



};



}



/**
==========================================================
EXPORTAR DADOS DASHBOARD
==========================================================
*/

function relatorioGeral(){



return {


vendas:

relatorioVendas(),


financeiro:

relatorioFinanceiroCompleto(),


estoque:

relatorioEstoque(),


clientes:

relatorioClientes()



};



}
