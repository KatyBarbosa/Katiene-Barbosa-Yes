/**
==========================================================
YES FREE ERP
Validacoes.gs
Listas suspensas e validações Google Sheets
==========================================================
*/


/**
==========================================================
CRIAR TODAS AS VALIDAÇÕES
==========================================================
*/

function criarValidacoes(){


const ss =

SpreadsheetApp

.getActive();



const apoio =

ss.getSheetByName(

CONFIG.ABAS.LISTAS_APOIO

);



if(!apoio){


throw new Error(

"Aba Listas_Apoio não encontrada"

);


}



/**
==========================================================
Tela_Venda
==========================================================
*/


const venda =

ss.getSheetByName(

"Tela_Venda"

);



if(venda){



/**
 Tipo Venda
 Coluna A
 */

venda

.getRange(
2,
1,
1000,
1
)

.setDataValidation(



SpreadsheetApp

.newDataValidation()

.requireValueInRange(

apoio

.getRange(

"A2:A5"

),

true

)

.build()



);



/**
 Forma pagamento
 Coluna B
 */


venda

.getRange(
2,
2,
1000,
1
)

.setDataValidation(



SpreadsheetApp

.newDataValidation()

.requireValueInRange(

apoio

.getRange(

"B2:B6"

),

true

)

.build()



);



/**
 Cliente
 Busca dinâmica
 */


venda

.getRange(
2,
3,
1000,
1
)

.setDataValidation(



SpreadsheetApp

.newDataValidation()

.requireValueInRange(

ss

.getSheetByName(

CONFIG.ABAS.CLIENTES

)

.getRange(

"B2:B"

),

true

)

.build()



);



/**
 Produto
 */


venda

.getRange(
2,
4,
1000,
1
)

.setDataValidation(



SpreadsheetApp

.newDataValidation()

.requireValueInRange(

ss

.getSheetByName(

CONFIG.ABAS.PRODUTOS

)

.getRange(

"D2:D"

),

true

)

.build()



);



}



/**
==========================================================
Clientes
==========================================================
*/


const clientes =

ss.getSheetByName(

CONFIG.ABAS.CLIENTES

);



if(clientes){



clientes

.getRange(

2,

3,

1000,

1

)

.setDataValidation(



SpreadsheetApp

.newDataValidation()

.requireValueInRange(

apoio

.getRange(

"C2:C3"

),

true

)

.build()



);



clientes

.getRange(

2,

16,

1000,

1

)

.setDataValidation(



SpreadsheetApp

.newDataValidation()

.requireValueInRange(

apoio

.getRange(

"D2:D3"

),

true

)

.build()



);



}



/**
==========================================================
Produtos
==========================================================
*/


const produtos =

ss.getSheetByName(

CONFIG.ABAS.PRODUTOS

);



if(produtos){



produtos

.getRange(

2,

5,

1000,

1

)

.setDataValidation(



SpreadsheetApp

.newDataValidation()

.requireValueInRange(

apoio

.getRange(

"E2:E"

),

true

)

.build()



);



}



/**
 LOG
 */

registrarLog(

"SISTEMA",

"VALIDACOES_CRIADAS",

""

);



return true;



}



/**
==========================================================
CRIAR LISTAS APOIO AUTOMATICAMENTE
==========================================================
*/

function criarListasApoio(){



const ss =

SpreadsheetApp

.getActive();



let aba =

ss.getSheetByName(

CONFIG.ABAS.LISTAS_APOIO

);



if(!aba){


aba =

ss.insertSheet(

CONFIG.ABAS.LISTAS_APOIO

);


}



aba.clear();



aba

.getRange(

"A1:D6"

)

.setValues([



[

"TIPO_VENDA",

"PAGAMENTO",

"TIPO_PESSOA",

"STATUS"

],



[

"VENDA",

"PIX",

"FISICA",

"ATIVO"

],



[

"ORÇAMENTO",

"DINHEIRO",

"JURIDICA",

"INATIVO"

],



[

"CONSIGNADO",

"CARTÃO",

"",

""

],



[

"PAGAMENTO",

"BOLETO",

"",

""

],



[

"",

"PRAZO",

"",

""

]



]);



return true;



}
