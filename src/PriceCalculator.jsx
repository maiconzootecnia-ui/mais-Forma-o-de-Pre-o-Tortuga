import React, { useState, useMemo } from "react";

const TORTUGA_LOGO = "data:image/jpeg;base64,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";
const MAISA_LOGO = "data:image/jpeg;base64,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";

// ---- Tabela de preços TORTUGA (dsm-firmenich) - Nutrição - 03/07/2026 ----
// Preços à vista com 18% de ICMS incluso, em R$/kg posto cliente. mt1/mt2/mt3 = colunas do PDF.

const PRODUTOS = [
  // CONFINAMENTO
  { cod: "BRT487A025", nome: "FOSBOVI CONFINAMENTO", cat: "Confinamento", peso: 25, mt1: 7.2633, mt2: 7.2848, mt3: 7.5737 },
  { cod: "BRT352A025", nome: "FOSBOVI CONFINAMENTO PLUS", cat: "Confinamento", peso: 25, mt1: 8.9834, mt2: 9.0049, mt3: 9.2938 },
  { cod: "BRT353A025", nome: "FOSBOVI CONFINAMENTO PLUS N", cat: "Confinamento", peso: 25, mt1: 8.0159, mt2: 8.0374, mt3: 8.3263 },
  { cod: "BRT346A025", nome: "FOSBOVI CONFINAMENTO PRIME", cat: "Confinamento", peso: 25, mt1: 10.7572, mt2: 10.7787, mt3: 11.0677 },
  { cod: "BRT350A025", nome: "FOSBOVI CONFINAMENTO PRIME 5.0", cat: "Confinamento", peso: 25, mt1: 14.7618, mt2: 14.7833, mt3: 15.0722 },
  { cod: "BRT351A025", nome: "FOSBOVI CONFINAMENTO PRIME 5.0 N", cat: "Confinamento", peso: 25, mt1: 11.886, mt2: 11.9075, mt3: 12.1965 },
  { cod: "BRT348A025", nome: "FOSBOVI CONFINAMENTO PRIME DDG", cat: "Confinamento", peso: 25, mt1: 9.2656, mt2: 9.2871, mt3: 9.576 },
  { cod: "BRT347A025", nome: "FOSBOVI CONFINAMENTO PRIME N", cat: "Confinamento", peso: 25, mt1: 9.7763, mt2: 9.7978, mt3: 10.0867 },
  { cod: "BRT354A025", nome: "FOSBOVI SEMICONFINAMENTO 10 PRIME N", cat: "Confinamento", peso: 25, mt1: 7.8815, mt2: 7.903, mt3: 8.1919 },
  // GADO DE CORTE BOI VERDE
  { cod: "BRT698A025", nome: "FOSBOVI ADVANCE", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 8.1502, mt2: 8.1717, mt3: 8.4607 },
  { cod: "BRR008A030", nome: "FOSBOVI ENGORDA", cat: "Gado de Corte Boi Verde", peso: 30, mt1: 7.7605, mt2: 7.782, mt3: 8.071 },
  { cod: "BRQ325A025", nome: "FOSBOVI MULTI ADVANCE", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 7.5186, mt2: 7.5401, mt3: 7.8291 },
  { cod: "BRQ194A025", nome: "FOSBOVI NÚCLEO", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 13.1895, mt2: 13.211, mt3: 13.5 },
  { cod: "BRM477A025", nome: "FOSBOVI NÚCLEO ADVANCE", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 15.4606, mt2: 15.4821, mt3: 15.771 },
  { cod: "BRQ284A025", nome: "FOSBOVI NÚCLEO IMPACT", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 10.3138, mt2: 10.3353, mt3: 10.6242 },
  { cod: "BRQ195A025", nome: "FOSBOVI NÚCLEO PLUS", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 14.4527, mt2: 14.4742, mt3: 14.7632 },
  { cod: "BRQ285A025", nome: "FOSBOVI NÚCLEO PRIMA", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 9.4269, mt2: 9.4484, mt3: 9.7373 },
  { cod: "BRQ403A025", nome: "FOSBOVI NÚCLEO REPRODUÇÃO MAX", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 13.9958, mt2: 14.0173, mt3: 14.3063 },
  { cod: "BRR010C030", nome: "FOSBOVI PAMPERO", cat: "Gado de Corte Boi Verde", peso: 30, mt1: 9.6822, mt2: 9.7037, mt3: 9.9926 },
  { cod: "BRR992M025", nome: "FOSBOVI PLUS", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 7.7471, mt2: 7.7686, mt3: 8.0575 },
  { cod: "BRR011A030", nome: "FOSBOVI REPRODUÇÃO", cat: "Gado de Corte Boi Verde", peso: 30, mt1: 9.6822, mt2: 9.7037, mt3: 9.9926 },
  { cod: "BRR015A030", nome: "FOSCROMO", cat: "Gado de Corte Boi Verde", peso: 30, mt1: 9.4806, mt2: 9.5021, mt3: 9.791 },
  // GADO DE CORTE TQ
  { cod: "BRR100A030", nome: "FOSBOVI 15", cat: "Gado de Corte TQ", peso: 30, mt1: 6.793, mt2: 6.8145, mt3: 7.1034 },
  { cod: "BRR056A030", nome: "FOSBOVI 18", cat: "Gado de Corte TQ", peso: 30, mt1: 7.9218, mt2: 7.9433, mt3: 8.2322 },
  { cod: "BRR101A030", nome: "FOSBOVI 20", cat: "Gado de Corte TQ", peso: 30, mt1: 8.4593, mt2: 8.4808, mt3: 8.7697 },
  { cod: "BRR104A025", nome: "FOSBOVI 30", cat: "Gado de Corte TQ", peso: 25, mt1: 11.9667, mt2: 11.9882, mt3: 12.2771 },
  { cod: "BRR102A025", nome: "FOSBOVI 40", cat: "Gado de Corte TQ", peso: 25, mt1: 15.3396, mt2: 15.3612, mt3: 15.6501 },
  { cod: "BRM077A025", nome: "FOSBOVI BALANCE", cat: "Gado de Corte TQ", peso: 25, mt1: 6.3495, mt2: 6.371, mt3: 6.6599 },
  { cod: "BRM080A025", nome: "FOSBOVI NÚCLEO BALANCE", cat: "Gado de Corte TQ", peso: 25, mt1: 10.9857, mt2: 11.0072, mt3: 11.2961 },
  { cod: "BRR103A030", nome: "FOSBOVI PRONTO", cat: "Gado de Corte TQ", peso: 30, mt1: 5.3551, mt2: 5.3766, mt3: 5.6655 },
  { cod: "BRR059A025", nome: "ULTRA PHÓS ENGORDA", cat: "Gado de Corte TQ", peso: 25, mt1: 8.1234, mt2: 8.1449, mt3: 8.4338 },
  // NÚCLEOS BOI VERDE
  // PROGRAMA DE LEITE
  { cod: "BRB321A025", nome: "BOVIGOLD", cat: "Programa de Leite", peso: 25, mt1: 8.7550, mt2: 8.7765, mt3: 9.0654 },
  { cod: "BRT391A020", nome: "BOVIGOLD BUFFER", cat: "Programa de Leite", peso: 20, mt1: 7.4783, mt2: 7.4998, mt3: 7.7888 },
  { cod: "BRB539A025", nome: "BOVIGOLD CRINA", cat: "Programa de Leite", peso: 25, mt1: 12.1414, mt2: 12.1629, mt3: 12.4518 },
  { cod: "BRB241A025", nome: "BOVIGOLD CRINA 400", cat: "Programa de Leite", peso: 25, mt1: 15.9578, mt2: 15.9793, mt3: 16.2682 },
  { cod: "BRM338A025", nome: "BOVIGOLD DIGEST", cat: "Programa de Leite", peso: 25, mt1: 9.6419, mt2: 9.6634, mt3: 9.9523 },
  { cod: "BRT188A025", nome: "BOVIGOLD EXTRA PLUS", cat: "Programa de Leite", peso: 25, mt1: 14.0765, mt2: 14.0980, mt3: 14.3869 },
  { cod: "BRB248A025", nome: "BOVIGOLD FREE", cat: "Programa de Leite", peso: 25, mt1: 6.6720, mt2: 6.6935, mt3: 6.9825 },
  { cod: "BRM337A025", nome: "BOVIGOLD GUARD", cat: "Programa de Leite", peso: 25, mt1: 10.6497, mt2: 10.6712, mt3: 10.9602 },
  { cod: "5065979BAG", nome: "BOVIGOLD LAC, bags", cat: "Programa de Leite", peso: 25, mt1: 27.3937, mt2: 27.4152, mt3: 27.7041 },
  { cod: "BRB766A025", nome: "BOVIGOLD LIV", cat: "Programa de Leite", peso: 25, mt1: 10.6900, mt2: 10.7116, mt3: 11.0005 },
  { cod: "BRR149A025", nome: "BOVIGOLD PASTO", cat: "Programa de Leite", peso: 25, mt1: 8.7818, mt2: 8.8033, mt3: 9.0923 },
  { cod: "BRQ020A020", nome: "BOVIGOLD PASTO (SC 20)", cat: "Programa de Leite", peso: 20, mt1: 7.1021, mt2: 7.1236, mt3: 7.4125 },
  { cod: "BRB322A025", nome: "BOVIGOLD PLUS", cat: "Programa de Leite", peso: 25, mt1: 9.8166, mt2: 9.8381, mt3: 10.1270 },
  { cod: "BRR143A025", nome: "BOVIGOLD PRE PARTO OVN", cat: "Programa de Leite", peso: 25, mt1: 24.5582, mt2: 24.5797, mt3: 24.8686 },
  { cod: "BRR703G025", nome: "BOVIGOLD PRE PARTO PLUS", cat: "Programa de Leite", peso: 25, mt1: 29.6916, mt2: 29.7131, mt3: 30.0020 },
  { cod: "BRR144A025", nome: "BOVIGOLD PRIMA", cat: "Programa de Leite", peso: 25, mt1: 25.4048, mt2: 25.4263, mt3: 25.7152 },
  { cod: "BRT127A025", nome: "BOVIGOLD PRO", cat: "Programa de Leite", peso: 25, mt1: 9.3194, mt2: 9.3409, mt3: 9.6298 },
  { cod: "BRR145A025", nome: "BOVIGOLD RECRIA", cat: "Programa de Leite", peso: 25, mt1: 19.4920, mt2: 19.5135, mt3: 19.8025 },
  { cod: "BRB540A025", nome: "BOVIGOLD ULTRA", cat: "Programa de Leite", peso: 25, mt1: 14.6409, mt2: 14.6624, mt3: 14.9513 },
  { cod: "BRR724M020", nome: "FEPROXI", cat: "Programa de Leite", peso: 20, mt1: 64.5098, mt2: 64.5313, mt3: 64.8203 },
  { cod: "BRR705K020", nome: "LACBOVI", cat: "Programa de Leite", peso: 20, mt1: 7.5455, mt2: 7.5670, mt3: 7.8559 },
  { cod: "BRR540B020", nome: "LACBOVI PASTO", cat: "Programa de Leite", peso: 20, mt1: 7.6127, mt2: 7.6342, mt3: 7.9231 },
  { cod: "BRT476A020", nome: "VICTUS DIGEST", cat: "Programa de Leite", peso: 20, mt1: 34.2740, mt2: 34.2955, mt3: 34.5844 },
  { cod: "BRM366A020", nome: "VICTUS THERMO", cat: "Programa de Leite", peso: 20, mt1: 29.9469, mt2: 29.9684, mt3: 30.2573 },
  // PROGRAMA DE SECA
  { cod: "BRQ288A025", nome: "FOSBOVI NÚCLEO PROTEICO", cat: "Programa de Seca", peso: 25, mt1: 7.8143, mt2: 7.8358, mt3: 8.1247 },
  { cod: "BRQ402A025", nome: "FOSBOVI NÚCLEO PROTEICO ADVANCE", cat: "Programa de Seca", peso: 25, mt1: 8.1234, mt2: 8.1449, mt3: 8.4338 },
  { cod: "BRQ319A030", nome: "FOSBOVI PROTEICO 30 ADVANCE", cat: "Programa de Seca", peso: 30, mt1: 6.3764, mt2: 6.3979, mt3: 6.6868 },
  { cod: "BRQ282A030", nome: "FOSBOVI PROTEICO 35 (BRQ282A030)", cat: "Programa de Seca", peso: 30, mt1: 5.7045, mt2: 5.7260, mt3: 6.0149 },
  { cod: "BRQ281A030", nome: "FOSBOVI PROTEICO 35 PLUS", cat: "Programa de Seca", peso: 30, mt1: 5.9329, mt2: 5.9544, mt3: 6.2434 },
  { cod: "BRQ283A030", nome: "FOSBOVI PROTEICO 40 PLUS", cat: "Programa de Seca", peso: 30, mt1: 6.3495, mt2: 6.3710, mt3: 6.6599 },
  { cod: "BRQ279A025", nome: "FOSBOVI SECA 15", cat: "Programa de Seca", peso: 25, mt1: 7.2096, mt2: 7.2311, mt3: 7.5200 },
  { cod: "BRQ404A025", nome: "FOSBOVI SECA 15 MAX", cat: "Programa de Seca", peso: 25, mt1: 7.4918, mt2: 7.5133, mt3: 7.8022 },
  { cod: "BRQ182A025", nome: "FOSBOVI SECA 20", cat: "Programa de Seca", peso: 25, mt1: 7.5455, mt2: 7.5670, mt3: 7.8559 },
  { cod: "BRQ183A025", nome: "FOSBOVI SECA 20 MAX", cat: "Programa de Seca", peso: 25, mt1: 8.4593, mt2: 8.4808, mt3: 8.7697 },
  // PROGRAMA DE SUPLEMENTAÇÃO ESTRATÉGICA
  { cod: "BRM798A025", nome: "FOSBOVI NÚCLEO PROTEICO IMPACT", cat: "Suplementação Estratégica", peso: 25, mt1: 7.6799, mt2: 7.7014, mt3: 7.9903 },
  { cod: "BRR084A030", nome: "FOSBOVI PROTEICO 30 COM MONENSINA", cat: "Suplementação Estratégica", peso: 30, mt1: 6.8333, mt2: 6.8548, mt3: 7.1437 },
  { cod: "BRQ221A030", nome: "FOSBOVI PROTEICO ENERGETICO 25", cat: "Suplementação Estratégica", peso: 30, mt1: 4.8982, mt2: 4.9197, mt3: 5.2086 },
  { cod: "BRQ222A030", nome: "FOSBOVI PROTEICO ENERGETICO 25 PLUS", cat: "Suplementação Estratégica", peso: 30, mt1: 5.1267, mt2: 5.1482, mt3: 5.4371 },
  { cod: "BRR031A030", nome: "FOSBOVI PROTEICO ENERGÉTICO 45 ÁGUAS", cat: "Suplementação Estratégica", peso: 30, mt1: 6.9542, mt2: 6.9757, mt3: 7.2647 },
  { cod: "BRQ289A025", nome: "FOSBOVINHO PROTEICO ADVANCE", cat: "Suplementação Estratégica", peso: 25, mt1: 8.3652, mt2: 8.3867, mt3: 8.6757 },
  // STRAIGHTS
  { cod: "5064177BAG", nome: "DL-METHIONINE 85% (MEPRON)", cat: "Straights", peso: 25, mt1: 104.1927, mt2: 104.2142, mt3: 104.5031 },
  { cod: "5017222W3N", nome: "Mycofix® Plus 5.0", cat: "Straights", peso: 25, mt1: 60.6934, mt2: 60.7149, mt3: 61.0038 },
  { cod: "5016939W3N", nome: "Mycofix® PRO-Tect", cat: "Straights", peso: 25, mt1: 19.7877, mt2: 19.8092, mt3: 20.0981 },
  { cod: "5017239W3N", nome: "Mycofix® Secure", cat: "Straights", peso: 25, mt1: 9.6419, mt2: 9.6634, mt3: 9.9523 },
  { cod: "5017225W3N", nome: "Mycofix® Select 5.0", cat: "Straights", peso: 25, mt1: 36.7332, mt2: 36.7547, mt3: 37.0436 },
  // CAPRINOS E OVINOS (Linha ECO)
  { cod: "BRR038A025", nome: "CAPRINOFÓS COM MINERAIS ORGÂNICOS", cat: "Caprinos e Ovinos", peso: 25, mt1: 11.9398, mt2: 11.9613, mt3: 12.2502 },
  { cod: "BRR028C025", nome: "OVINOFOS", cat: "Caprinos e Ovinos", peso: 25, mt1: 13.3642, mt2: 13.3857, mt3: 13.6747 },
  { cod: "BRR387B025", nome: "OVINOFOS NÚCLEO PROTEICO", cat: "Caprinos e Ovinos", peso: 25, mt1: 14.9768, mt2: 14.9983, mt3: 15.2872 },
  // EQUINOS (Linha ECO)
  { cod: "BR0596A025", nome: "COEQUI PLUS", cat: "Equinos", peso: 25, mt1: 9.7494, mt2: 9.7709, mt3: 10.0598 },
  { cod: "BR0574A025", nome: "KROMIUM", cat: "Equinos", peso: 25, mt1: 14.6543, mt2: 14.6758, mt3: 14.9647 },
  { cod: "BR0578A025", nome: "KROMIUM PROTEICO", cat: "Equinos", peso: 25, mt1: 10.2735, mt2: 10.2950, mt3: 10.5839 },
];

