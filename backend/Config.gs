/**
==========================================================
YES FREE ERP
Config.gs
Configurações gerais do sistema
Google Sheets + Apps Script
==========================================================
*/


const CONFIG = {



EMPRESA:{


NOME:
"YES FREE",


VERSAO:
"1.0.0",


MOEDA:
"R$",


PASTA_PDF:
""


},




ABAS:{



CLIENTES:
"ClientesConsumidorF",


REVENDEDORES:
"Revendedores",


PRODUTOS:
"Produtos",


PEDIDOS_CONSUMIDOR:
"Pedidos_Consumidor",


ITENS_PEDIDO_CONSUMIDOR:
"Itens_Pedido_Consumidor",


PEDIDOS_REVENDA:
"Pedidos_Revenda",


ITENS_PEDIDO_REVENDA:
"Itens_Pedido_Revenda",


FINANCEIRO_CONSUMIDOR:
"Financeiro_Consumidor",


FINANCEIRO_REVENDA:
"Financeiro_Revenda",


PARCELAS:
"Parcelas",


ESTOQUE:
"Estoque",


MOVIMENTACAO_ESTOQUE:
"Movimentacao_Estoque",


LOGS:
"Logs",


DASHBOARD:
"Dashboard",


RELATORIOS:
"Relatorios",


PAGAMENTOS:
"PAGAMENTOS",


ENTREGAS:
"Entregas",


VISITAS:
"Visitas",


CONTAS_RECEBER:
"Contas_A_Receber",


USUARIOS:
"Usuários",


DOCUMENTOS:
"Documentos",


LISTAS_APOIO:
"Listas_Apoio",


MENSAGENS:
"Mensagens_Modelo",


HISTORICO_COMUNICACAO:
"Historico_Comunicacao",


CONFIGURACOES:
"Configuracoes_Sistema"


},




STATUS:{


ATIVO:
"ATIVO",


INATIVO:
"INATIVO",


PAGO:
"PAGO",


EM_ABERTO:
"EM ABERTO",


CANCELADO:
"CANCELADO",


PENDENTE:
"PENDENTE"


},




TIPOS_VENDA:{


VENDA:
"VENDA",


ORCAMENTO:
"ORÇAMENTO",


CONSIGNADO:
"CONSIGNADO",


PAGAMENTO:
"PAGAMENTO"


},




FORMAS_PAGAMENTO:{


PIX:
"PIX",


DINHEIRO:
"DINHEIRO",


CARTAO:
"CARTÃO",


BOLETO:
"BOLETO",


PRAZO:
"PRAZO"


},




LISTAS:{


TIPO_VENDA:[

"VENDA",

"ORÇAMENTO",

"CONSIGNADO",

"PAGAMENTO"

],



FORMA_PAGAMENTO:[

"PIX",

"DINHEIRO",

"CARTÃO",

"BOLETO",

"PRAZO"

],



TIPO_PESSOA:[

"FISICA",

"JURIDICA"

],



STATUS:[

"ATIVO",

"INATIVO"

]

},




REGRAS:{


PERMITIR_ESTOQUE_NEGATIVO:
false,


BAIXAR_ESTOQUE_CONSUMIDOR:
true,


BAIXAR_ESTOQUE_REVENDA:
false,


GERAR_PDF_AUTOMATICO:
true,


GERAR_FINANCEIRO_AUTOMATICO:
true


},




COLUNAS:{



CLIENTES:{


ID:1,

NOME:2,

TIPO_PESSOA:3,

CPF:4,

DATA_CADASTRO:5,

TELEFONE:6,

WHATSAPP:7,

EMAIL:8,

CEP:9,

ENDERECO:10,

NUMERO:11,

BAIRRO:12,

CIDADE:13,

ESTADO:14,

OBSERVACOES:15,

STATUS:16


},




PRODUTOS:{


DATA_CADASTRO:1,

ID:2,

CODIGO:3,

NOME:4,

CATEGORIA:5,

UNIDADE:6,

PRECO_REVENDA:7,

PRECO_CONSUMIDOR:8,

ESTOQUE:9,

ESTOQUE_MINIMO:10,

STATUS:11,

OBSERVACOES:12,

ATUALIZADO:13,

EMBALAGEM:14,

PESO_VOLUME:15,

ATIVO:16


}



}



};
