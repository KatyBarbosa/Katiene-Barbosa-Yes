/**
==========================================================
YES FREE ERP
Database.gs
Camada de banco de dados Google Sheets
CRUD centralizado
==========================================================
*/


/**
 * Retorna planilha ativa
 */
function getSpreadsheet(){


return SpreadsheetApp
.getActive();


}



/**
 * Retorna aba pelo nome
 */
function getAba(
nome
){


const aba =
getSpreadsheet()
.getSheetByName(nome);



if(!aba){


throw new Error(
"Aba não encontrada: "
+
nome
);


}



return aba;


}



/**
 * Listar dados da aba
 */
function dbListar(
aba
){


const sheet =
getAba(aba);



const ultima =
sheet.getLastRow();



if(
ultima <=1
){

return [];

}



return sheet

.getRange(

2,

1,

ultima-1,

sheet.getLastColumn()

)

.getValues();



}



/**
 * Inserir uma linha
 */
function dbInserir(
aba,
dados
){


const sheet =
getAba(aba);



sheet

.appendRow(
dados
);



return true;


}



/**
 * Inserir várias linhas
 */
function dbInserirLote(
aba,
dados
){


if(
!dados ||
dados.length===0
){

return false;

}



const sheet =
getAba(aba);



const linha =
sheet.getLastRow()+1;



sheet

.getRange(

linha,

1,

dados.length,

dados[0].length

)

.setValues(
dados
);



return true;


}



/**
 * Buscar registro pelo ID primeira coluna
 */
function dbBuscarPorId(
aba,
id
){


const sheet =
getAba(aba);



const dados =
sheet

.getDataRange()

.getValues();



for(
let i=1;
i<dados.length;
i++
){


if(
String(dados[i][0])
===
String(id)
){


return {


linha:
i+1,


dados:
dados[i]


};


}


}



return null;


}



/**
 * Atualizar campos específicos
 */
function dbAtualizarCampos(
aba,
linha,
campos
){


const sheet =
getAba(aba);



Object.keys(campos)

.forEach(function(coluna){


sheet

.getRange(

linha,

Number(coluna)

)

.setValue(
campos[coluna]
);



});



return true;


}



/**
 * Excluir registro
 */
function dbExcluir(
aba,
linha
){


const sheet =
getAba(aba);



sheet

.deleteRow(
linha
);



return true;


}



/**
 * Contar registros
 */
function dbContar(
aba
){


return dbListar(aba)
.length;


}



/**
 * Executar transação protegida
 */
function dbTransacao(
funcao
){


const lock =
LockService
.getScriptLock();



try{


lock.waitLock(30000);



return funcao();



}

finally{


lock.releaseLock();



}



}



/**
 * Procurar por campo
 */
function dbBuscar(
aba,
coluna,
valor
){


const dados =
dbListar(aba);



return dados.filter(function(linha){


return String(
linha[coluna]
)

.toLowerCase()

.includes(

String(valor)

.toLowerCase()

);



});


}



/**
 * Atualizar linha completa
 */
function dbAtualizarLinha(
aba,
linha,
dados
){


const sheet =
getAba(aba);



sheet

.getRange(

linha,

1,

1,

dados.length

)

.setValues(
[dados]
);



return true;


}



/**
 * Criar backup simples
 */
function dbBackup(){


const ss =
getSpreadsheet();



const copia =
ss.copy(
"BACKUP YES FREE "
+
formatarData(
agora()
)
);



return copia.getId();


}
