/**
==========================================================
KATIENE BARBOSA YES ERP
clientes.js
Cadastro / Consulta / Edição / Exclusão de Clientes

Frontend
↓
chamarAPI()
↓
Api.gs
↓
Clientes.gs
↓
Google Sheets
==========================================================
*/


let listaClientes = [];

let clienteSelecionado = null;



/**
==========================================================
TELA CLIENTES
==========================================================
*/


function telaClientes(){



renderizar(`


<div class="card">


<h2>

Cadastro de Clientes

</h2>



<div class="form-grid">



<div class="form-group">

<label>

Nome completo

</label>


<input id="cliente_nome">


</div>




<div class="form-group">

<label>

Tipo Cliente

</label>


<select id="cliente_tipo">


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

CPF ou CNPJ

</label>


<input id="cliente_documento">


</div>




<div class="form-group">


<label>

Telefone

</label>


<input id="cliente_telefone">


</div>




<div class="form-group">


<label>

E-mail

</label>


<input id="cliente_email">


</div>




<div class="form-group">


<label>

Endereço

</label>


<input id="cliente_endereco">


</div>


</div>




<br>


<button

class="btn-primary"

onclick="salvarCliente()"

>

Salvar Cliente

</button>



<button

class="btn-success"

onclick="buscarClientes()"

>

Consultar

</button>




<hr>



<div id="lista_clientes">

</div>



</div>


`);



buscarClientes();



}



/**
==========================================================
SALVAR CLIENTE
==========================================================
*/


async function salvarCliente(){



const dados = {


id:

clienteSelecionado,


nome:

document.getElementById(

"cliente_nome"

).value,



tipo:

document.getElementById(

"cliente_tipo"

).value,



cpfCnpj:

document.getElementById(

"cliente_documento"

).value,



telefone:

document.getElementById(

"cliente_telefone"

).value,



email:

document.getElementById(

"cliente_email"

).value,



endereco:

document.getElementById(

"cliente_endereco"

).value



};



const resposta =

await executarAPI(

"salvarCliente",

dados

);



if(resposta.sucesso){



mensagem(

"Cliente salvo com sucesso"

);



limparCliente();



buscarClientes();



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
LISTAR CLIENTES
==========================================================
*/


async function buscarClientes(){



const resposta =

await executarAPI(

"listarClientes"

);



listaClientes =

resposta.dados || [];



mostrarClientes();



}



/**
==========================================================
MOSTRAR CLIENTES
==========================================================
*/


function mostrarClientes(){



let html = `


<table>


<thead>

<tr>

<th>

Nome

</th>


<th>

Telefone

</th>


<th>

Tipo

</th>


<th>

Ações

</th>


</tr>

</thead>


<tbody>

`;



listaClientes.forEach(function(c){



html += `


<tr>


<td>

${c.nome || ""}

</td>



<td>

${c.telefone || ""}

</td>



<td>

${c.tipo || ""}

</td>



<td>



<button

class="btn-primary"

onclick="editarCliente('${c.id}')"

>

Editar

</button>



<button

class="btn-danger"

onclick="excluirCliente('${c.id}')"

>

Excluir

</button>



<button

class="btn-success"

onclick="whatsappCliente('${c.id}')"

>

WhatsApp

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

"lista_clientes"

)

.innerHTML = html;



}



/**
==========================================================
EDITAR CLIENTE
==========================================================
*/


async function editarCliente(
id
){



const resposta =

await executarAPI(

"buscarCliente",

{

id:id

}

);



const c =

resposta.dados;



if(!c){

return;

}



clienteSelecionado=id;



document.getElementById(

"cliente_nome"

).value = c.nome || "";



document.getElementById(

"cliente_tipo"

).value = c.tipo || "CONSUMIDOR";



document.getElementById(

"cliente_documento"

).value = c.cpfCnpj || "";



document.getElementById(

"cliente_telefone"

).value = c.telefone || "";



document.getElementById(

"cliente_email"

).value = c.email || "";



document.getElementById(

"cliente_endereco"

).value = c.endereco || "";



}



/**
==========================================================
EXCLUIR CLIENTE
==========================================================
*/


async function excluirCliente(
id
){



if(

!confirmar(

"Excluir cliente?"

)

){

return;

}



const resposta =

await executarAPI(

"excluirCliente",

{

id:id

}

);



if(resposta.sucesso){



mensagem(

"Cliente excluído"

);



buscarClientes();



}



}



/**
==========================================================
WHATSAPP CLIENTE
==========================================================
*/


async function whatsappCliente(
id
){



const resposta =

await executarAPI(

"whatsappCliente",

{

id:id

}

);



if(

resposta.url

){



window.open(

resposta.url,

"_blank"

);



}



}



/**
==========================================================
LIMPAR FORMULÁRIO
==========================================================
*/


function limparCliente(){



clienteSelecionado=null;



[
"cliente_nome",
"cliente_documento",
"cliente_telefone",
"cliente_email",
"cliente_endereco"

]

.forEach(function(id){



const campo =

document.getElementById(id);



if(campo){

campo.value="";

}



});



}
