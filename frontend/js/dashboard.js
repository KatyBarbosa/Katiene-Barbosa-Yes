/**
==========================================================
KATIENE BARBOSA YES ERP
dashboard.js

Dashboard Gerencial

Indicadores:
- Vendas do dia
- Vendas do mês
- Pedidos
- Clientes
- Produtos
- Estoque baixo
- Contas a receber

Frontend
↓
chamarAPI()
↓
Api.gs
↓
Dashboard.gs
↓
Google Sheets
==========================================================
*/



let dadosDashboard = {};



/**
==========================================================
TELA DASHBOARD
==========================================================
*/


function telaDashboard(){



renderizar(`


<div class="card">


<h2>

Dashboard

</h2>



<div class="dashboard-grid">



<div class="indicador">


<h3>

Vendas Hoje

</h3>


<span id="dash_vendas_hoje">

R$ 0,00

</span>


</div>




<div class="indicador">


<h3>

Vendas Mês

</h3>


<span id="dash_vendas_mes">

R$ 0,00

</span>


</div>




<div class="indicador">


<h3>

Pedidos

</h3>


<span id="dash_pedidos">

0

</span>


</div>




<div class="indicador">


<h3>

Clientes

</h3>


<span id="dash_clientes">

0

</span>


</div>




<div class="indicador">


<h3>

Produtos

</h3>


<span id="dash_produtos">

0

</span>


</div>




<div class="indicador">


<h3>

Estoque Baixo

</h3>


<span id="dash_estoque">

0

</span>


</div>




<div class="indicador">


<h3>

Receber

</h3>


<span id="dash_receber">

R$ 0,00

</span>


</div>



</div>



</div>


`);



carregarDashboard();



}



/**
==========================================================
CARREGAR DADOS
==========================================================
*/


async function carregarDashboard(){



const resposta =

await executarAPI(

"dashboard"

);



if(

!resposta

){


return;

}



dadosDashboard =

resposta.dados || {};



atualizarDashboard();



}



/**
==========================================================
ATUALIZAR INDICADORES
==========================================================
*/


function atualizarDashboard(){



const d =

dadosDashboard;



const vendasHoje =

document.getElementById(

"dash_vendas_hoje"

);



if(vendasHoje){



vendasHoje.innerHTML =

moeda(

d.vendasHoje || 0

);



}



const vendasMes =

document.getElementById(

"dash_vendas_mes"

);



if(vendasMes){



vendasMes.innerHTML =

moeda(

d.vendasMes || 0

);



}



const pedidos =

document.getElementById(

"dash_pedidos"

);



if(pedidos){



pedidos.innerHTML =

d.quantidadePedidos || 0;



}



const clientes =

document.getElementById(

"dash_clientes"

);



if(clientes){



clientes.innerHTML =

d.clientes || 0;



}



const produtos =

document.getElementById(

"dash_produtos"

);



if(produtos){



produtos.innerHTML =

d.produtos || 0;



}



const estoque =

document.getElementById(

"dash_estoque"

);



if(estoque){



estoque.innerHTML =

d.estoqueBaixo || 0;



}



const receber =

document.getElementById(

"dash_receber"

);



if(receber){



receber.innerHTML =

moeda(

d.contasAReceber || 0

);



}



}



/**
==========================================================
ATUALIZAR AUTOMATICAMENTE
==========================================================
*/


function iniciarAtualizacaoDashboard(){



setInterval(

function(){


if(

telaAtual==="dashboard"

){


carregarDashboard();



}



},

60000



);



}
