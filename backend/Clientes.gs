/**
==========================================================
YES FREE ERP
Clientes.gs
Cadastro / Consulta / Edição / Exclusão / WhatsApp
Base: ClientesConsumidorF
==========================================================
*/


/**
==========================================================
LISTAR CLIENTES
==========================================================
*/

function listarClientes(){


return dbListar(
CONFIG.ABAS.CLIENTES
);


}



/**
==========================================================
BUSCAR CLIENTE POR ID
==========================================================
*/

function buscarCliente(
id
){



const registro =

dbBuscarPorId(

CONFIG.ABAS.CLIENTES,

id

);



if(!registro){

return null;

}



const c =
registro.dados;



return {


id:c[0],


nome:c[1],


tipoPessoa:c[2],


cpf:c[3],


dataCadastro:c[4],


telefone:c[5],


whatsapp:c[6],


email:c[7],


cep:c[8],


endereco:c[9],


numero:c[10],


bairro:c[11],


cidade:c[12],


estado:c[13],


observacoes:c[14],


status:c[15]


};


}



/**
==========================================================
BUSCA INTELIGENTE
ID + NOME + TELEFONE
==========================================================
*/

function buscarClienteVenda(
valor
){



valor =

limparTexto(
valor
)

.toLowerCase();



const clientes =

listarClientes();



for(
let i=0;
i<clientes.length;
i++
){



const c =
clientes[i];



if(

String(c[0])
.toLowerCase()
.includes(valor)

||


String(c[1])
.toLowerCase()
.includes(valor)

||


String(c[6])
.includes(valor)

){



return {


id:c[0],


nome:c[1],


cpf:c[3],


telefone:c[5],


whatsapp:c[6],


email:c[7],


cidade:c[12],


endereco:c[9]


};



}



}



return null;



}



/**
==========================================================
CADASTRAR CLIENTE COMPLETO
==========================================================
*/

function cadastrarClienteCompleto(
dados
){



const id =

gerarID(
"CLI"
);



const linha = [



id,


dados.nome || "",


dados.tipoPessoa || "FISICA",


limparDocumento(
dados.cpf
),


new Date(),


limparTelefone(
dados.telefone
),


limparTelefone(
dados.whatsapp
),


dados.email || "",


dados.cep || "",


dados.endereco || "",


dados.numero || "",


dados.bairro || "",


dados.cidade || "",


dados.estado || "",


dados.observacoes || "",


CONFIG.STATUS.ATIVO



];



dbInserir(

CONFIG.ABAS.CLIENTES,

linha

);



registrarLog(

"CLIENTE",

"CRIADO",

id

);



return resposta(

true,

"Cliente cadastrado",

{

id:id

}

);



}



/**
==========================================================
ATUALIZAR CLIENTE
==========================================================
*/

function atualizarCliente(
id,
dados
){



const registro =

dbBuscarPorId(

CONFIG.ABAS.CLIENTES,

id

);



if(!registro){


return resposta(

false,

"Cliente não encontrado"

);


}



let c =
registro.dados;



c[1] =
dados.nome || c[1];


c[2] =
dados.tipoPessoa || c[2];


c[3] =
dados.cpf || c[3];


c[5] =
dados.telefone || c[5];


c[6] =
dados.whatsapp || c[6];


c[7] =
dados.email || c[7];


c[8] =
dados.cep || c[8];


c[9] =
dados.endereco || c[9];


c[10] =
dados.numero || c[10];


c[11] =
dados.bairro || c[11];


c[12] =
dados.cidade || c[12];


c[13] =
dados.estado || c[13];


c[14] =
dados.observacoes || c[14];



dbAtualizarLinha(

CONFIG.ABAS.CLIENTES,

registro.linha,

c

);



registrarLog(

"CLIENTE",

"ATUALIZADO",

id

);



return resposta(

true,

"Cliente atualizado"

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



const registro =

dbBuscarPorId(

CONFIG.ABAS.CLIENTES,

id

);



if(!registro){

return resposta(

false,

"Cliente não encontrado"

);

}



dbExcluir(

CONFIG.ABAS.CLIENTES,

registro.linha

);



registrarLog(

"CLIENTE",

"EXCLUIDO",

id

);



return resposta(

true,

"Cliente excluído"

);



}



/**
==========================================================
GERAR MENSAGEM WHATSAPP CADASTRO
==========================================================
*/

function enviarWhatsappCadastro(
id
){



const c =

buscarCliente(
id
);



if(!c){

return null;

}



const mensagem =


"Cadastro YES FREE%0A%0A"

+

"Nome completo: "

+

c.nome

+

"%0A"

+

"Endereço: "

+

c.endereco

+

"%0A"

+

"Telefone: "

+

c.telefone

+

"%0A"

+

"E-mail: "

+

c.email

+

"%0A"

+

"CPF ou CNPJ: "

+

c.cpf;



return {


telefone:

"559198819899"



,



url:

"https://wa.me/"

+

"559198819899"

+

"?text="

+

mensagem



};



}