const CATEGORIAS = [...new Set(PRODUTOS.map((p) => p.cat))];

// Campanhas comerciais de Setembro/2026 por código de produto.
// Cada produto pode ter múltiplas campanhas cumuláveis (ex: campanha da linha + MT adicional).
// Os chips aparecem no card do produto e o usuário decide quais aplicar.
const CAMPANHAS_SETEMBRO_2026 = {
  // ---- CONFINAMENTO (Circular Seca/Confinamento/Suplementação, todos 3%) ----
  "BRT487A025": [{ origem: "Confinamento", pct: 3 }],
  "BRT352A025": [{ origem: "Confinamento", pct: 3 }],
  "BRT353A025": [{ origem: "Confinamento", pct: 3 }],
  "BRT346A025": [{ origem: "Confinamento", pct: 3 }],
  "BRT347A025": [{ origem: "Confinamento", pct: 3 }],
  "BRT348A025": [{ origem: "Confinamento", pct: 3 }],
  "BRT354A025": [{ origem: "Confinamento", pct: 3 }],
  "BRT350A025": [{ origem: "Confinamento", pct: 3 }],
  "BRT351A025": [{ origem: "Confinamento", pct: 3 }],

  // ---- BOI VERDE (Circular TQ/Boi Verde, 4%) ----
  "BRT698A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR008A030": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRQ325A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRQ194A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRM477A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRQ284A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRQ195A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRQ285A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRQ403A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR010C030": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR992M025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR011A030": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR015A030": [{ origem: "TQ/Boi Verde", pct: 4 }],

  // ---- TQ (Circular TQ/Boi Verde, 4%) ----
  "BRR100A030": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR056A030": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR101A030": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR104A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR102A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRM077A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRM080A025": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR103A030": [{ origem: "TQ/Boi Verde", pct: 4 }],
  "BRR059A025": [{ origem: "TQ/Boi Verde", pct: 4 }],

  // ---- NÚCLEOS BOI VERDE (Transição de portfólio) ----

  // ---- PROGRAMA DE SECA ----
  "BRQ288A025": [{ origem: "Seca/Confinamento", pct: 10 }],
  "BRQ402A025": [{ origem: "Seca/Confinamento", pct: 10 }],
  "BRQ319A030": [
    { origem: "Seca/Confinamento", pct: 9 },
    { origem: "MT adicional", pct: 1 },
  ],
  "BRQ282A030": [{ origem: "Seca/Confinamento", pct: 9 }],
  "BRQ281A030": [{ origem: "Seca/Confinamento", pct: 9 }],
  "BRQ283A030": [{ origem: "Seca/Confinamento", pct: 9 }],
  "BRQ279A025": [{ origem: "Seca/Confinamento", pct: 10 }],
  "BRQ404A025": [{ origem: "Seca/Confinamento", pct: 10 }],
  "BRQ182A025": [{ origem: "Seca/Confinamento", pct: 10 }],
  "BRQ183A025": [{ origem: "Seca/Confinamento", pct: 10 }],

  // ---- PROGRAMA DE SUPLEMENTAÇÃO ESTRATÉGICA ----
  "BRM798A025": [{ origem: "Seca/Confinamento", pct: 10 }],
  "BRR084A030": [
    { origem: "Seca/Confinamento", pct: 9 },
    { origem: "MT adicional", pct: 1 },
  ],
  "BRQ221A030": [
    { origem: "Seca/Confinamento", pct: 7 },
    { origem: "MT adicional", pct: 2 },
  ],
  "BRQ222A030": [
    { origem: "Seca/Confinamento", pct: 7 },
    { origem: "MT adicional", pct: 2 },
  ],
  "BRR031A030": [{ origem: "Seca/Confinamento", pct: 7 }],
};

