/**
==========================================================
YES FREE ERP
clientes.js
Cadastro / Consulta / Edição / Exclusão de Clientes
Integração:
Frontend → Api.gs → Clientes.gs → Google Sheets
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


criarHTML(`

<div class="card">


<h2>
Cadastro de Clientes
</h2>



<div class="form-grid">



<div class="form-group">

<label>
Nome completo
</label>

<input 
id="cliente_nome"
type="text">

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


<input 
id="cliente_documento"
type="text">


</div>




<div class="form-group">

<label>
Telefone
</label>


<input 
id="cliente_telefone"
type="text">


</div>




<div class="form-group">

<label>
E-mail
</label>


<input 
id="cliente_email"
type="email">


</div>




<div class="form-group">

<label>
Endereço
</label>


<input 
id="cliente_endereco"
type="text">


</div>


</div>




<br>


<button

class="btn-primary"

onclick="salvarCliente()">

Salvar Cliente

</button>


<button

class="btn-success"

onclick="buscarClientes()">

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

function salvarCliente(){



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



executar(

"apiSalvarCliente",

dados,

function(res){



if(res.sucesso){



mensagem(

"Cliente salvo com sucesso",

"sucesso"

);



limparFormularioCliente();



buscarClientes();



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
LISTAR CLIENTES
==========================================================
*/

function buscarClientes(){



executar(

"apiListarClientes",

null,

function(res){



listaClientes = res || [];



renderizarClientes();



}

);



}



/**
==========================================================
MOSTRAR CLIENTES
==========================================================
*/

function renderizarClientes(){



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

${c.nome || c[1]}

</td>



<td>

${c.telefone || c[5]}

</td>



<td>

${c.tipo || c[3]}

</td>



<td>


<button

class="btn-primary"

onclick="editarCliente('${c.id || c[0]}')">

Editar

</button>



<button

class="btn-danger"

onclick="excluirCliente('${c.id || c[0]}')">

Excluir

</button>



<button

class="btn-success"

onclick="whatsappCliente('${c.id || c[0]}')">

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

function editarCliente(
id
){



executar(

"apiBuscarCliente",

id,

function(c){



clienteSelecionado = id;



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

);



}



/**
==========================================================
EXCLUIR CLIENTE
==========================================================
*/

function excluirCliente(
id
){



if(
!confirmar(
"Excluir cliente?"
)

){

return;

}



executar(

"apiExcluirCliente",

id,

function(res){


mensagem(

"Cliente excluído",

"sucesso"

);



buscarClientes();



}

);



}



/**
==========================================================
WHATSAPP CLIENTE
==========================================================
*/

function whatsappCliente(
id
){



executar(

"apiWhatsappCliente",

id,

function(res){



if(res.url){



window.open(

res.url,

"_blank"

);



}



}

);



}



/**
==========================================================
LIMPAR FORMULÁRIO
==========================================================
*/

function limparFormularioCliente(){



clienteSelecionado = null;



document.getElementById(

"cliente_nome"

).value="";


document.getElementById(

"cliente_documento"

).value="";


document.getElementById(

"cliente_telefone"

).value="";


document.getElementById(

"cliente_email"

).value="";


document.getElementById(

"cliente_endereco"

).value="";



}
