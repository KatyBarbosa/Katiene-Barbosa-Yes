/**
==========================================================
KATIENE BARBOSA YES ERP
produtos.js
Cadastro / Consulta / Edição / Exclusão de Produtos

Frontend
↓
chamarAPI()
↓
Api.gs
↓
Produtos.gs
↓
Google Sheets
==========================================================
*/


let listaProdutos = [];

let produtoSelecionado = null;



/**
==========================================================
TELA PRODUTOS
==========================================================
*/


function telaProdutos(){



renderizar(`


<div class="card">


<h2>

Cadastro de Produtos

</h2>



<div class="form-grid">



<div class="form-group">

<label>

Código

</label>


<input id="produto_codigo">


</div>



<div class="form-group">

<label>

Nome Produto

</label>


<input id="produto_nome">


</div>



<div class="form-group">

<label>

Categoria

</label>


<input id="produto_categoria">


</div>



<div class="form-group">

<label>

Unidade

</label>


<input id="produto_unidade" value="UN">


</div>



<div class="form-group">

<label>

Preço Consumidor

</label>


<input

id="produto_preco_consumidor"

type="number"

step="0.01"

>


</div>



<div class="form-group">

<label>

Preço Revenda

</label>


<input

id="produto_preco_revenda"

type="number"

step="0.01"

>


</div>



<div class="form-group">

<label>

Estoque Inicial

</label>


<input

id="produto_estoque"

type="number"

>


</div>



<div class="form-group">

<label>

Estoque Mínimo

</label>


<input

id="produto_estoque_minimo"

type="number"

>


</div>



</div>




<br>


<button

class="btn-primary"

onclick="salvarProduto()"

>

Salvar Produto

</button>



<button

class="btn-success"

onclick="buscarProdutos()"

>

Consultar

</button>



<hr>


<div id="lista_produtos">

</div>



</div>



`);



buscarProdutos();



}



/**
==========================================================
SALVAR PRODUTO
==========================================================
*/


async function salvarProduto(){



const dados = {


id:

produtoSelecionado,


codigo:

document.getElementById(

"produto_codigo"

).value,



nome:

document.getElementById(

"produto_nome"

).value,



categoria:

document.getElementById(

"produto_categoria"

).value,



unidade:

document.getElementById(

"produto_unidade"

).value,



precoConsumidor:

Number(

document.getElementById(

"produto_preco_consumidor"

).value || 0

),



precoRevenda:

Number(

document.getElementById(

"produto_preco_revenda"

).value || 0

),



estoque:

Number(

document.getElementById(

"produto_estoque"

).value || 0

),



estoqueMinimo:

Number(

document.getElementById(

"produto_estoque_minimo"

).value || 0

)



};




const resposta =

await executarAPI(

"salvarProduto",

dados

);



if(resposta.sucesso){



mensagem(

"Produto salvo com sucesso"

);



limparProduto();



buscarProdutos();



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
LISTAR PRODUTOS
==========================================================
*/


async function buscarProdutos(){



const resposta =

await executarAPI(

"listarProdutos"

);



listaProdutos =

resposta.dados || [];



mostrarProdutos();



}



/**
==========================================================
MOSTRAR PRODUTOS
==========================================================
*/


function mostrarProdutos(){



let html = `


<table>


<thead>


<tr>


<th>

Produto

</th>


<th>

Consumidor

</th>


<th>

Revenda

</th>


<th>

Estoque

</th>


<th>

Ações

</th>


</tr>


</thead>



<tbody>



`;



listaProdutos.forEach(function(p){



html += `


<tr>


<td>

${p.nome || ""}

</td>



<td>

${moeda(p.precoConsumidor)}

</td>



<td>

${moeda(p.precoRevenda)}

</td>



<td>

${p.estoque || 0}

</td>



<td>



<button

class="btn-primary"

onclick="editarProduto('${p.id}')"

>

Editar

</button>



<button

class="btn-danger"

onclick="excluirProduto('${p.id}')"

>

Excluir

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

"lista_produtos"

)

.innerHTML = html;



}



/**
==========================================================
EDITAR PRODUTO
==========================================================
*/


async function editarProduto(
id
){



const resposta =

await executarAPI(

"buscarProduto",

{

id:id

}

);



const p =

resposta.dados;



if(!p){

return;

}



produtoSelecionado=id;



document.getElementById(

"produto_codigo"

).value = p.codigo || "";



document.getElementById(

"produto_nome"

).value = p.nome || "";



document.getElementById(

"produto_categoria"

).value = p.categoria || "";



document.getElementById(

"produto_unidade"

).value = p.unidade || "UN";



document.getElementById(

"produto_preco_consumidor"

).value = p.precoConsumidor || 0;



document.getElementById(

"produto_preco_revenda"

).value = p.precoRevenda || 0;



document.getElementById(

"produto_estoque_minimo"

).value = p.estoqueMinimo || 0;



}



/**
==========================================================
EXCLUIR PRODUTO
==========================================================
*/


async function excluirProduto(
id
){



if(

!confirmar(

"Excluir produto?"

)

){

return;

}



const resposta =

await executarAPI(

"excluirProduto",

{

id:id

}

);



if(resposta.sucesso){



mensagem(

"Produto excluído"

);



buscarProdutos();



}



}



/**
==========================================================
LIMPAR PRODUTO
==========================================================
*/


function limparProduto(){



produtoSelecionado=null;



[
"produto_codigo",
"produto_nome",
"produto_categoria",
"produto_preco_consumidor",
"produto_preco_revenda",
"produto_estoque",
"produto_estoque_minimo"

]

.forEach(function(id){



const campo =

document.getElementById(id);



if(campo){


campo.value="";


}



});



}
