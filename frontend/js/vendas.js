/**
==========================================================
KATIENE BARBOSA YES ERP
vendas.js

Pedidos:
- Consumidor
- Revenda
- Produtos
- Quantidade
- Desconto
- Cupom
- Frete
- Comissão
- Total Final
- PDF
- WhatsApp

Frontend
↓
chamarAPI()
↓
Api.gs
↓
Pedidos.gs
↓
Google Sheets
==========================================================
*/


let carrinho = [];

let pedidoAtual = null;



/**
==========================================================
TELA VENDAS
==========================================================
*/


function telaVendas(){


renderizar(`


<div class="card">


<h2>

Novo Pedido

</h2>



<div class="form-grid">



<div class="form-group">

<label>

Tipo Cliente

</label>


<select id="pedido_tipo">


<option value="CONSUMIDOR">

Consumidor

</option>


<option value="REVENDA">

Revenda

</option>


</select>


</div>




<div class="form-group">

<label>

Cliente

</label>


<input id="pedido_cliente">


</div>




<div class="form-group">

<label>

Produto

</label>


<input id="pedido_produto">


</div>



<div class="form-group">

<label>

Quantidade

</label>


<input

id="pedido_quantidade"

type="number"

value="1"

>


</div>



<div class="form-group">

<label>

Valor Unitário

</label>


<input

id="pedido_valor"

type="number"

step="0.01"

>


</div>



<div class="form-group">

<label>

Desconto

</label>


<input

id="pedido_desconto"

type="number"

value="0"

step="0.01"

>


</div>



<div class="form-group">

<label>

Cupom Desconto

</label>


<input id="pedido_cupom">


</div>



<div class="form-group">

<label>

Frete

</label>


<input

id="pedido_frete"

type="number"

value="0"

step="0.01"

>


</div>



<div class="form-group">

<label>

Comissão

</label>


<input

id="pedido_comissao"

type="number"

value="0"

step="0.01"

>


</div>



</div>




<br>


<button

class="btn-primary"

onclick="adicionarItem()"

>

Adicionar Produto

</button>



<button

class="btn-success"

onclick="finalizarPedido()"

>

Finalizar Pedido

</button>




<hr>


<div id="carrinho">

</div>


<div id="totais_pedido">

</div>



</div>


`);



atualizarCarrinho();



}



/**
==========================================================
ADICIONAR ITEM
==========================================================
*/


function adicionarItem(){



const produto =

document.getElementById(

"pedido_produto"

).value;



const quantidade =

Number(

document.getElementById(

"pedido_quantidade"

).value || 0

);



const valor =

Number(

document.getElementById(

"pedido_valor"

).value || 0

);



if(!produto || quantidade<=0){


mensagem(

"Informe produto e quantidade",

"erro"

);


return;

}



carrinho.push({



produto:produto,


quantidade:quantidade,


valorUnitario:valor,


subtotal:

quantidade * valor



});



atualizarCarrinho();



}



/**
==========================================================
CARRINHO
==========================================================
*/


function atualizarCarrinho(){



let html = `



<table>


<thead>


<tr>


<th>

Produto

</th>


<th>

Qtd

</th>


<th>

Valor

</th>


<th>

Ação

</th>


</tr>


</thead>


<tbody>



`;



let totalProdutos=0;



carrinho.forEach(function(item,index){



totalProdutos += item.subtotal;



html += `



<tr>


<td>

${item.produto}

</td>



<td>

${item.quantidade}

</td>



<td>

${moeda(item.subtotal)}

</td>



<td>


<button

class="btn-danger"

onclick="removerItem(${index})"

>

X

</button>


</td>


</tr>



`;



});



html += `


</tbody>

</table>


`;



document.getElementById(

"carrinho"

).innerHTML = html;



calcularTotalPedido();



}



/**
==========================================================
REMOVER ITEM
==========================================================
*/


function removerItem(
index
){



carrinho.splice(

index,

1

);



atualizarCarrinho();



}



/**
==========================================================
CALCULO FINAL
==========================================================
*/


function calcularTotalPedido(){



let produtos = 0;



carrinho.forEach(function(i){


produtos += i.subtotal;


});



const desconto =

Number(

document.getElementById(

"pedido_desconto"

)?.value || 0

);



const frete =

Number(

document.getElementById(

"pedido_frete"

)?.value || 0

);



const total =

produtos

-

desconto

+

frete;



document.getElementById(

"totais_pedido"

).innerHTML =



`

<h3>

Produtos:

${moeda(produtos)}

</h3>


<h3>

Total Final:

${moeda(total)}

</h3>

`;



return total;



}



/**
==========================================================
FINALIZAR PEDIDO
==========================================================
*/


async function finalizarPedido(){



if(

carrinho.length===0

){



mensagem(

"Adicione produtos",

"erro"

);



return;

}



const dados = {



tipo:

document.getElementById(

"pedido_tipo"

).value,



cliente:

document.getElementById(

"pedido_cliente"

).value,



itens:

carrinho,



desconto:

Number(

document.getElementById(

"pedido_desconto"

).value ||0

),



cupom:

document.getElementById(

"pedido_cupom"

).value,



frete:

Number(

document.getElementById(

"pedido_frete"

).value ||0

),



comissao:

Number(

document.getElementById(

"pedido_comissao"

).value ||0

),



total:

calcularTotalPedido()



};



const resposta =

await executarAPI(

"salvarPedido",

dados

);



if(resposta.sucesso){



mensagem(

"Pedido salvo com sucesso"

);



carrinho=[];



atualizarCarrinho();



}

else{


mensagem(

resposta.mensagem,

"erro"

);



}



}



/**
==========================================================
GERAR PDF
==========================================================
*/


async function gerarPDFPedido(
id
){



const resposta =

await executarAPI(

"gerarPDF",

{

id:id

}

);



if(resposta.url){



window.open(

resposta.url,

"_blank"

);



}



}



/**
==========================================================
WHATSAPP PEDIDO
==========================================================
*/


async function whatsappPedido(
id
){



const resposta =

await executarAPI(

"whatsappPedido",

{

id:id

}

);



if(resposta.url){



window.open(

resposta.url,

"_blank"

);



}



}