// Paleta de cores para diferenciar os produtos do pedido (rotativa)
const CORES_ITEM = [
  "#f97316", // laranja
  "#06b6d4", // ciano
  "#a78bfa", // violeta
  "#f472b6", // rosa
  "#84cc16", // verde-limão
  "#ef4444", // vermelho
  "#14b8a6", // teal
  "#eab308", // âmbar
];
const corItem = (idx) => CORES_ITEM[idx % CORES_ITEM.length];

const ICMS = 0.18; // fixo, incluso na tabela

// Faixas de volume total (kg) -> desconto QTDE e LOGISTICA (por produto)
const FAIXAS = [
  { limite: 1499, qtde: 0, logistica: 0 },
  { limite: 3499, qtde: 0, logistica: 0 },
  { limite: 6999, qtde: 0.07, logistica: 0.01 },
  { limite: 13999, qtde: 0.08, logistica: 0.02 },
  { limite: Infinity, qtde: 0.09, logistica: 0.03 },
];

function faixaPorVolume(volumeKg) {
  return FAIXAS.find((f) => volumeKg <= f.limite) || FAIXAS[FAIXAS.length - 1];
}

const PRAZOS = [
  { nome: "14 dias direto", encargo: 0.0 },
  { nome: "30 dias", encargo: 0.015 },
  { nome: "60 dias", encargo: 0.03 },
  { nome: "90 dias", encargo: 0.045 },
  { nome: "120 dias", encargo: 0.06 },
  { nome: "30/60", encargo: 0.0225 },
  { nome: "30/60/90", encargo: 0.03 },
  { nome: "30/60/90/120", encargo: 0.0375 },
  { nome: "Cartão de crédito 1X", encargo: 0.0205 },
  { nome: "Cartão de crédito 2X", encargo: 0.0206 },
  { nome: "Cartão de crédito 3X", encargo: 0.0381 },
];

const fmt = (n, d = 2) =>
  (isFinite(n) ? n : 0).toLocaleString("pt-BR", { minimumFractionDigits: d, maximumFractionDigits: d });
const fmtMoney = (n) => `R$ ${fmt(n, 2)}`;

// Calcula o preço final por kg de um item aplicando a cascata de descontos.
function calcItem(item, mtTier, encargo, faixaPedido) {
  const preco = item.precoManual != null ? item.precoManual : PRODUTOS[item.produtoIdx][mtTier];
  const volume = item.qtdeSacos * item.pesoSaco;
  // Faixa vem do volume TOTAL do pedido (somado); mas se o usuário digitou %, respeita o manual.
  const qtde = item.qtdePct != null ? item.qtdePct : faixaPedido.qtde;
  const log = item.logisticaPct != null ? item.logisticaPct : faixaPedido.logistica;
  const camp = (item.campanhaPct || 0) / 100;
  const ad2 = (item.ad2Pct || 0) / 100;
  let p = preco * (1 - ICMS);
  p = p * (1 - qtde) * (1 - log) * (1 - camp) * (1 - ad2);
  p = p * (1 + encargo);
  return {
    precoTabela: preco,
    volume,
    faixa: faixaPedido,
    qtdeEfetivo: qtde,
    logEfetivo: log,
    precoKg: p,
    precoSaco: p * item.pesoSaco,
    total: p * item.pesoSaco * item.qtdeSacos,
  };
}

function novoItem(produtoIdx = 0) {
  return {
    id: Math.random().toString(36).slice(2),
    produtoIdx,
    precoManual: null,
    pesoSaco: PRODUTOS[produtoIdx].peso,
    qtdeSacos: 100,
    qtdePct: null,
    logisticaPct: null,
    campanhaPct: 0,
    ad2Pct: 0,
  };
}

// Carrega uma imagem (para uso no canvas)
function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

