/**
==========================================================
KATIENE BARBOSA YES ERP
Produtos.gs

Módulo:
- Cadastro de produtos
- Consulta
- Edição
- Exclusão
- Controle inicial de estoque

Integração:

Api.gs
   ↓
Produtos.gs
   ↓
Database.gs
   ↓
Google Sheets

==========================================================
*/



/**
==========================================================
LISTAR PRODUTOS
==========================================================
*/


function listarProdutos(){


return bancoListar(

DATABASE.ABAS.PRODUTOS

);


}




/**
==========================================================
SALVAR PRODUTO
==========================================================
*/


function salvarProduto(
dados
){



if(

!dados.nome

){



return {


sucesso:false,


mensagem:

"Nome do produto obrigatório"



};



}





/**
=============================
NOVO PRODUTO
=============================
*/


if(

!dados.id

){



const produto = mapearProduto(

dados

);



produto.ID = gerarID();



produto.Status = "ATIVO";



const resultado =

bancoInserir(

DATABASE.ABAS.PRODUTOS,

produto

);



/**
CRIAR ESTOQUE INICIAL
*/


if(

resultado.sucesso

&&

dados.estoque

){



registrarEstoqueProduto(

produto.ID,

dados.estoque

);



}



return resultado;



}





/**
=============================
ATUALIZA PRODUTO
=============================
*/


return bancoAtualizar(

DATABASE.ABAS.PRODUTOS,

dados.id,

mapearProduto(

dados

)

);



}





/**
==========================================================
BUSCAR PRODUTO
==========================================================
*/


function buscarProduto(
id
){



const produtos =

listarProdutos();



const produto =

produtos.find(function(p){



return String(p.ID)

===

String(id);



});



return produto || null;



}





/**
==========================================================
EXCLUIR PRODUTO
==========================================================
*/


function excluirProduto(
id
){



return bancoExcluir(

DATABASE.ABAS.PRODUTOS,

id

);



}





/**
==========================================================
MAPEAMENTO CAMPOS
==========================================================
*/


function mapearProduto(
dados
){



return {



ID:

dados.ID || dados.id || gerarID(),



Codigo:

dados.codigo || "",



Nome:

dados.nome || "",



Categoria:

dados.categoria || "",



Unidade:

dados.unidade || "UN",



Preco_Consumidor:

Number(

dados.precoConsumidor || 0

),



Preco_Revenda:

Number(

dados.precoRevenda || 0

),



Estoque:

Number(

dados.estoque || 0

),



Estoque_Minimo:

Number(

dados.estoqueMinimo || 0

),



Status:

dados.Status || "ATIVO"



};



}





/**
==========================================================
BUSCAR PRODUTO POR NOME
==========================================================
*/


function buscarProdutoNome(
nome
){



const produtos =

listarProdutos();



return produtos.filter(function(p){



return String(

p.Nome

)

.toLowerCase()

.includes(

String(nome)

.toLowerCase()

);



});



}





/**
==========================================================
ALTERAR ESTOQUE PRODUTO
==========================================================
*/


function atualizarEstoqueProduto(
id,

quantidade
){



const produto =

buscarProduto(

id

);



if(

!produto

){



return {


sucesso:false,


mensagem:

"Produto não encontrado"



};



}



const novoEstoque =


Number(

produto.Estoque

)

+

Number(

quantidade

);




return bancoAtualizar(

DATABASE.ABAS.PRODUTOS,

id,

{


Estoque:

novoEstoque



}

);



}




/**
==========================================================
ESTOQUE INICIAL
==========================================================
*/


function registrarEstoqueProduto(
produtoID,

quantidade
){



const estoque = {



ID:

gerarID(),



Produto_ID:

produtoID,



Entrada:

Number(

quantidade

),



Saida:

0,



Saldo:

Number(

quantidade

),



Data:

new Date()



};




return bancoInserir(

DATABASE.ABAS.ESTOQUE,

estoque

);



}
