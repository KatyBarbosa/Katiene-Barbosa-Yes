/**
==========================================================
YES FREE ERP
Util.gs
Funções auxiliares globais
==========================================================
*/



/**
 * Data atual
 */
function agora(){


return new Date();


}



/**
 * Formata data
 */
function formatarData(
data
){


if(!data){

data = new Date();

}



return Utilities

.formatDate(

new Date(data),

Session

.getScriptTimeZone(),

"dd/MM/yyyy HH:mm:ss"

);


}



/**
 * Formata somente data
 */
function formatarDataSimples(
data
){


return Utilities

.formatDate(

new Date(data),

Session

.getScriptTimeZone(),

"dd/MM/yyyy"

);


}



/**
 * Gerar ID automático
 */
function gerarID(
prefixo
){



return prefixo

+

Utilities

.formatString(

"%06d",

new Date()

.getTime()

.toString()

.slice(-6)

);



}



/**
 * Converter moeda
 */
function moeda(
valor
){


return Number(valor || 0);



}



/**
 * Converter número
 */
function numero(
valor
){


if(!valor)

return 0;



return Number(

String(valor)

.replace(

",",

"."

)

);



}



/**
 * Remover caracteres especiais
 */
function limparTexto(
texto
){


return String(texto || "")

.trim();

}



/**
 * CPF/CNPJ somente números
 */
function limparDocumento(
valor
){


return String(valor || "")

.replace(

/\D/g,

""

);


}



/**
 * Telefone somente números
 */
function limparTelefone(
valor
){


return String(valor || "")

.replace(

/\D/g,

""

);


}



/**
 * Validar email
 */
function validarEmail(
email
){


if(!email)

return false;



return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

.test(email);



}



/**
 * Criar resposta API
 */
function resposta(
sucesso,
mensagem,
dados
){



return {


sucesso:

sucesso,


mensagem:

mensagem || "",


dados:

dados || null


};


}



/**
 * Registrar log
 */
function registrarLog(
modulo,
acao,
id,
antes,
depois,
observacao
){


try{


const aba =
getAba(
CONFIG.ABAS.LOGS
);



aba.appendRow([



gerarID(
"LOG"
),


new Date(),


Session

.getActiveUser()

.getEmail(),



acao,


modulo,


id || "",


JSON.stringify(
antes || {}
),


JSON.stringify(
depois || {}
),


observacao || ""



]);



}

catch(e){



console.log(
"Erro Log:",
e
);


}



}



/**
 * Verificar se existe valor
 */
function existe(
valor
){


return valor !== null

&&

valor !== undefined

&&

valor !== "";



}



/**
 * Somar valores
 */
function somar(
lista,
campo
){


let total = 0;



lista.forEach(function(item){


total += Number(

item[campo] || 0

);



});



return total;



}



/**
 * Calcular percentual
 */
function percentual(
valor,
percentual
){


return Number(valor || 0)

*

(Number(percentual || 0)

/100);



}



/**
 * Calcular desconto
 */
function aplicarDesconto(
valor,
desconto
){


return Number(valor || 0)

-

percentual(
valor,
desconto
);



}



/**
 * Criar JSON seguro
 */
function json(
obj
){


return JSON.stringify(
obj
);



}



/**
 * Parse JSON seguro
 */
function parseJSON(
texto
){


try{


return JSON.parse(
texto
);


}

catch(e){


return {};

}



}



/**
 * Verificar permissão
 */
function usuarioAtual(){


return Session

.getActiveUser()

.getEmail();



}



/**
 * Retorna última linha
 */
function ultimaLinha(
aba
){


return getAba(
aba
)

.getLastRow();



}



/**
 * Validar campos obrigatórios
 */
function validarCampos(
obj,
campos
){


for(
let i=0;
i<campos.length;
i++
){


if(!existe(obj[campos[i]])){


return false;


}


}



return true;



}