// Gera imagem PNG do resumo — design executivo, off-white + azul-marinho + dourado champagne
async function gerarImagemOrcamento({ items, calcs, totalSacos, totalKg, totalReais, prazo }) {
  const scale = 2;
  const W = 1000;
  const padX = 60;
  const padY = 50;
  const headerH = 90;
  const rowH = 56;
  const totalBlockH = 90;
  const condH = 90;
  const notaH = 62;
  const gap = 32;
  const tableHeaderH = 42;
  const H = padY + headerH + gap + tableHeaderH + rowH * items.length + gap + totalBlockH + gap + condH + gap + notaH + padY;

  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.textBaseline = "middle";

  // Paleta Grafite Contemporâneo
  const COR = {
    bg: "#f2f2ef",       // branco quebrado
    primary: "#2b2b2b",  // grafite escuro - autoridade sóbria
    accent:  "#c45c3a",  // laranja queimado - accent contemporâneo
    texto: "#1a1a1a",
    cinza: "#7c7c7c",
    linha: "#dcdcd8",    // linha discreta
    zebra: "#e8e8e4",    // zebra suave
  };

  ctx.fillStyle = COR.bg;
  ctx.fillRect(0, 0, W, H);

  const [imgMaisa, imgTortuga] = await Promise.all([loadImage(MAISA_LOGO), loadImage(TORTUGA_LOGO)]);

  // ---- HEADER ----
  const headerY = padY;

  // Coluna esquerda: eyebrow + data + remetente
  ctx.fillStyle = COR.accent;
  ctx.font = "600 11px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("ORÇAMENTO", padX, headerY + 12);

  ctx.fillStyle = COR.texto;
  ctx.font = "600 22px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  const dataFmt = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  ctx.fillText(dataFmt, padX, headerY + 40);

  ctx.fillStyle = COR.cinza;
  ctx.font = "500 11px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("MAIS@ PECUÁRIA ESTRATÉGICA  ·  SINOP/MT", padX, headerY + 68);

  // Coluna direita: logos lado a lado, mesma altura
  const logoH = 40;
  const espaco = 18;
  const tRatio = imgTortuga.width / imgTortuga.height;
  const mRatio = imgMaisa.width / imgMaisa.height;
  const tW = logoH * tRatio;
  const mW = logoH * mRatio;
  const logosTotalW = tW + espaco + mW;
  const logosX = W - padX - logosTotalW;
  const logosY = headerY + (headerH - logoH) / 2 - 5;
  ctx.drawImage(imgTortuga, logosX, logosY, tW, logoH);
  ctx.drawImage(imgMaisa, logosX + tW + espaco, logosY, mW, logoH);

  // Linha divisora dourada elegante
  const dividerY = headerY + headerH;
  ctx.strokeStyle = COR.accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, dividerY);
  ctx.lineTo(W - padX, dividerY);
  ctx.stroke();

  // ---- TABELA ----
  const tableY = dividerY + gap;
  const tableW = W - padX * 2;
  const cols = [
    { label: "Produto", w: 320, align: "left" },
    { label: "Sacos", w: 70, align: "center" },
    { label: "Peso", w: 70, align: "center" },
    { label: "Volume (kg)", w: 100, align: "center" },
    { label: "R$/kg", w: 85, align: "right" },
    { label: "R$/saco", w: 105, align: "right" },
    { label: "Total", w: 0, align: "right" },
  ];
  const fixedW = cols.slice(0, -1).reduce((s, c) => s + c.w, 0);
  cols[cols.length - 1].w = tableW - fixedW;

  // Cabeçalho da tabela
  ctx.fillStyle = COR.cinza;
  ctx.font = "600 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  let cxH = padX;
  cols.forEach((c) => {
    ctx.textAlign = c.align;
    const tx = c.align === "left" ? cxH + 4 : c.align === "right" ? cxH + c.w - 4 : cxH + c.w / 2;
    ctx.fillText(c.label.toUpperCase(), tx, tableY + tableHeaderH / 2 - 4);
    cxH += c.w;
  });

  // Linha dourada abaixo do cabeçalho da tabela
  ctx.strokeStyle = COR.accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, tableY + tableHeaderH);
  ctx.lineTo(W - padX, tableY + tableHeaderH);
  ctx.stroke();

  // Linhas de produtos
  items.forEach((it, idx) => {
    const c = calcs[idx];
    const y = tableY + tableHeaderH + rowH * idx;
    const nome = it.precoManual == null ? PRODUTOS[it.produtoIdx].nome : "Produto avulso";
    const cor = corItem(idx);

    // Zebra suave nas ímpares
    if (idx % 2 === 1) {
      ctx.fillStyle = COR.zebra;
      ctx.fillRect(padX, y, tableW, rowH);
    }

    let cxRow = padX;

    // Bolinha da cor + nome
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(cxRow + 8, y + rowH / 2, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COR.texto;
    ctx.font = "500 15px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    let displayName = nome;
    const maxNameW = cols[0].w - 28;
    while (ctx.measureText(displayName).width > maxNameW && displayName.length > 3) {
      displayName = displayName.slice(0, -1);
    }
    if (displayName !== nome) displayName = displayName.trim() + "…";
    ctx.fillText(displayName, cxRow + 22, y + rowH / 2);
    cxRow += cols[0].w;

    // Números com monospace clean
    ctx.fillStyle = COR.texto;
    ctx.font = "14px 'SF Mono', ui-monospace, Menlo, monospace";
    const cells = [
      { v: fmt(it.qtdeSacos, 0), align: cols[1].align, w: cols[1].w },
      { v: fmt(it.pesoSaco, 0), align: cols[2].align, w: cols[2].w },
      { v: fmt(c.volume, 0), align: cols[3].align, w: cols[3].w },
      { v: fmt(c.precoKg, 2), align: cols[4].align, w: cols[4].w },
      { v: fmtMoney(c.precoSaco), align: cols[5].align, w: cols[5].w },
    ];
    cells.forEach((cell) => {
      ctx.textAlign = cell.align;
      const tx = cell.align === "left" ? cxRow + 4 : cell.align === "right" ? cxRow + cell.w - 4 : cxRow + cell.w / 2;
      ctx.fillText(cell.v, tx, y + rowH / 2);
      cxRow += cell.w;
    });

    // Total do item em marinho, negrito
    ctx.fillStyle = COR.primary;
    ctx.font = "600 15px 'SF Mono', ui-monospace, Menlo, monospace";
    ctx.textAlign = "right";
    ctx.fillText(fmtMoney(c.total), cxRow + cols[6].w - 4, y + rowH / 2);

    // Linha hairline entre linhas
    if (idx < items.length - 1) {
      ctx.strokeStyle = COR.linha;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(padX, y + rowH);
      ctx.lineTo(W - padX, y + rowH);
      ctx.stroke();
    }
  });

  // ---- BLOCO TOTAL DO PEDIDO (à direita) ----
  const totalY = tableY + tableHeaderH + rowH * items.length + gap;

  // Faixa dourada no topo do bloco total, só na metade direita
  ctx.strokeStyle = COR.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(W / 2, totalY);
  ctx.lineTo(W - padX, totalY);
  ctx.stroke();

  ctx.fillStyle = COR.cinza;
  ctx.font = "600 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(
    `TOTAL DO PEDIDO  ·  ${fmt(totalSacos, 0)} SACOS  ·  ${fmt(totalKg, 0)} KG`,
    W - padX,
    totalY + 22
  );

  ctx.fillStyle = COR.primary;
  ctx.font = "700 36px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(fmtMoney(totalReais), W - padX, totalY + 60);

  // ---- CONDIÇÃO DE PAGAMENTO ----
  const condY = totalY + totalBlockH + gap;

  // Bloco com fundo cremoso e barra lateral esquerda dourada
  ctx.fillStyle = COR.zebra;
  ctx.fillRect(padX, condY, W - padX * 2, condH);
  ctx.fillStyle = COR.accent;
  ctx.fillRect(padX, condY, 3, condH);

  ctx.fillStyle = COR.cinza;
  ctx.font = "600 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("CONDIÇÃO DE PAGAMENTO", padX + 24, condY + 28);

  ctx.fillStyle = COR.primary;
  ctx.font = "600 22px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText(prazo, padX + 24, condY + 60);

  // ---- RODAPÉ: CREDENCIAIS + NOTA ----
  const rodapeY = H - padY - notaH;

  // Linha superior dourada fina separando o corpo do rodapé
  ctx.strokeStyle = COR.linha;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(padX, rodapeY - 4);
  ctx.lineTo(W - padX, rodapeY - 4);
  ctx.stroke();

  // Linha 1: credenciais principais
  ctx.fillStyle = COR.primary;
  ctx.font = "600 11px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    "Zootecnista CRMV-MT 01122-ZP  ·  Especialista em Nutrição de Ruminantes",
    W / 2,
    rodapeY + 14
  );

  // Linha 2: função
  ctx.fillStyle = COR.cinza;
  ctx.font = "500 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("Consultor e Representante DSM/Tortuga", W / 2, rodapeY + 32);

  // Linha 3: nota discreta em itálico
  ctx.fillStyle = COR.cinza;
  ctx.font = "italic 9px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText(
    "Preços à vista com 18% de ICMS incluso. Orçamento válido conforme condições comerciais vigentes.",
    W / 2,
    rodapeY + 52
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `orcamento-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, "image/png");
  });
}

// Gera imagem PNG com PARÂMETROS DE COTAÇÃO — versão técnica com toda a cascata de descontos
// para enviar à fábrica cotar o pedido.
async function gerarImagemParametrosCotacao({ items, calcs, totalSacos, totalKg, totalReais, prazo, mtTier, encargo, observacoes }) {
  const scale = 2;
  const W = 1000;
  const padX = 60;
  const padY = 50;
  const headerH = 90;
  const condH = 44;
  const itemH = 118;
  const totalH = 90;
  const notaH = 62;
  const gap = 26;

  // Bloco de observações (só se houver texto). Calcula altura por linhas quebradas.
  const obsText = (observacoes || "").trim();
  const temObs = obsText.length > 0;
  // quebra o texto por largura estimada (~90 chars por linha em 12px)
  const maxCharsPorLinha = 105;
  const obsLinhas = temObs
    ? obsText.split("\n").flatMap((paragrafo) => {
        if (paragrafo.length <= maxCharsPorLinha) return [paragrafo];
        const linhas = [];
        let atual = "";
        paragrafo.split(" ").forEach((palavra) => {
          const test = atual === "" ? palavra : atual + " " + palavra;
          if (test.length > maxCharsPorLinha) {
            linhas.push(atual);
            atual = palavra;
          } else {
            atual = test;
          }
        });
        if (atual) linhas.push(atual);
        return linhas;
      })
    : [];
  const obsH = temObs ? 40 + obsLinhas.length * 18 + 14 : 0;

  const H = padY + headerH + gap + condH + gap + itemH * items.length + gap + totalH + (temObs ? gap + obsH : 0) + gap + notaH + padY;

  const canvas = document.createElement("canvas");
  canvas.width = W * scale;
  canvas.height = H * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.textBaseline = "middle";

  // Paleta Grafite Contemporâneo (mesma do cliente)
  const COR = {
    bg: "#f2f2ef",
    primary: "#2b2b2b",
    accent: "#c45c3a",
    texto: "#1a1a1a",
    cinza: "#7c7c7c",
    linha: "#dcdcd8",
    zebra: "#e8e8e4",
  };

  ctx.fillStyle = COR.bg;
  ctx.fillRect(0, 0, W, H);

  const [imgMaisa, imgTortuga] = await Promise.all([loadImage(MAISA_LOGO), loadImage(TORTUGA_LOGO)]);

  // ---- HEADER ----
  const headerY = padY;

  // eyebrow com tag de "uso interno"
  ctx.fillStyle = COR.accent;
  ctx.font = "600 11px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("PARÂMETROS DE COTAÇÃO", padX, headerY + 12);

  // tag USO INTERNO no canto
  const tagW = 82;
  const tagX = padX + 175;
  ctx.fillStyle = COR.accent;
  ctx.fillRect(tagX, headerY + 3, tagW, 18);
  ctx.fillStyle = "#fff";
  ctx.font = "700 9px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("USO INTERNO", tagX + tagW / 2, headerY + 12);

  ctx.fillStyle = COR.texto;
  ctx.font = "600 22px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "left";
  const dataFmt = new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  ctx.fillText(dataFmt, padX, headerY + 40);

  ctx.fillStyle = COR.cinza;
  ctx.font = "500 11px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("MAIS@ PECUÁRIA ESTRATÉGICA  ·  SINOP/MT", padX, headerY + 68);

  // logos à direita
  const logoH = 40;
  const espaco = 18;
  const tRatio = imgTortuga.width / imgTortuga.height;
  const mRatio = imgMaisa.width / imgMaisa.height;
  const tW = logoH * tRatio;
  const mW = logoH * mRatio;
  const logosTotalW = tW + espaco + mW;
  const logosX = W - padX - logosTotalW;
  const logosY = headerY + (headerH - logoH) / 2 - 5;
  ctx.drawImage(imgTortuga, logosX, logosY, tW, logoH);
  ctx.drawImage(imgMaisa, logosX + tW + espaco, logosY, mW, logoH);

  // Divisor accent
  const div1Y = headerY + headerH;
  ctx.strokeStyle = COR.accent;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padX, div1Y);
  ctx.lineTo(W - padX, div1Y);
  ctx.stroke();

  // ---- CONDIÇÕES GERAIS DO PEDIDO ----
  const condY = div1Y + gap;
  ctx.fillStyle = COR.zebra;
  ctx.fillRect(padX, condY, W - padX * 2, condH);

  ctx.fillStyle = COR.cinza;
  ctx.font = "600 9px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "left";
  const condItems = [
    { label: "TABELA", val: mtTier.toUpperCase() },
    { label: "PRAZO", val: prazo },
    { label: "ENCARGO", val: `${fmt(encargo * 100, 2)}%` },
    { label: "ICMS", val: "18% (incluso)" },
  ];
  const condCellW = (W - padX * 2) / condItems.length;
  condItems.forEach((c, i) => {
    const x = padX + condCellW * i + 16;
    ctx.fillStyle = COR.cinza;
    ctx.font = "600 9px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(c.label, x, condY + 15);
    ctx.fillStyle = COR.texto;
    ctx.font = "600 14px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    ctx.fillText(c.val, x, condY + 32);
  });

  // ---- BLOCOS DE PRODUTOS ----
  const itemsStartY = condY + condH + gap;
  items.forEach((it, idx) => {
    const c = calcs[idx];
    const y = itemsStartY + itemH * idx;
    const nome = it.precoManual == null ? PRODUTOS[it.produtoIdx].nome : "Produto avulso";
    const cod = it.precoManual == null ? PRODUTOS[it.produtoIdx].cod : "manual";
    const cor = corItem(idx);

    // fundo alternado
    if (idx % 2 === 1) {
      ctx.fillStyle = COR.zebra;
      ctx.fillRect(padX, y, W - padX * 2, itemH);
    }

    // bolinha da cor + nome + código
    ctx.fillStyle = cor;
    ctx.beginPath();
    ctx.arc(padX + 12, y + 22, 5, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = COR.texto;
    ctx.font = "700 15px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(nome, padX + 26, y + 22);

    // código à direita do nome
    const nomeW = ctx.measureText(nome).width;
    ctx.fillStyle = COR.cinza;
    ctx.font = "600 10px 'SF Mono', ui-monospace, Menlo, monospace";
    ctx.fillText(`[${cod}]`, padX + 26 + nomeW + 8, y + 22);

    // Linha de bases: sacos × peso = volume · preço tabela
    ctx.fillStyle = COR.texto;
    ctx.font = "13px 'SF Mono', ui-monospace, Menlo, monospace";
    ctx.textAlign = "left";
    const linha1 = `${fmt(it.qtdeSacos, 0)} sacos × ${fmt(it.pesoSaco, 0)} kg = ${fmt(c.volume, 0)} kg    ·    Preço tabela: R$ ${fmt(c.precoTabela, 4)}/kg`;
    ctx.fillText(linha1, padX + 26, y + 48);

    // Linha de descontos aplicados (todos os %)
    ctx.fillStyle = COR.cinza;
    ctx.font = "12px 'SF Mono', ui-monospace, Menlo, monospace";
    const descontos = [
      `ICMS 18%`,
      `Qtde ${fmt(c.qtdeEfetivo * 100, 2)}%`,
      `Logística ${fmt(c.logEfetivo * 100, 2)}%`,
      `Campanha ${fmt(it.campanhaPct || 0, 2)}%`,
      `AD2 ${fmt(it.ad2Pct || 0, 2)}%`,
      `Encargo ${fmt(encargo * 100, 2)}%`,
    ];
    ctx.fillText(descontos.join("  ·  "), padX + 26, y + 70);

    // Linha final destaque: preço final e total (à direita, negrito)
    ctx.fillStyle = COR.accent;
    ctx.font = "700 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("→", padX + 26, y + 96);

    ctx.fillStyle = COR.primary;
    ctx.font = "600 14px 'SF Mono', ui-monospace, Menlo, monospace";
    ctx.fillText(`R$ ${fmt(c.precoKg, 2)}/kg`, padX + 42, y + 96);

    ctx.fillStyle = COR.cinza;
    ctx.font = "13px 'SF Mono', ui-monospace, Menlo, monospace";
    ctx.fillText("·", padX + 42 + ctx.measureText(`R$ ${fmt(c.precoKg, 2)}/kg`).width + 10, y + 96);

    ctx.fillStyle = COR.primary;
    ctx.font = "600 14px 'SF Mono', ui-monospace, Menlo, monospace";
    ctx.fillText(`R$ ${fmt(c.precoSaco, 2)}/saco`, padX + 42 + ctx.measureText(`R$ ${fmt(c.precoKg, 2)}/kg`).width + 22, y + 96);

    // Total do item à direita
    ctx.fillStyle = COR.primary;
    ctx.font = "700 18px 'SF Mono', ui-monospace, Menlo, monospace";
    ctx.textAlign = "right";
    ctx.fillText(fmtMoney(c.total), W - padX - 12, y + 96);

    // Linha separadora entre items
    if (idx < items.length - 1) {
      ctx.strokeStyle = COR.linha;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(padX, y + itemH);
      ctx.lineTo(W - padX, y + itemH);
      ctx.stroke();
    }
  });

  // ---- BLOCO TOTAL DO PEDIDO ----
  const totalY = itemsStartY + itemH * items.length + gap;

  // Divisor accent grosso
  ctx.strokeStyle = COR.accent;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(padX, totalY);
  ctx.lineTo(W - padX, totalY);
  ctx.stroke();

  ctx.fillStyle = COR.cinza;
  ctx.font = "600 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(
    `${items.length} PRODUTO${items.length > 1 ? "S" : ""}  ·  ${fmt(totalSacos, 0)} SACOS  ·  ${fmt(totalKg, 0)} KG`,
    padX,
    totalY + 25
  );

  ctx.fillStyle = COR.cinza;
  ctx.font = "600 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText("TOTAL DO PEDIDO", W - padX, totalY + 25);

  ctx.fillStyle = COR.primary;
  ctx.font = "700 32px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(fmtMoney(totalReais), W - padX, totalY + 60);

  // ---- BLOCO OBSERVAÇÕES INTERNAS (só se houver) ----
  if (temObs) {
    const obsY = totalY + totalH + gap;
    // fundo zebra com barra lateral accent
    ctx.fillStyle = COR.zebra;
    ctx.fillRect(padX, obsY, W - padX * 2, obsH);
    ctx.fillStyle = COR.accent;
    ctx.fillRect(padX, obsY, 3, obsH);

    // label
    ctx.fillStyle = COR.accent;
    ctx.font = "700 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("OBSERVAÇÕES INTERNAS", padX + 20, obsY + 20);

    // linhas do texto
    ctx.fillStyle = COR.texto;
    ctx.font = "500 13px -apple-system, 'Helvetica Neue', Arial, sans-serif";
    obsLinhas.forEach((linha, i) => {
      ctx.fillText(linha, padX + 20, obsY + 44 + i * 18);
    });
  }

  // ---- RODAPÉ (mesmo do cliente) ----
  const rodapeY = H - padY - notaH;

  ctx.strokeStyle = COR.linha;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(padX, rodapeY - 4);
  ctx.lineTo(W - padX, rodapeY - 4);
  ctx.stroke();

  ctx.fillStyle = COR.primary;
  ctx.font = "600 11px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(
    "Zootecnista CRMV-MT 01122-ZP  ·  Especialista em Nutrição de Ruminantes",
    W / 2,
    rodapeY + 14
  );

  ctx.fillStyle = COR.cinza;
  ctx.font = "500 10px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText("Consultor e Representante DSM/Tortuga", W / 2, rodapeY + 32);

  ctx.fillStyle = COR.cinza;
  ctx.font = "italic 9px -apple-system, 'Helvetica Neue', Arial, sans-serif";
  ctx.fillText(
    "Documento interno para cotação. Preços à vista com 18% de ICMS incluso.",
    W / 2,
    rodapeY + 52
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cotacao-parametros-${new Date().toISOString().slice(0, 10)}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      resolve();
    }, "image/png");
  });
}


function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="block text-[11px] uppercase tracking-[0.12em] text-stone-400 mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-[11px] text-stone-500 mt-1">{hint}</span>}
    </label>
  );
}

function PctInput({ value, onChange, auto }) {
  const hasAutoMode = auto !== undefined;
  return (
    <div className="relative">
      <input
        type="number"
        step="0.01"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className={`w-full border rounded-md px-3 py-2.5 pr-9 font-mono text-[15px] focus:outline-none focus:border-[#c9a227] focus:ring-1 focus:ring-[#c9a227]/40 transition-colors ${
          hasAutoMode && auto
            ? "bg-[#1c2a22]/60 border-[#c9a227]/40 text-[#c9a227]"
            : hasAutoMode && !auto
            ? "bg-[#1c2a22] border-orange-500 text-orange-300"
            : "bg-[#1c2a22] border-[#33453a] text-[#f2ede1]"
        }`}
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 text-[13px] font-mono">%</span>
      {hasAutoMode && (
        <span
          className={`absolute -top-1.5 right-9 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${
            auto ? "bg-[#c9a227] text-[#14201a]" : "bg-orange-500 text-white"
          }`}
        >
          {auto ? "auto" : "manual"}
        </span>
      )}
    </div>
  );
}

function ItemCard({ item, index, mtTier, encargo, faixaPedido, volumeTotalPedido, onChange, onRemove, canRemove }) {
  const c = calcItem(item, mtTier, encargo, faixaPedido);
  const prod = PRODUTOS[item.produtoIdx];
  const set = (patch) => onChange({ ...item, ...patch });
  const cor = corItem(index);

  return (
    <section
      className="bg-[#1c2a22] border border-[#33453a] rounded-xl p-4 space-y-4"
      style={{ borderLeft: `4px solid ${cor}` }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-[12px] font-bold uppercase tracking-wide flex items-center gap-2" style={{ color: cor }}>
          <span className="inline-block w-2 h-2 rounded-full" style={{ background: cor }} />
          Produto {index + 1}
        </h3>
        {canRemove && (
          <button onClick={onRemove} className="text-[11px] text-stone-400 hover:text-red-400 underline underline-offset-2">
            remover
          </button>
        )}
      </div>

      {item.precoManual == null ? (
        <Field label="Produto">
          <select
            value={item.produtoIdx}
            onChange={(e) => {
              const idx = parseInt(e.target.value);
              set({ produtoIdx: idx, pesoSaco: PRODUTOS[idx].peso });
            }}
            className="w-full bg-[#1c2a22] border border-[#33453a] rounded-md px-3 py-2.5 text-[#f2ede1] text-[15px] focus:outline-none focus:border-[#c9a227]"
          >
            {CATEGORIAS.map((cat) => (
              <optgroup key={cat} label={cat}>
                {PRODUTOS.map((p, i) => (p.cat === cat ? <option key={p.cod} value={i}>{p.nome}</option> : null))}
              </optgroup>
            ))}
          </select>
        </Field>
      ) : (
        <Field label="Preço tabela (R$/kg) — manual">
          <input
            type="number"
            step="0.0001"
            value={item.precoManual}
            onChange={(e) => set({ precoManual: parseFloat(e.target.value) || 0 })}
            className="w-full bg-[#1c2a22] border border-[#33453a] rounded-md px-3 py-2.5 mono text-[15px] focus:outline-none focus:border-[#c9a227]"
          />
        </Field>
      )}

      <div className="flex items-center justify-between bg-[#14201a] rounded-md px-3 py-2 border border-[#2a3830]">
        <span className="text-[12px] text-stone-400">
          Preço tabela {item.precoManual == null ? `(${prod.cod})` : ""}
        </span>
        <div className="flex items-center gap-2">
          <span className="mono text-[14px] text-[#c9a227] font-semibold">{fmtMoney(c.precoTabela)}/kg</span>
          <button
            onClick={() => set({ precoManual: item.precoManual == null ? c.precoTabela : null })}
            className="text-[10px] text-stone-500 underline underline-offset-2"
          >
            {item.precoManual == null ? "manual" : "lista"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Peso do saco (kg)">
          <input
            type="number"
            step="0.5"
            value={item.pesoSaco}
            onChange={(e) => set({ pesoSaco: parseFloat(e.target.value) || 0 })}
            className="w-full bg-[#1c2a22] border border-[#33453a] rounded-md px-3 py-2.5 mono text-[15px] focus:outline-none focus:border-[#c9a227]"
          />
        </Field>
        <Field label="Qtde. de sacos">
          <input
            type="number"
            step="1"
            value={item.qtdeSacos}
            onChange={(e) => set({ qtdeSacos: parseFloat(e.target.value) || 0 })}
            className="w-full bg-[#1c2a22] border border-[#33453a] rounded-md px-3 py-2.5 mono text-[15px] focus:outline-none focus:border-[#c9a227]"
          />
        </Field>
      </div>

      <div className="flex items-center justify-between bg-[#14201a] rounded-md px-3 py-2 border border-[#2a3830]">
        <span className="text-[12px] text-stone-400">Volume</span>
        <span className="mono text-[13px] text-stone-300">{fmt(c.volume, 0)} kg</span>
      </div>

      {/* Descontos por item */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Qtde." hint={`faixa: ${fmt(volumeTotalPedido, 0)} kg (pedido)`}>
          <PctInput value={(c.qtdeEfetivo * 100).toFixed(2)} auto={item.qtdePct == null} onChange={(v) => set({ qtdePct: v / 100 })} />
        </Field>
        <Field label="Logística">
          <PctInput value={(c.logEfetivo * 100).toFixed(2)} auto={item.logisticaPct == null} onChange={(v) => set({ logisticaPct: v / 100 })} />
        </Field>
      </div>
      {(item.qtdePct != null || item.logisticaPct != null) && (
        <button onClick={() => set({ qtdePct: null, logisticaPct: null })} className="text-[11px] text-[#c9a227] underline underline-offset-2">
          voltar ao automático
        </button>
      )}

      {/* Chips de campanhas Agosto/2026 disponíveis para este produto */}
      {item.precoManual == null && CAMPANHAS_SETEMBRO_2026[prod.cod] && (
        <div className="space-y-1.5">
          <div className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold">
            Campanhas Setembro/26 · toque para somar
          </div>
          <div className="flex flex-wrap gap-1.5">
            {CAMPANHAS_SETEMBRO_2026[prod.cod].map((c, i) => (
              <button
                key={i}
                onClick={() => set({ campanhaPct: (parseFloat(item.campanhaPct) || 0) + c.pct })}
                className="text-[11px] font-mono bg-[#c45c3a]/15 hover:bg-[#c45c3a]/30 border border-[#c45c3a]/50 text-[#f4a97c] rounded-md px-2 py-1 transition-colors"
              >
                +{c.pct}% <span className="text-stone-400">{c.origem}</span>
              </button>
            ))}
            {(parseFloat(item.campanhaPct) || 0) > 0 && (
              <button
                onClick={() => set({ campanhaPct: 0 })}
                className="text-[11px] text-stone-500 hover:text-red-400 underline underline-offset-2 px-1"
              >
                limpar
              </button>
            )}
          </div>
        </div>
      )}

      {/* AD2 e Campanha - variam por item */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Campanha" hint="por item">
          <PctInput value={item.campanhaPct} onChange={(v) => set({ campanhaPct: v })} />
        </Field>
        <Field label="AD2" hint="por item">
          <PctInput value={item.ad2Pct} onChange={(v) => set({ ad2Pct: v })} />
        </Field>
      </div>

      <div className="flex items-center justify-between border-t border-[#33453a] pt-3">
        <span className="text-[12px] uppercase tracking-wide text-stone-400">Subtotal</span>
        <div className="text-right">
          <div className="mono text-[15px] text-[#f2ede1] font-bold">{fmtMoney(c.total)}</div>
          <div className="mono text-[11px] text-stone-500">{fmtMoney(c.precoKg)}/kg · {fmtMoney(c.precoSaco)}/saco</div>
        </div>
      </div>
    </section>
  );
}

export default function PriceCalculator() {
  const [items, setItems] = useState([novoItem(0)]);
  const [mtTier, setMtTier] = useState("mt1");
  const [prazoIdx, setPrazoIdx] = useState(0);
  const [encargoManual, setEncargoManual] = useState(null);
  const [observacoes, setObservacoes] = useState("");
  const [obsAberto, setObsAberto] = useState(false);

  const encargo = encargoManual == null ? PRAZOS[prazoIdx].encargo : encargoManual;

  // Volume total do pedido = soma do volume de cada item. É esse volume que enquadra a faixa
  // de desconto de qtde e logística — a mesma faixa vale para TODOS os produtos do pedido.
  const volumeTotalPedido = items.reduce((s, it) => s + (it.qtdeSacos || 0) * (it.pesoSaco || 0), 0);
  const faixaPedido = faixaPorVolume(volumeTotalPedido);

  const calcs = useMemo(
    () => items.map((it) => calcItem(it, mtTier, encargo, faixaPedido)),
    [items, mtTier, encargo, faixaPedido]
  );

  const totalSacos = items.reduce((s, it) => s + (it.qtdeSacos || 0), 0);
  const totalKg = calcs.reduce((s, c) => s + c.volume, 0);
  const totalReais = calcs.reduce((s, c) => s + c.total, 0);

  const updateItem = (id, next) => setItems((prev) => prev.map((it) => (it.id === id ? next : it)));
  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
  const addItem = () => setItems((prev) => [...prev, novoItem(0)]);

  return (
    <div className="min-h-screen bg-[#14201a] text-[#f2ede1] pb-44" style={{ fontFamily: "'IBM Plex Sans', ui-sans-serif, system-ui" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&display=swap');
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { opacity: 0.4; }
        .mono { font-family: 'IBM Plex Mono', ui-monospace, monospace; }
      `}</style>

      {/* Header - orçamento para cliente */}
      <div className="relative bg-[#1c2a22] border-b border-[#33453a] px-5 pt-6 pb-5">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 flex items-center rounded overflow-hidden">
            <img src={MAISA_LOGO} alt="Mais@ Pecuária Estratégica" className="h-10 w-auto object-contain" />
          </div>
          <span className="text-stone-600 text-base font-light">×</span>
          <div className="h-10 flex items-center bg-white rounded px-2">
            <img src={TORTUGA_LOGO} alt="Tortuga" className="h-7 w-auto object-contain" />
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-[0.2em] text-[#c9a227] font-semibold mb-1">Orçamento de Ração</div>
          <h1 className="text-2xl font-bold tracking-tight leading-none">Formação de Preço</h1>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-5">
        {/* Condições comerciais (valem para todos os itens) */}
        <section className="bg-[#1c2a22] border border-[#33453a] rounded-xl p-4 space-y-4">
          <h2 className="text-[13px] font-semibold uppercase tracking-wide text-stone-300">Condições do pedido</h2>
          <Field label="Tabela de preço (todos os produtos)">
            <div className="grid grid-cols-3 gap-2">
              {["mt1", "mt2", "mt3"].map((t) => (
                <button
                  key={t}
                  onClick={() => setMtTier(t)}
                  className={`rounded-md py-2 text-[13px] font-semibold uppercase mono border transition-colors ${
                    mtTier === t ? "bg-[#c9a227] text-[#14201a] border-[#c9a227]" : "bg-[#14201a] text-stone-400 border-[#33453a]"
                  }`}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>
          </Field>
          <Field label="Condição de pagamento">
            <select
              value={prazoIdx}
              onChange={(e) => { setPrazoIdx(parseInt(e.target.value)); setEncargoManual(null); }}
              className="w-full bg-[#1c2a22] border border-[#33453a] rounded-md px-3 py-2.5 text-[#f2ede1] text-[15px] focus:outline-none focus:border-[#c9a227]"
            >
              {PRAZOS.map((p, i) => (
                <option key={p.nome} value={i}>{p.nome} — encargo {fmt(p.encargo * 100, 2)}%</option>
              ))}
            </select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="ICMS" hint="fixo, incluso na tabela">
              <div className="w-full bg-[#14201a] border border-[#2a3830] rounded-md px-3 py-2.5 mono text-[15px] text-stone-400 flex items-center justify-between">
                <span>{fmt(ICMS * 100, 0)} %</span>
                <span className="bg-stone-600/30 text-stone-400 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm">fixo</span>
              </div>
            </Field>
            <Field label="Encargo aplicado">
              <PctInput value={(encargo * 100).toFixed(2)} auto={encargoManual == null} onChange={(v) => setEncargoManual(v / 100)} />
            </Field>
          </div>
        </section>

        {/* Itens do pedido */}
        {items.map((it, idx) => (
          <ItemCard
            key={it.id}
            item={it}
            index={idx}
            mtTier={mtTier}
            encargo={encargo}
            faixaPedido={faixaPedido}
            volumeTotalPedido={volumeTotalPedido}
            onChange={(next) => updateItem(it.id, next)}
            onRemove={() => removeItem(it.id)}
            canRemove={items.length > 1}
          />
        ))}

        {/* Botão adicionar produto */}
        <button
          onClick={addItem}
          className="w-full border-2 border-dashed border-[#33453a] hover:border-[#c9a227] rounded-xl py-3.5 text-[14px] font-semibold text-[#c9a227] transition-colors flex items-center justify-center gap-2"
        >
          <span className="text-xl leading-none">+</span> Adicionar produto
        </button>

        {/* Observações internas (só aparece na cotação, não no cliente) */}
        {!obsAberto && observacoes.trim() === "" ? (
          <button
            onClick={() => setObsAberto(true)}
            className="w-full border border-dashed border-[#33453a] hover:border-orange-500 rounded-xl py-3 text-[13px] font-semibold text-stone-400 hover:text-orange-400 transition-colors flex items-center justify-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Adicionar observações internas
            <span className="text-[9px] font-normal uppercase tracking-wider bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded-sm">uso interno</span>
          </button>
        ) : (
          <section className="bg-[#1c2a22] border border-[#33453a] rounded-xl p-4 space-y-3" style={{ borderLeft: "4px solid #c45c3a" }}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="text-[12px] font-bold uppercase tracking-wide text-orange-400">Observações internas</h3>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-orange-500/20 text-orange-300 px-1.5 py-0.5 rounded-sm">uso interno</span>
              </div>
              <button
                onClick={() => { setObsAberto(false); }}
                className="text-[11px] text-stone-400 hover:text-red-400 underline underline-offset-2"
              >
                esconder
              </button>
            </div>
            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Ex: Chapa, carga em palete, entrega direta na fazenda, cliente pediu nota fracionada, etc."
              rows={4}
              className="w-full bg-[#14201a] border border-[#33453a] rounded-md px-3 py-2.5 text-[#f2ede1] text-[13px] focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/40 transition-colors resize-none placeholder:text-stone-500"
            />
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-stone-500">
                Aparece apenas na imagem de Parâmetros Cotação
              </span>
              {observacoes.trim() !== "" && (
                <button
                  onClick={() => { setObservacoes(""); }}
                  className="text-[11px] text-stone-500 hover:text-red-400 underline underline-offset-2"
                >
                  limpar
                </button>
              )}
            </div>
          </section>
        )}

        {/* Resumo do pedido para o cliente */}
        <section id="resumo-pedido" className="bg-[#f2f2ef] text-[#1a1a1a] rounded-xl p-5" style={{ border: "1px solid #dcdcd8" }}>
          {/* Cabeçalho executivo */}
          <div className="flex items-start justify-between gap-3 pb-4 mb-4" style={{ borderBottom: "1px solid #c45c3a" }}>
            <div>
              <div className="text-[9px] uppercase font-bold tracking-[0.2em]" style={{ color: "#c45c3a" }}>Orçamento</div>
              <div className="text-[15px] font-bold mt-1" style={{ color: "#1a1a1a" }}>
                {new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}
              </div>
              <div className="text-[9px] mt-1 font-medium" style={{ color: "#7c7c7c" }}>
                MAIS@ PECUÁRIA ESTRATÉGICA · SINOP/MT
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <img src={TORTUGA_LOGO} alt="Tortuga" className="h-7 w-auto object-contain" />
              <img src={MAISA_LOGO} alt="Mais@" className="h-7 w-auto object-contain" />
            </div>
          </div>

          {/* Tabela */}
          <div className="-mx-5 overflow-x-auto">
            <div className="px-5 min-w-[560px]">
              <table className="w-full text-[11px] border-collapse">
                <thead>
                  <tr style={{ borderBottom: "1px solid #c45c3a" }}>
                    <th className="text-left py-2.5 pr-2 font-bold uppercase tracking-wider text-[9px]" style={{ color: "#7c7c7c" }}>Produto</th>
                    <th className="text-center py-2.5 px-1 font-bold uppercase tracking-wider text-[9px]" style={{ color: "#7c7c7c" }}>Sacos</th>
                    <th className="text-center py-2.5 px-1 font-bold uppercase tracking-wider text-[9px]" style={{ color: "#7c7c7c" }}>Peso</th>
                    <th className="text-center py-2.5 px-1 font-bold uppercase tracking-wider text-[9px]" style={{ color: "#7c7c7c" }}>Vol.</th>
                    <th className="text-right py-2.5 px-1 font-bold uppercase tracking-wider text-[9px]" style={{ color: "#7c7c7c" }}>R$/kg</th>
                    <th className="text-right py-2.5 px-1 font-bold uppercase tracking-wider text-[9px]" style={{ color: "#7c7c7c" }}>R$/saco</th>
                    <th className="text-right py-2.5 pl-2 font-bold uppercase tracking-wider text-[9px]" style={{ color: "#7c7c7c" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it, idx) => {
                    const c = calcs[idx];
                    const nome = it.precoManual == null ? PRODUTOS[it.produtoIdx].nome : "Produto avulso";
                    return (
                      <tr key={it.id} style={{ background: idx % 2 === 1 ? "#e8e8e4" : "transparent", borderBottom: "1px solid #dcdcd8" }}>
                        <td className="py-3 pr-2 font-sans text-[12px] font-medium" style={{ color: "#1a1a1a" }}>
                          <span className="inline-flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ background: corItem(idx) }} />
                            {nome}
                          </span>
                        </td>
                        <td className="py-3 px-1 text-center mono" style={{ color: "#1a1a1a" }}>{fmt(it.qtdeSacos, 0)}</td>
                        <td className="py-3 px-1 text-center mono" style={{ color: "#1a1a1a" }}>{fmt(it.pesoSaco, 0)}</td>
                        <td className="py-3 px-1 text-center mono" style={{ color: "#1a1a1a" }}>{fmt(c.volume, 0)}</td>
                        <td className="py-3 px-1 text-right mono" style={{ color: "#1a1a1a" }}>{fmt(c.precoKg, 2)}</td>
                        <td className="py-3 px-1 text-right mono" style={{ color: "#1a1a1a" }}>{fmt(c.precoSaco, 2)}</td>
                        <td className="py-3 pl-2 text-right mono font-bold" style={{ color: "#2b2b2b" }}>{fmtMoney(c.total)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bloco Total do Pedido (à direita) */}
          <div className="mt-5 flex justify-end">
            <div className="text-right pl-6" style={{ borderTop: "2px solid #c45c3a", paddingTop: "12px", minWidth: "60%" }}>
              <div className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: "#7c7c7c" }}>
                Total do pedido · {fmt(totalSacos, 0)} sacos · {fmt(totalKg, 0)} kg
              </div>
              <div className="mono font-bold text-[22px] mt-1" style={{ color: "#2b2b2b" }}>
                {fmtMoney(totalReais)}
              </div>
            </div>
          </div>

          {/* Condição de pagamento — bloco discreto com barra dourada */}
          <div className="mt-5 pl-4 py-3" style={{ background: "#e8e8e4", borderLeft: "3px solid #c45c3a" }}>
            <div className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: "#7c7c7c" }}>
              Condição de pagamento
            </div>
            <div className="text-[15px] font-bold mt-0.5" style={{ color: "#2b2b2b" }}>
              {PRAZOS[prazoIdx].nome}
            </div>
          </div>

          {/* Rodapé com credenciais e nota */}
          <div className="mt-5 pt-4 text-center" style={{ borderTop: "1px solid #dcdcd8" }}>
            <div className="text-[10px] font-bold" style={{ color: "#2b2b2b" }}>
              Zootecnista CRMV-MT 01122-ZP · Especialista em Nutrição de Ruminantes
            </div>
            <div className="text-[9px] mt-1 font-medium" style={{ color: "#7c7c7c" }}>
              Consultor e Representante DSM/Tortuga
            </div>
            <div className="text-[8px] italic mt-2" style={{ color: "#7c7c7c" }}>
              Preços à vista com 18% de ICMS incluso. Orçamento válido conforme condições comerciais vigentes.
            </div>
          </div>
        </section>

        {/* Botões exportar - duas imagens diferentes */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() =>
              gerarImagemOrcamento({
                items,
                calcs,
                totalSacos,
                totalKg,
                totalReais,
                prazo: PRAZOS[prazoIdx].nome,
              }).catch((e) => alert("Erro ao gerar imagem: " + e.message))
            }
            className="bg-[#c9a227] hover:bg-[#d4b13e] text-[#14201a] rounded-xl py-3.5 text-[12px] font-bold uppercase tracking-wide transition-colors flex flex-col items-center justify-center text-center px-2"
          >
            <span>Orçamento Cliente</span>
            <span className="text-[9px] font-normal opacity-70 normal-case mt-0.5">imagem para envio</span>
          </button>
          <button
            onClick={() =>
              gerarImagemParametrosCotacao({
                items,
                calcs,
                totalSacos,
                totalKg,
                totalReais,
                prazo: PRAZOS[prazoIdx].nome,
                mtTier,
                encargo,
                observacoes,
              }).catch((e) => alert("Erro ao gerar imagem: " + e.message))
            }
            className="bg-[#1c2a22] border-2 border-[#c9a227] hover:bg-[#c9a227]/10 text-[#c9a227] rounded-xl py-3.5 text-[12px] font-bold uppercase tracking-wide transition-colors flex flex-col items-center justify-center text-center px-2"
          >
            <span>Parâmetros Cotação</span>
            <span className="text-[9px] font-normal opacity-70 normal-case mt-0.5">com todos os descontos</span>
          </button>
        </div>
      </div>

      {/* Sticky total */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0f1811] border-t border-[#33453a] px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-stone-400">Total do pedido</div>
            <div className="text-[11px] text-stone-500 mono">{fmt(totalSacos, 0)} sacos · {fmt(totalKg, 0)} kg</div>
          </div>
          <div className="mono text-2xl font-bold text-[#c9a227]">{fmtMoney(totalReais)}</div>
        </div>
      </div>
    </div>
  );
}
