/**
==========================================================
YES FREE ERP
Revendedores.gs
Cadastro / Consulta / Pedidos para Revenda
Regra:
- Revendedor NÃO baixa estoque consumidor
- Pedido enviado para indústria
- Usa PREÇO_REVENDA
==========================================================
*/


/**
==========================================================
LISTAR REVENDEDORES
==========================================================
*/

function listarRevendedores(){


return dbListar(
CONFIG.ABAS.REVENDEDORES
);


}



/**
==========================================================
BUSCAR REVENDEDOR POR ID
==========================================================
*/

function buscarRevendedor(
id
){


const registro =

dbBuscarPorId(

CONFIG.ABAS.REVENDEDORES,

id

);



if(!registro){

return null;

}



const r =
registro.dados;



return {


id:r[0],


nomeRazao:r[1],


nomeFantasia:r[2],


tipoPessoa:r[3],


dataCadastro:r[4],


cpf:r[5],


cnpj:r[6],


telefone:r[7],


whatsapp:r[8],


email:r[9],


emailNF:r[10],


inscricaoEstadual:r[11],


cidade:r[12],


endereco:r[13],


segmento:r[14],


condicaoPagamento:r[15],


statusFinanceiro:r[16],


tabelaPreco:r[17],


status:r[18]


};


}



/**
==========================================================
BUSCA INTELIGENTE
ID / NOME / CNPJ
==========================================================
*/

function buscarRevendedorVenda(
valor
){


valor =

limparTexto(valor)

.toLowerCase();



const lista =

listarRevendedores();



for(
let i=0;
i<lista.length;
i++
){


const r =
lista[i];



if(

String(r[0])
.toLowerCase()
.includes(valor)

||

String(r[1])
.toLowerCase()
.includes(valor)

||

String(r[6])
.includes(valor)

){



return buscarRevendedor(
r[0]
);



}


}



return null;


}



/**
==========================================================
CADASTRAR REVENDEDOR
==========================================================
*/

function cadastrarRevendedorCompleto(
dados
){


const id =

gerarID(
"REV"
);



const linha = [



id,


dados.razaoSocial || "",


dados.nomeFantasia || "",


dados.tipoPessoa || "JURIDICA",


new Date(),


limparDocumento(
dados.cpf
),


limparDocumento(
dados.cnpj
),


limparTelefone(
dados.telefone
),


limparTelefone(
dados.whatsapp
),


dados.email || "",


dados.emailNF || "",


dados.inscricaoEstadual || "",


dados.cidade || "",


dados.endereco || "",


dados.segmento || "",


dados.condicaoPagamento || "",


dados.statusFinanceiro || "EM ABERTO",


dados.tabelaPreco || "REVENDA",


CONFIG.STATUS.ATIVO,


"",


"",


"",


new Date()



];



dbInserir(

CONFIG.ABAS.REVENDEDORES,

linha

);



registrarLog(

"REVENDEDOR",

"CRIADO",

id

);



return resposta(

true,

"Revendedor cadastrado",

{

id:id

}

);



}



/**
==========================================================
ATUALIZAR REVENDEDOR
==========================================================
*/

function atualizarRevendedor(
id,
dados
){


const registro =

dbBuscarPorId(

CONFIG.ABAS.REVENDEDORES,

id

);



if(!registro){


return resposta(

false,

"Revendedor não encontrado"

);


}



let r =
registro.dados;



r[1] =
dados.razaoSocial || r[1];


r[2] =
dados.nomeFantasia || r[2];


r[3] =
dados.tipoPessoa || r[3];


r[5] =
dados.cpf || r[5];


r[6] =
dados.cnpj || r[6];


r[7] =
dados.telefone || r[7];


r[8] =
dados.whatsapp || r[8];


r[9] =
dados.email || r[9];


r[12] =
dados.cidade || r[12];


r[13] =
dados.endereco || r[13];


r[14] =
dados.segmento || r[14];


r[15] =
dados.condicaoPagamento || r[15];


r[17] =
dados.tabelaPreco || r[17];



r[22] =
new Date();



dbAtualizarLinha(

CONFIG.ABAS.REVENDEDORES,

registro.linha,

r

);



registrarLog(

"REVENDEDOR",

"ATUALIZADO",

id

);



return resposta(

true,

"Revendedor atualizado"

);



}



/**
==========================================================
EXCLUIR REVENDEDOR
==========================================================
*/

function excluirRevendedor(
id
){


const registro =

dbBuscarPorId(

CONFIG.ABAS.REVENDEDORES,

id

);



if(!registro){

return resposta(

false,

"Revendedor não encontrado"

);

}



dbExcluir(

CONFIG.ABAS.REVENDEDORES,

registro.linha

);



registrarLog(

"REVENDEDOR",

"EXCLUIDO",

id

);



return resposta(

true,

"Revendedor excluído"

);



}



/**
==========================================================
VALIDAR PREÇO REVENDA
==========================================================
*/

function obterTabelaPrecoRevenda(
idRevendedor
){


const rev =

buscarRevendedor(
idRevendedor
);



if(!rev){

return "PADRAO";

}



return rev.tabelaPreco || "REVENDA";


}
