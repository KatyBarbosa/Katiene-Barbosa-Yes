/**
==========================================================
YES FREE ERP
PDF.gs
Geração de PDF de pedidos
Google Docs → PDF → Drive
==========================================================
*/


/**
==========================================================
GERAR PDF PEDIDO
==========================================================
*/

function gerarPDF(
idPedido,
tipo
){



const pedido =

buscarPedido(
idPedido
);



if(!pedido){


return resposta(

false,

"Pedido não encontrado"

);


}



const itens =

listarItensPedido(
idPedido
);



const documento =

DocumentApp

.create(

"Pedido YES FREE - "

+

idPedido

);



const corpo =

documento

.getBody();



corpo

.appendParagraph(

"YES FREE"

);



corpo

.appendParagraph(

"Pedido: "

+

idPedido

);



corpo

.appendParagraph(

"Data: "

+

formatarData(
pedido[1]
)

);



corpo

.appendParagraph(

"Cliente: "

+

pedido[3]

);



corpo

.appendParagraph(

"Telefone: "

+

pedido[5]

);



corpo

.appendParagraph(

""

);



corpo

.appendParagraph(

"PRODUTOS"

);



let total = 0;



itens.forEach(function(i){



corpo

.appendParagraph(

i[4]

+

" | Qtd: "

+

i[5]

+

" | R$ "

+

i[8]

);



total +=

Number(i[8] || 0);



});



corpo

.appendParagraph(

""

);



corpo

.appendParagraph(

"Total Produtos: R$ "

+

total

);



corpo

.appendParagraph(

"Desconto: R$ "

+

pedido[7]

);



corpo

.appendParagraph(

"Frete: R$ "

+

pedido[8]

);



corpo

.appendParagraph(

"TOTAL FINAL: R$ "

+

pedido[9]

);



documento

.saveAndClose();




const arquivo =

DriveApp

.getFileById(

documento.getId()

);



const pdf =

arquivo

.getAs(

MimeType.PDF

);



const pasta =

obterPastaPDF();



const salvo =

pasta

.createFile(
pdf
);



arquivo

.setTrashed(
true
);



registrarLog(

"PDF",

"GERADO",

idPedido

);



return resposta(

true,

"PDF criado",

{

id:

salvo.getId(),


url:

salvo.getUrl()



}

);



}



/**
==========================================================
CRIAR / OBTER PASTA PDF
==========================================================
*/

function obterPastaPDF(){



if(
CONFIG.EMPRESA.PASTA_PDF
){

return DriveApp

.getFolderById(

CONFIG.EMPRESA.PASTA_PDF

);


}



const pastas =

DriveApp

.getFoldersByName(

"YES FREE PDFs"

);



if(

pastas.hasNext()

){


return pastas.next();


}



return DriveApp

.createFolder(

"YES FREE PDFs"

);



}



/**
==========================================================
GERAR ORÇAMENTO
==========================================================
*/

function gerarOrcamentoPDF(
idPedido
){


return gerarPDF(

idPedido,

"ORCAMENTO"

);


}



/**
==========================================================
GERAR COMPROVANTE
==========================================================
*/

function gerarComprovantePDF(
idPedido
){


return gerarPDF(

idPedido,

"COMPROVANTE"

);


}
