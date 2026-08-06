/**
==========================================================
YES FREE ERP
WhatsApp.gs
Geração de mensagens WhatsApp
==========================================================

Número padrão:
91 98819-8999

Funções:
- Cadastro cliente
- Pedido
- Cobrança
- Link WhatsApp
==========================================================
*/


const WHATSAPP_CONFIG = {


NUMERO:

"5591988198999",


CABECALHO:

"Cadastro YES FREE"



};




/**
==========================================================
CRIAR LINK WHATSAPP
==========================================================
*/

function criarLinkWhatsApp(
mensagem,
telefone
){



telefone =

telefone ||

WHATSAPP_CONFIG.NUMERO;



mensagem =

encodeURIComponent(
mensagem
);



return (

"https://wa.me/"

+

telefone

+

"?text="

+

mensagem

);



}



/**
==========================================================
MENSAGEM CADASTRO CLIENTE
==========================================================
*/

function mensagemCadastroCliente(
idCliente
){



const cliente =

buscarCliente(
idCliente
);



if(!cliente){

return null;

}



let mensagem =



WHATSAPP_CONFIG.CABECALHO

+

"\n\n"



+

"Nome completo: "

+

cliente.nome

+

"\n"



+

"Endereço: "

+

cliente.endereco

+

"\n"



+

"Telefone: "

+

cliente.telefone

+

"\n"



+

"E-mail: "

+

cliente.email

+

"\n"



+

"CPF ou CNPJ: "

+

cliente.cpf;



return criarLinkWhatsApp(

mensagem

);



}



/**
==========================================================
ENVIAR CADASTRO WHATSAPP
==========================================================
*/

function enviarWhatsappCadastro(
idCliente
){



return {


url:

mensagemCadastroCliente(
idCliente
)


};



}



/**
==========================================================
MENSAGEM PEDIDO
==========================================================
*/

function mensagemPedido(
idPedido
){



const pedido =

buscarPedido(
idPedido
);



if(!pedido){

return null;

}



let mensagem =



"YES FREE - Pedido"

+

"\n\n"



+

"Pedido: "

+

idPedido

+

"\n"



+

"Cliente: "

+

pedido[3]

+

"\n"



+

"Valor Total: R$ "

+

pedido[9]

+

"\n"



+

"Status: "

+

pedido[11];



return criarLinkWhatsApp(

mensagem

);



}



/**
==========================================================
ENVIAR PEDIDO WHATSAPP
==========================================================
*/

function enviarWhatsappPedido(
idPedido
){



return {


url:

mensagemPedido(
idPedido
)


};



}



/**
==========================================================
COBRANÇA FINANCEIRA
==========================================================
*/

function mensagemCobranca(
dados
){



let mensagem =



"YES FREE"

+

"\n\n"



+

"Olá "

+

dados.cliente

+

", tudo bem?"

+

"\n\n"



+

"Identificamos um pagamento pendente."

+

"\n"



+

"Valor: R$ "

+

dados.valor

+

"\n"



+

"Vencimento: "

+

dados.vencimento;



return criarLinkWhatsApp(

mensagem,

dados.telefone

);



}



/**
==========================================================
ABRIR WHATSAPP DO CLIENTE
==========================================================
*/

function abrirWhatsAppCliente(
telefone,
mensagem
){



return criarLinkWhatsApp(

mensagem,

limparTelefone(
telefone
)

);



}
