/**
==========================================================
KATIENE BARBOSA YES ERP
Clientes.gs

Módulo:
- Cadastro de clientes
- Consulta
- Edição
- Exclusão
- Busca

Integração:

Api.gs
   ↓
Clientes.gs
   ↓
Database.gs
   ↓
Google Sheets

==========================================================
*/



/**
==========================================================
LISTAR CLIENTES
==========================================================
*/


function listarClientes(){



return bancoListar(

DATABASE.ABAS.CLIENTES

);



}



/**
==========================================================
SALVAR CLIENTE
==========================================================
*/


function salvarCliente(
dados
){



const agora =

new Date();



if(

!dados.nome

){



return {


sucesso:false,


mensagem:

"Nome do cliente obrigatório"



};



}




/**
===========================
NOVO CLIENTE
===========================
*/


if(

!dados.id

){



dados.ID =

gerarID();



dados.Data_Cadastro =

agora;



dados.Status =

"ATIVO";



return bancoInserir(

DATABASE.ABAS.CLIENTES,

mapearCliente(

dados

)

);



}



/**
===========================
ATUALIZA CLIENTE
===========================
*/


return bancoAtualizar(

DATABASE.ABAS.CLIENTES,

dados.id,

mapearCliente(

dados

)

);



}





/**
==========================================================
BUSCAR CLIENTE
==========================================================
*/


function buscarCliente(
id
){



const clientes =

listarClientes();



const cliente =

clientes.find(function(c){



return String(c.ID)

===

String(id);



});



return cliente || null;



}





/**
==========================================================
EXCLUIR CLIENTE
==========================================================
*/


function excluirCliente(
id
){



return bancoExcluir(

DATABASE.ABAS.CLIENTES,

id

);



}





/**
==========================================================
MAPEAMENTO CAMPOS
==========================================================
*/


function mapearCliente(
dados
){



return {


ID:

dados.ID || dados.id || gerarID(),



Nome:

dados.nome || "",



Tipo:

dados.tipo || "CONSUMIDOR",



CPF_CNPJ:

dados.cpfCnpj || "",



Telefone:

dados.telefone || "",



Email:

dados.email || "",



Endereco:

dados.endereco || "",



Data_Cadastro:

dados.Data_Cadastro || new Date(),



Status:

dados.Status || "ATIVO"



};



}





/**
==========================================================
BUSCAR POR TELEFONE
==========================================================
*/


function buscarClienteTelefone(
telefone
){



const clientes =

listarClientes();



return clientes.filter(function(c){



return String(c.Telefone)

.includes(

String(telefone)

);



});



}





/**
==========================================================
GERAR LINK WHATSAPP
==========================================================
*/


function gerarWhatsAppCliente(
id
){



const cliente =

buscarCliente(

id

);



if(

!cliente

){



return {


sucesso:false,


mensagem:

"Cliente não encontrado"



};



}



const numero =

String(

cliente.Telefone

)

.replace(

/\D/g,

""

);



const texto =

encodeURIComponent(

"Olá "

+

cliente.Nome

+

", tudo bem? Aqui é da Katiene Barbosa Yes."

);



return {


sucesso:true,


url:

"https://wa.me/55"

+

numero

+

"?text="

+

texto



};



}
