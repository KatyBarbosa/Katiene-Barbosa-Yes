/**
==========================================================
YES FREE ERP
produtos.js
Cadastro / Consulta / Edição / Exclusão de Produtos
Integração:
Frontend → Api.gs → Produtos.gs → Google Sheets
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


criarHTML(`

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


<input 
id="produto_unidade"
value="UN">

</div>




<div class="form-group">

<label>
Preço Revenda
</label>


<input 
id="produto_preco_revenda"
type="number">

</div>




<div class="form-group">

<label>
Preço Consumidor
</label>


<input 
id="produto_preco_consumidor"
type="number">

</div>




<div class="form-group">

<label>
Estoque Inicial
</label>


<input 
id="produto_estoque"
type="number">

</div>




<div class="form-group">

<label>
Estoque Mínimo
</label>


<input 
id="produto_estoque_minimo"
type="number">

</div>



<div class="form-group">

<label>
Observações
</label>


<textarea id="produto_observacao"></textarea>


</div>



</div>




<br>



<button

class="btn-primary"

onclick="salvarProduto()">

Salvar Produto

</button>



<button

class="btn-success"

onclick="carregarProdutos()">

Consultar

</button>




<hr>



<div id="lista_produtos">

</div>




</div>


`);



carregarProdutos();



}



/**
==========================================================
SALVAR PRODUTO
==========================================================
*/

function salvarProduto(){



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



precoRevenda:

Number(

document.getElementById(

"produto_preco_revenda"

).value

||0),



precoConsumidor:

Number(

document.getElementById(

"produto_preco_consumidor"

).value

||0),



estoque:

Number(

document.getElementById(

"produto_estoque"

).value

||0),



estoqueMinimo:

Number(

document.getElementById(

"produto_estoque_minimo"

).value

||0),



observacoes:

document.getElementById(

"produto_observacao"

).value



};




executar(

"apiSalvarProduto",

dados,

function(res){



if(res.sucesso){


mensagem(

"Produto salvo",

"sucesso"

);



limparProduto();



carregarProdutos();



}

else{


mensagem(

res.mensagem,

"erro"

);



}



}

);



}



/**
==========================================================
LISTAR PRODUTOS
==========================================================
*/

function carregarProdutos(){



executar(

"apiListarProdutos",

null,

function(res){



listaProdutos = res || [];



mostrarProdutos();



}

);



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
Preço Consumidor
</th>


<th>
Preço Revenda
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

${p.nome || p[3]}

</td>



<td>

${moeda(p.precoConsumidor || p[7])}

</td>



<td>

${moeda(p.precoRevenda || p[6])}

</td>



<td>

${p.estoque || p[8]}

</td>



<td>




<button

class="btn-primary"

onclick="editarProduto('${p.id || p[1]}')">

Editar

</button>




<button

class="btn-danger"

onclick="excluirProduto('${p.id || p[1]}')">

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

function editarProduto(
id
){



executar(

"apiBuscarProduto",

id,

function(p){



produtoSelecionado = id;



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

"produto_preco_revenda"

).value = p.precoRevenda || 0;



document.getElementById(

"produto_preco_consumidor"

).value = p.precoConsumidor || 0;



document.getElementById(

"produto_estoque_minimo"

).value = p.estoqueMinimo || 0;



document.getElementById(

"produto_observacao"

).value = p.observacoes || "";



}

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



if(

!confirmar(

"Excluir produto?"

)

){

return;

}



executar(

"apiExcluirProduto",

id,

function(){



mensagem(

"Produto excluído",

"sucesso"

);



carregarProdutos();



}

);



}



/**
==========================================================
LIMPAR FORMULÁRIO
==========================================================
*/

function limparProduto(){



produtoSelecionado=null;



const campos=[



"produto_codigo",

"produto_nome",

"produto_categoria",

"produto_preco_revenda",

"produto_preco_consumidor",

"produto_estoque",

"produto_estoque_minimo",

"produto_observacao"



];



campos.forEach(function(id){



const campo =

document.getElementById(id);



if(campo){


campo.value="";


}



});



}
