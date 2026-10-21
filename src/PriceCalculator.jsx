import React, { useState, useMemo, useEffect, useId, useRef } from "react";
import "./PriceCalculator.css";
import GRUPOS_PRODUTOS from "./linhas-produtos.json";

const TORTUGA_LOGO = "data:image/jpeg;base64,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";
const MAISA_LOGO = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsICAoIBwsKCQoNDAsNERwSEQ8PESIZGhQcKSQrKigkJyctMkA3LTA9MCcnOEw5PUNFSElIKzZPVU5GVEBHSEX/2wBDAQwNDREPESESEiFFLicuRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUVFRUX/wAARCABcAPADASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAABgcABQMECAEC/8QARxAAAQMDAQUDCQQHBgUFAAAAAQIDBAAFEQYHEiExQRMUUSI2YXFzgZGhsjVSscEVIzJCcnTRFhdTVWKiJTNDY5KTlNLh8f/EABkBAAMBAQEAAAAAAAAAAAAAAAABAgMEBf/EACMRAAICAgICAgMBAAAAAAAAAAABAhEDEiExIjITQTNCUWH/2gAMAwEAAhEDEQA/ABfRoB1jaQRkduOddA9k39xPwFc/aL88bT7cfga6DrfP7IxxdGNcdlxCkKbQUqGCN0cRXON4t6rVeJkFf/QdUgekZ4fLFdGsSESUFTZyEqUg+gg4NKHavbO66gZnJGETGsKP+tPD8MUYHUqHlVqwDoz2YWoXDVAkOJ3mobZcORw3jwT+Z91BlObZXa+56bXMWnDk1wqH8CeA/M1tldRMcauQbdk39xPwFVWqIyHtL3RAQnJjLxw9Gas+8I7yGM/rCjfx6M4rUvv2Bcf5Zz6TXGuzqfRzeOVfVfKeQrKww7JeSzHaW66o4ShCSSfdXonEfFeUVw9m+pJaQow0MJP+M4En4DJrM/sv1G0klDUd7HRDwz88VG8f6VpL+AdUrduNon2l4NXCI7HUeW+ngfUeRrSq07J6Hxs/abOiradxOSlRJxz8o0HbX0JTcLXupA/VL5D0iqezWbWcq1MPWl2QmEsEtBMkIGM9Bnxqr1LAvsGQwnUCnVOqSS0XHQ5wzxxgmueMKndm0pXGqKSpXqUqWoJQkqUo4AAySaJ4GzzUU9sOCEGEHiDIWEH4c63ckuzFJvoF6lF0jZlqSOgqTGZex0aeGfnihiZCk2+QqPMjuMPJ5ocTg0lJPpjcWuzClKlrShCSpSjgJAySaPbLspuE1lL1zkphJUMhoJ31+/oK+dldnROvj095IUiEgbgP31cj7hmjDXOt/wCzaEw4IQ5cHU73l8UtJ8SOpPQVlOcttYmkYqtpFaNkFvxxucon+BNe/wBz9v8A8zlf+CaAH9X6hmu5XdZRUo8Etq3R7gK2u01mWu13rz2fPPl0tZruQ7h/A0/uft/+Zyv/AATVJe9lU6Cwp62SRNCRktKTurx6OhoWTqW/NO4F1mhYOMF1WQfVTB0Lr6TPnJtN6UFPr4MvkbpUfuqHj6aH8kebsFo+KoVSkqQopWkpUk4IPAg180d7VLM3AvjM9hO6iaklYH3xzPvGKBK2jLZWZSVOiVKlSqEXmjPPG0/zA/A10HXPmi/PG0/zA/A10HXJn9kdGHoE9JXLtbzqK3KV5TE1TiR/pVz+Y+dYdp1s7/pRx9KcuQ1h0fw8lfI591Clpuf6N2uTUqVhuVIWwr38vmBTWmxUToT8V0ZQ82ptXqIxUy8ZJlLyTRzXHjuSpLUdoZcdWEJHpJxXSVuhN263RobQ8hhtKB7hSb0BY1u63Db6eFuK1uZ+8Duj58fdTlnzW7fAkS3ThDDaln3CrzO2kicSpWDlpuf6Q2g3ltJy3EjNsj15JPzPyq7v3m/cf5Zz6TS72USHJl9vMl05ceQlaj6SommJfvN+4/yzn0ms5KpUXF3Gzm8HyRT60TpiPp+ztLLaTOfQFvOkcePHdHgBSFTwwaN4u0bVMlxDEVLTzmMBKI+8T8K6MsZSVIwxySfIxNR64tem3hHkFx+URvdi0OKR6SeAqvs+0603Sa3FdaeiOOq3UKcwUk+BI5UByNHasvs16fItxDz6t5RcWlHyJ4V9I2a6lQtCu7NcCDwfTkcaz0xpcvkved8IcV0tcW8wHYc1oONODHHmk+I8DXPF1gLtV1lQXDlUdwoz4gcj8MV0mngkD0Ugteeet09oPpFGB80PKuLG3oHzJtfsz9RoK2wfaVr9iv6hRroHzJtfsz9RoJ2w/aVr9iv6hUw/IOfoXGzLS8eNbG7zJbC5UjJaKhns0cuHpNEepdW27S7bZmb63ncltlsZJA6+gVq7PrmzcdJQ0NqHaxk9i4nqkjl8RX1q7RcbVSGlqfVHlMgpQ4kZBB6EVLdz8hriPiaVm2mWe6ykRnUvQ3XDuoLwG6T4ZHL31t6+ske7aZlOrQO8REF1pY5jHEj1EUv5+yy+xAVRVR5aR0bXuq+B/rVXddQ6pjpct90ly2gpO6ppxITvJ+HEVooRbTgyHN1UkGmx4D9G3M44l5A/20CahefvusZvZpLjr0ktNJ9R3QPlR7sf+zLn7dP01S6Dgol7RJzrgBEVTzif4ivdH4mqupSYmrjFB5pXRsHTcRCihD09Q/WSFDJz4J8BUla+07EmGM7cUlaThRQhSkpPrAxWttHu7tp0s53dRQ9KWGQocwDknHuGPfSN5Cohj+TykypT04R0S3aLPPnsXpuOw8/ufq304IUD18CfTSp13OQ1tDL8UBKoymt5Q6rGCfxA91M7SET9FaPt7bwKShntF56Z8o/jSOkSF3fUC31cVSpOfirhTxLlhkfCGNtgwq32pX/dX9IpVU1dsGBb7Un/ALq/pFKmtcPoZ5PY9rypUrUzLzRfnjafbj866DrnzRfnlafbj8DXQdcmf2OjD0c+aqdWxrO5utnC25ZUk+BByKe1ouCLraYk5sjdfaC/UccR8aQ2rvO67fzKqZGye6d6sT8BZyuI5lI/0K4/jmqyxuCYsb8mgltVhbtt5u09OMz3EqAHMAJ4/PJod2qXbuenm4KFYcmrwf4E8T88CjukbtJu36S1W80hWWoaQyn181fPh7qzxLaXJeR6xLrY/wDaV09ij8TTIv3m/cv5Zz6TS42P/aF09kj8TTF1Crc07cj4RnPpNPL+QUPQ59tFtevFzjQI/wDzH1hIJ5JHU+4V0BYrBB0/BTGgtAHHlukeU4fEmk1s7lNRNZQFPYCV7zYJ6KKSBT4qs7d0LElVgXqDaVbrJMchsMOTJDRwvcIShJ8M9aoDtekuOJS3aWk5UB5TxP5UN6h0ZeoN4kBMJ+S044pTbrSSsKBOeOORq10ts3uEuY1JvDSokRtQUW1ftuY6Y6D101HGo2xbTbocSTkA0g9eeet09oPpFPwcuHKkHrzz1untB9IqcHsVl6G1oHzJtfsz9RoJ2wfaVr9iv6hRtoHzKtfsz9RoJ2w/aVs9iv6hSh+QJegD2m9zrHLEm3SVMuclAcUqHgR1o9t2151ISm5W1K/FyOvB+B/rRlpJu3zdLW15qMwR2CUq/VgneHA594oN1js5uEm7Pz7Mht1p87ymN4JUhXXGeBFXtCTqSJ1lFWmGNj1xZb+8liM+puSrky8ndUfV0Pxrd1FYIuobU7EkoG/glpzHlNq6EGltpbZ3ekXqLLuLQiR47gcPlgqURxAAFNmXKahRHpT6glplBWonoBWU0oy8WaRba8gA2RIU1AuraxhSJCUkeBxiqXRk5Nq2kzo0g7veXHWcnoreyPw+dbGyy8oN8uURw7pm5fbB8QTkfA/KsO0fS0yLd13uA0tUZ4hbim/2mljrw6HAOa1/dp/Zn+qa+hgau06nU1kXDDgaeSoONLI4BQ8fQQTQFYtlc8XJty8OMoitKCihpe8XMdOXAVjtO1mZEjJZuUREwoGA6le4o+vhgmpd9rM2XGUzbYiIZUMF1S99Q9XDANKMckfFDcoPljWfbRMhPx0LG64hTRKTnd4Y+VLrS2zKVbr23MurzKmYyt5pDRJ7RQ5E+A60JaY1zP02txAxKjOqK1tOq47x5kHoavbrtZnSo5atsNERShguqXvqHq4YoWOcbSBzhLlmPaxdkS7zGgMrChDQS5g8lq6e4AfGgGvpxxbrinHFKWtZKlKUcknxNfNdEY6qjGT2dkqVKlUSWWnrg1atQQZ0gKLMd0LWEDJx6Kav97Fh/wAKZ/6Q/rSYqVnLHGXLLjNx4RYX6c1c77OmsBQafeK0hQwcHxq00TqRvTF6VJkJcXGdaLbiWxk+IOPWPnQ3UqnFNUTbTscTu1myhlfZMSy5undCmxgnHDrSgedW+8486reccUVqPiScmvipShCMehym5dhdoHVELTEqa5PQ8pL6EpT2Sc8QTzorvG02yzrPNiMtS+1fZU2nebAGSMceNKapSeKMnY1NpUepKkKSpJKVJOQQcEGmhp3aqymMiPfmnA4gY7y0neCv4h4+qldUpygpdijJx6Hk5tL00hveE1xZ+6llWfwoL1RtNkXRhyHaWlRY6wQt1R/WKHgMfsigGpURwxRTySY4I21ayNRmm1MTN5CAk4QOg9dLTU1zZvOoZk+MlaWn1hSQsYPIDjVVUqo44xdoTm5KmNDS20W0WbTsOBKblF5hJSooQCDxJ4cfTQ5r7VELU82G7BQ8lLDakq7VIGSSDw4+ihKpQscU9gc21QS6U1pM0w4ptCBIhuHeWwo4wfFJ6GmNE2paffQC8uRGV1StonHvGaSlSiWKMuQjka6HZK2o6eYQSyuRIV0ShojPvOKX2q9eTdSo7q233WDnPZA5Uvw3j+VClSiOKMeRyySZmhy34EtqVFcLb7KgpCx0NNqybVLZKjpReELiSAMKUlBU2r08OI9VJ+pTnBT7JjJx6HW5qnQriypxUFajxJMMkn/bXz/aXQXhA/8AZn/40lqlR8K/pfyscytUaCAJ3IZx0EE8f9tKvUEuFOvkqTbI/d4i1ZbbxjpxOOmTxxVbUqo41HkmU3IlSpUxWhBKlSpQBkZb7d9toHBcWE58MnFGsnZt3aWIa9QW9MxYyhhzKVKzyoOgfaMX2yPqFM/WlmtMrVbcy531mEG20b7G6S4QCSCPXWU5NNJM0gk0LS62uVZri7Bmo3H2jxAOQQeRB8K0xxplxlW/Wmsbhc1NIXCt8UdmiQd1LhGcFfgOfyrBeY8Gbpqc5PcsTc+OAuKq3OJBUOqCOtCyfTE4faF2a9o9nOxNFWe1NsWuJMmTme3eelo38A48keHOsNlRBulk1ZO/R0dkpaStpASCGTg/sk8uNPf7oNP9AerKz22PcHJBmTm4TDDRcK18So9EpTnJJq9hw4qtltwlqjtGSiYlKXikb4GUcAfDjV5pyNKbYtrMmy2aNBfCUqMwp7aRnmpOeOfAUpT4Go8i1PPhyres0Bi53JEaTNahNKBJfd/ZTgZxz60c2KyWxjW+ooT8VD0OOwpSG1pCt0cDwz14njWnpmfD1JrO3MLtEKPEZadCWUNghQ3cjezzIoc+AUQHfQll91tLgWlCykLHJQB51jo0sUWUJ93XAtEB8NSFDvM3AajpBPAA8M8qz69tsVFotNzZYiNSZJUh7uRy0sjqMU1PlIWvFg3pqwOakuvcWn0sK7NTm+tJI4f/ALVjO0lAiQ3nkaltz62kkhlB8pZHQcedbey3zu48u7OflWheG9KCI+bW9clTQfIDyU7nPjy99Jt7UNJa2Dea3YtpmTYMuaw1vRoYBeWVAbueXrpgWeJHkabg/wBnodpnP7h79HlgdstXUAnkP/qsWmLkqHonUIct0XehL8ppxvO+STwX445UPJ/AUBb1OmaPdKqt8uz6kus+1xnuxKXUMpQEpTzO6nwGawWWVLvNxm3CHYLYSlCE77wCY8cAeB6n8qe/+C1AnPCt252mZZ3WmpzXZLdbDqU7wPknkeHqo11hGjw7XZb4IluMwulLyYwCo72M9Bz5Vm2iTjJn2+1iHESZTDJ7wW/1jeVYwD0HopLI3VDcKAiDbo0i2zZcqc3H7uAGmsby3lnoBnOPTVdTdkW232i4tWxLVgTbUJSmQJbg7wvI4qyeIPhVDY7TBYlakdtrDN0lQiO5Mrw4lSSf2gP3sflSWTtg4ABVnfLbFtchluHcWp6HGgtS2xwQT+6eJoq1WUs6Qhvy7RCg3Wcsh0JZ3VhKeSgP3c8M+uty7abg3DXFktyGG48d2Gl11LKQjexknl1OMZp7/YaC2qUVXvU8V5M22x7Hb2YqSptlaW8ON4ON7e6miLTkWU2xbWpVmssWE+EpV3wjt5Gf3hnjk9BTc6VtCUbfYs6lXOrIDFr1PcIkVO6y255CfuggHHzqmq07VkNUyVK9rymBkju9jJadIz2a0rx44OauNWagTqW89/THMcdklvcKt7lnjn31R1KVc2O+KLfTmoHtO3BUhtpD7TqC28yvk4g9K2rrddPPwnWrXYlxn3SD2zj5V2eDnCRQ9UpOKbsFJ1QWx9W2+XZ4sDUNpM7uYww827uKCfA18WfVkS2TbmlVqSbXcE7qoiHP2AOAwTz60K17S0iPZhVcdWwn9NSLHb7T3OOtxK0K7XePAgkqzzJxW47rm3SVwJ0qydtdIaEoS4p4hvAPPd8edBNSj44huwtja0bj6iu917ktSbiyWg12g8jIHHOOPKqnTF7Gnb4zcVMF8NJUncCt3ORjnVRUo1VUGzYU2zVcNqFcrfdLcuTCnSDI3W3N1aFE5xnryFYb/qdi8WeFbotuEJmG4othLm8N08gfT4mhyvKNI3YbPou9KX9Omrx39ccyB2Sm9xKt3nj+lbsy96Zfivoj6aUy+tJCHe9KO4o8jihepTcE3YlJ1QW2rVFltoiyxYP+JxUBKXW3ylCzjG8oeNYrLq5ERV1busPvkW6K33kIXuEK48vjQxXlLRD2YRxtSxYVuvkKJAU2zcsBpPa57EAdeHGvdPali221TbVc4CpkGWoLIbXuKSoY6+4UN1KNELZhJfdTx7tY4lrjW4QmYjpW2EObw3SDwOevHnWa9aqhXu1xw/bFJuzDaWkS0u+SAk5zjx5/GhWpRpEezDKRq6zXcNSL7YTJuDSAkutPbiXcct4Vm0Y+9m8SIdo7yy+QksRZHZvNDORudSP6UD19tvOML32XFNrH7yFEH5UnBVSGpu+Q71baobmnTdZEabbrgHQ22zMkdqp1PU8SSBz+FVVy1o7Jv9uu0JjsHYTKWt1at4LxnPuINDTr7shW8+646rxWoqPzrHRGFLkHK3wFN31BYbgxJdj6f7G4Sgd50vZQhR5qSPGtx3XFvkqgTZVkD11hoShDpeIbwOu740FVKfxxFuyy1BdU3u+Srglosh9QVuFWccMc/dVbUqVSVcEt2SpUqUwP/9k=";

// ---- Tabela de preços TORTUGA (dsm-firmenich) - Nutrição e ECO - 16/10/2026 ----
// Preços à vista com 18% de ICMS incluso, em R$/kg posto cliente. mt1/mt2/mt3/go = colunas do PDF.

const PRODUTOS = [
  // CONFINAMENTO
  { cod: "BRT487A025", nome: "FOSBOVI CONFINAMENTO", cat: "Confinamento", peso: 25, mt1: 7.0617, mt2: 7.0832, mt3: 7.3722, go: 7.0013 },
  { cod: "BRT352A025", nome: "FOSBOVI CONFINAMENTO PLUS", cat: "Confinamento", peso: 25, mt1: 8.7281, mt2: 8.7496, mt3: 9.0385, go: 8.6676 },
  { cod: "BRT353A025", nome: "FOSBOVI CONFINAMENTO PLUS N", cat: "Confinamento", peso: 25, mt1: 7.7471, mt2: 7.7686, mt3: 8.0575, go: 7.6866 },
  { cod: "BRT346A025", nome: "FOSBOVI CONFINAMENTO PRIME", cat: "Confinamento", peso: 25, mt1: 10.3944, mt2: 10.4159, mt3: 10.7048, go: 10.3339 },
  { cod: "BRT350A025", nome: "FOSBOVI CONFINAMENTO PRIME 5.0", cat: "Confinamento", peso: 25, mt1: 14.3318, mt2: 14.3533, mt3: 14.6422, go: 14.2713 },
  { cod: "BRT351A025", nome: "FOSBOVI CONFINAMENTO PRIME 5.0 N", cat: "Confinamento", peso: 25, mt1: 11.5501, mt2: 11.5716, mt3: 11.8605, go: 11.4896 },
  { cod: "BRT348A025", nome: "FOSBOVI CONFINAMENTO PRIME DDG", cat: "Confinamento", peso: 25, mt1: 8.9162, mt2: 8.9377, mt3: 9.2266, go: 8.8557 },
  { cod: "BRT347A025", nome: "FOSBOVI CONFINAMENTO PRIME N", cat: "Confinamento", peso: 25, mt1: 9.4000, mt2: 9.4215, mt3: 9.7104, go: 9.3395 },
  { cod: "BRT354A025", nome: "FOSBOVI SEMICONFINAMENTO 10 PRIME N", cat: "Confinamento", peso: 25, mt1: 7.8815, mt2: 7.9030, mt3: 8.1919, go: 7.8210 },
  // GADO DE CORTE BOI VERDE
  { cod: "BRT698A025", nome: "FOSBOVI ADVANCE", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 7.8412, mt2: 7.8627, mt3: 8.1516, go: 7.7807 },
  { cod: "BRR008A030", nome: "FOSBOVI ENGORDA", cat: "Gado de Corte Boi Verde", peso: 30, mt1: 7.4649, mt2: 7.4864, mt3: 7.7753, go: 7.4044 },
  { cod: "BRQ325A025", nome: "FOSBOVI MULTI ADVANCE", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 7.2364, mt2: 7.2579, mt3: 7.5469, go: 7.1760 },
  { cod: "BRQ194A025", nome: "FOSBOVI NÚCLEO", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 12.6789, mt2: 12.7004, mt3: 12.9893, go: 12.6184 },
  { cod: "BRM477A025", nome: "FOSBOVI NÚCLEO ADVANCE", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 14.8559, mt2: 14.8774, mt3: 15.1663, go: 14.7954 },
  { cod: "BRQ284A025", nome: "FOSBOVI NÚCLEO IMPACT", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 9.9241, mt2: 9.9456, mt3: 10.2345, go: 9.8636 },
  { cod: "BRQ195A025", nome: "FOSBOVI NÚCLEO PLUS", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 13.8883, mt2: 13.9098, mt3: 14.1988, go: 13.8279 },
  { cod: "BRQ285A025", nome: "FOSBOVI NÚCLEO PRIMA", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 9.0640, mt2: 9.0855, mt3: 9.3745, go: 9.0036 },
  { cod: "BRQ403A025", nome: "FOSBOVI NÚCLEO REPRODUÇÃO MAX", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 13.4583, mt2: 13.4798, mt3: 13.7687, go: 13.3978 },
  { cod: "BRR010C030", nome: "FOSBOVI PAMPERO", cat: "Gado de Corte Boi Verde", peso: 30, mt1: 9.3194, mt2: 9.3409, mt3: 9.6298, go: 9.2589 },
  { cod: "BRR992M025", nome: "FOSBOVI PLUS", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 7.4515, mt2: 7.4730, mt3: 7.7619, go: 7.3910 },
  { cod: "BRR011A030", nome: "FOSBOVI REPRODUÇÃO", cat: "Gado de Corte Boi Verde", peso: 30, mt1: 9.3194, mt2: 9.3409, mt3: 9.6298, go: 9.2589 },
  { cod: "BRR015A030", nome: "FOSCROMO", cat: "Gado de Corte Boi Verde", peso: 30, mt1: 9.1178, mt2: 9.1393, mt3: 9.4282, go: 9.0573 },
  // GADO DE CORTE TQ
  { cod: "BRR100A030", nome: "FOSBOVI 15", cat: "Gado de Corte TQ", peso: 30, mt1: 6.5377, mt2: 6.5592, mt3: 6.8481, go: 6.4772 },
  { cod: "BRR056A030", nome: "FOSBOVI 18", cat: "Gado de Corte TQ", peso: 30, mt1: 7.6262, mt2: 7.6477, mt3: 7.9366, go: 7.5657 },
  { cod: "BRR101A030", nome: "FOSBOVI 20", cat: "Gado de Corte TQ", peso: 30, mt1: 8.1368, mt2: 8.1583, mt3: 8.4472, go: 8.0763 },
  { cod: "BRR104A025", nome: "FOSBOVI 30", cat: "Gado de Corte TQ", peso: 25, mt1: 11.5098, mt2: 11.5313, mt3: 11.8202, go: 11.4493 },
  { cod: "BRR102A025", nome: "FOSBOVI 40", cat: "Gado de Corte TQ", peso: 25, mt1: 14.7484, mt2: 14.7699, mt3: 15.0588, go: 14.6879 },
  { cod: "BRM077A025", nome: "FOSBOVI BALANCE", cat: "Gado de Corte TQ", peso: 25, mt1: 6.1211, mt2: 6.1426, mt3: 6.4315, go: 6.0606 },
  { cod: "BRM080A025", nome: "FOSBOVI NÚCLEO BALANCE", cat: "Gado de Corte TQ", peso: 25, mt1: 10.5691, mt2: 10.5906, mt3: 10.8795, go: 10.5086 },
  { cod: "BRR103A030", nome: "FOSBOVI PRONTO", cat: "Gado de Corte TQ", peso: 30, mt1: 5.1670, mt2: 5.1885, mt3: 5.4774, go: 5.1065 },
  { cod: "BRR059A025", nome: "ULTRA PHÓS ENGORDA", cat: "Gado de Corte TQ", peso: 25, mt1: 7.8143, mt2: 7.8358, mt3: 8.1247, go: 7.7538 },
  // NÚCLEOS BOI VERDE
  // PROGRAMA DE LEITE
  { cod: "BRB321A025", nome: "BOVIGOLD", cat: "Programa de Leite", peso: 25, mt1: 8.7550, mt2: 8.7765, mt3: 9.0654, go: 8.6945 },
  { cod: "BRT391A020", nome: "BOVIGOLD BUFFER", cat: "Programa de Leite", peso: 20, mt1: 7.4783, mt2: 7.4998, mt3: 7.7888, go: 7.4179 },
  { cod: "BRB539A025", nome: "BOVIGOLD CRINA", cat: "Programa de Leite", peso: 25, mt1: 12.1414, mt2: 12.1629, mt3: 12.4518, go: 12.0809 },
  { cod: "BRB241A025", nome: "BOVIGOLD CRINA 400", cat: "Programa de Leite", peso: 25, mt1: 15.9578, mt2: 15.9793, mt3: 16.2682, go: 15.8973 },
  { cod: "BRM338A025", nome: "BOVIGOLD DIGEST", cat: "Programa de Leite", peso: 25, mt1: 9.6419, mt2: 9.6634, mt3: 9.9523, go: 9.5814 },
  { cod: "BRT188A025", nome: "BOVIGOLD EXTRA PLUS", cat: "Programa de Leite", peso: 25, mt1: 14.0765, mt2: 14.0980, mt3: 14.3869, go: 14.0160 },
  { cod: "BRB248A025", nome: "BOVIGOLD FREE", cat: "Programa de Leite", peso: 25, mt1: 6.6720, mt2: 6.6935, mt3: 6.9825, go: 6.6116 },
  { cod: "BRM337A025", nome: "BOVIGOLD GUARD", cat: "Programa de Leite", peso: 25, mt1: 10.6497, mt2: 10.6712, mt3: 10.9602, go: 10.5893 },
  { cod: "5065979BAG", nome: "BOVIGOLD LAC, bags", cat: "Programa de Leite", peso: 25, mt1: 27.3937, mt2: 27.4152, mt3: 27.7041, go: 27.3332 },
  { cod: "BRB766A025", nome: "BOVIGOLD LIV", cat: "Programa de Leite", peso: 25, mt1: 10.6900, mt2: 10.7116, mt3: 11.0005, go: 10.6296 },
  { cod: "BRR149A025", nome: "BOVIGOLD PASTO", cat: "Programa de Leite", peso: 25, mt1: 8.7818, mt2: 8.8033, mt3: 9.0923, go: 8.7214 },
  { cod: "BRQ020A020", nome: "BOVIGOLD PASTO (SC 20)", cat: "Programa de Leite", peso: 20, mt1: 7.1021, mt2: 7.1236, mt3: 7.4125, go: 7.0416 },
  { cod: "BRB322A025", nome: "BOVIGOLD PLUS", cat: "Programa de Leite", peso: 25, mt1: 9.8166, mt2: 9.8381, mt3: 10.1270, go: 9.7561 },
  { cod: "BRR143A025", nome: "BOVIGOLD PRE PARTO OVN", cat: "Programa de Leite", peso: 25, mt1: 24.5582, mt2: 24.5797, mt3: 24.8686, go: 24.4977 },
  { cod: "BRR703G025", nome: "BOVIGOLD PRE PARTO PLUS", cat: "Programa de Leite", peso: 25, mt1: 29.6916, mt2: 29.7131, mt3: 30.0020, go: 29.6311 },
  { cod: "BRR144A025", nome: "BOVIGOLD PRIMA", cat: "Programa de Leite", peso: 25, mt1: 25.4048, mt2: 25.4263, mt3: 25.7152, go: 25.3444 },
  { cod: "BRT127A025", nome: "BOVIGOLD PRO", cat: "Programa de Leite", peso: 25, mt1: 9.3194, mt2: 9.3409, mt3: 9.6298, go: 9.2589 },
  { cod: "BRR145A025", nome: "BOVIGOLD RECRIA", cat: "Programa de Leite", peso: 25, mt1: 19.4920, mt2: 19.5135, mt3: 19.8025, go: 19.4316 },
  { cod: "BRB540A025", nome: "BOVIGOLD ULTRA", cat: "Programa de Leite", peso: 25, mt1: 14.6409, mt2: 14.6624, mt3: 14.9513, go: 14.5804 },
  { cod: "BRR724M020", nome: "FEPROXI", cat: "Programa de Leite", peso: 20, mt1: 64.5098, mt2: 64.5313, mt3: 64.8203, go: 64.4494 },
  { cod: "BRR705K020", nome: "LACBOVI", cat: "Programa de Leite", peso: 20, mt1: 7.5455, mt2: 7.5670, mt3: 7.8559, go: 7.4851 },
  { cod: "BRR540B020", nome: "LACBOVI PASTO", cat: "Programa de Leite", peso: 20, mt1: 7.6127, mt2: 7.6342, mt3: 7.9231, go: 7.5522 },
  { cod: "BRT476A020", nome: "VICTUS DIGEST", cat: "Programa de Leite", peso: 20, mt1: 34.2740, mt2: 34.2955, mt3: 34.5844, go: 34.2135 },
  { cod: "BRM366A020", nome: "VICTUS THERMO", cat: "Programa de Leite", peso: 20, mt1: 29.9469, mt2: 29.9684, mt3: 30.2573, go: 29.8864 },
  // PROGRAMA DE SECA
  { cod: "BRQ288A025", nome: "FOSBOVI NÚCLEO PROTEICO", cat: "Programa de Seca", peso: 25, mt1: 7.0886, mt2: 7.1101, mt3: 7.3990, go: 7.0282 },
  { cod: "BRQ402A025", nome: "FOSBOVI NÚCLEO PROTEICO ADVANCE", cat: "Programa de Seca", peso: 25, mt1: 7.5858, mt2: 7.6073, mt3: 7.8963, go: 7.5254 },
  { cod: "BRQ319A030", nome: "FOSBOVI PROTEICO 30 ADVANCE", cat: "Programa de Seca", peso: 30, mt1: 5.8523, mt2: 5.8738, mt3: 6.1627, go: 5.7918 },
  { cod: "BRQ282A030", nome: "FOSBOVI PROTEICO 35 (BRQ282A030)", cat: "Programa de Seca", peso: 30, mt1: 5.2342, mt2: 5.2557, mt3: 5.5446, go: 5.1737 },
  { cod: "BRQ281A030", nome: "FOSBOVI PROTEICO 35 PLUS", cat: "Programa de Seca", peso: 30, mt1: 5.4492, mt2: 5.4707, mt3: 5.7596, go: 5.3887 },
  { cod: "BRQ283A030", nome: "FOSBOVI PROTEICO 40 PLUS", cat: "Programa de Seca", peso: 30, mt1: 5.8254, mt2: 5.8469, mt3: 6.1359, go: 5.7650 },
  { cod: "BRQ279A025", nome: "FOSBOVI SECA 15", cat: "Programa de Seca", peso: 25, mt1: 6.5377, mt2: 6.5592, mt3: 6.8481, go: 6.4772 },
  { cod: "BRQ404A025", nome: "FOSBOVI SECA 15 MAX", cat: "Programa de Seca", peso: 25, mt1: 6.7930, mt2: 6.8145, mt3: 7.1034, go: 6.7325 },
  { cod: "BRQ182A025", nome: "FOSBOVI SECA 20", cat: "Programa de Seca", peso: 25, mt1: 6.8333, mt2: 6.8548, mt3: 7.1437, go: 6.7728 },
  { cod: "BRQ183A025", nome: "FOSBOVI SECA 20 MAX", cat: "Programa de Seca", peso: 25, mt1: 7.6665, mt2: 7.6880, mt3: 7.9769, go: 7.6060 },
  // PROGRAMA DE SUPLEMENTAÇÃO ESTRATÉGICA
  { cod: "BRM798A025", nome: "FOSBOVI NÚCLEO PROTEICO IMPACT", cat: "Suplementação Estratégica", peso: 25, mt1: 7.0349, mt2: 7.0564, mt3: 7.3453, go: 6.9744 },
  { cod: "BRR084A030", nome: "FOSBOVI PROTEICO 30 COM MONENSINA", cat: "Suplementação Estratégica", peso: 30, mt1: 6.2689, mt2: 6.2904, mt3: 6.5793, go: 6.2084 },
  { cod: "BRQ221A030", nome: "FOSBOVI PROTEICO ENERGETICO 25", cat: "Suplementação Estratégica", peso: 30, mt1: 4.5891, mt2: 4.6106, mt3: 4.8995, go: 4.5287 },
  { cod: "BRQ222A030", nome: "FOSBOVI PROTEICO ENERGETICO 25 PLUS", cat: "Suplementação Estratégica", peso: 30, mt1: 4.8041, mt2: 4.8256, mt3: 5.1146, go: 4.7437 },
  { cod: "BRR031A030", nome: "FOSBOVI PROTEICO ENERGÉTICO 45 ÁGUAS", cat: "Suplementação Estratégica", peso: 30, mt1: 6.4973, mt2: 6.5188, mt3: 6.8078, go: 6.4369 },
  { cod: "BRQ289A025", nome: "FOSBOVINHO PROTEICO ADVANCE", cat: "Suplementação Estratégica", peso: 25, mt1: 8.3652, mt2: 8.3867, mt3: 8.6757, go: 8.3048 },
  // STRAIGHTS
  { cod: "5064177BAG", nome: "DL-METHIONINE 85% (MEPRON)", cat: "Straights", peso: 25, mt1: 104.1927, mt2: 104.2142, mt3: 104.5031, go: 104.1322 },
  { cod: "5017222W3N", nome: "Mycofix® Plus 5.0", cat: "Straights", peso: 25, mt1: 60.6934, mt2: 60.7149, mt3: 61.0038, go: 60.6329 },
  { cod: "5016939W3N", nome: "Mycofix® PRO-Tect", cat: "Straights", peso: 25, mt1: 19.7877, mt2: 19.8092, mt3: 20.0981, go: 19.7272 },
  { cod: "5017239W3N", nome: "Mycofix® Secure", cat: "Straights", peso: 25, mt1: 9.6419, mt2: 9.6634, mt3: 9.9523, go: 9.5814 },
  { cod: "5017225W3N", nome: "Mycofix® Select 5.0", cat: "Straights", peso: 25, mt1: 36.7332, mt2: 36.7547, mt3: 37.0436, go: 36.6727 },
  // CAPRINOS E OVINOS (Linha ECO)
  { cod: "BRR038A025", nome: "CAPRINOFÓS COM MINERAIS ORGÂNICOS", cat: "Caprinos e Ovinos", peso: 25, mt1: 11.9398, mt2: 11.9613, mt3: 12.2502, go: 11.8793 },
  { cod: "BRR028C025", nome: "OVINOFOS", cat: "Caprinos e Ovinos", peso: 25, mt1: 13.3642, mt2: 13.3857, mt3: 13.6747, go: 13.3038 },
  { cod: "BRR387B025", nome: "OVINOFOS NÚCLEO PROTEICO", cat: "Caprinos e Ovinos", peso: 25, mt1: 14.9768, mt2: 14.9983, mt3: 15.2872, go: 14.9163 },
  // EQUINOS (Linha ECO)
  { cod: "BR0596A025", nome: "COEQUI PLUS", cat: "Equinos", peso: 25, mt1: 9.7494, mt2: 9.7709, mt3: 10.0598, go: 9.6889 },
  { cod: "BR0574A025", nome: "KROMIUM", cat: "Equinos", peso: 25, mt1: 14.6543, mt2: 14.6758, mt3: 14.9647, go: 14.5938 },
  { cod: "BR0578A025", nome: "KROMIUM PROTEICO", cat: "Equinos", peso: 25, mt1: 10.8110, mt2: 10.8325, mt3: 11.1214, go: 10.7505 },
  // Demais produtos da tabela Nutrição de 16/10/2026
  { cod: "BRR086A025", nome: "FOSBOVI NÚCLEO PROTEICO (BRR086A025)", cat: "Programa de Seca", peso: 25, mt1: 8.2443, mt2: 8.2658, mt3: 8.5547, go: 8.1838 },
  { cod: "BRR338B025", nome: "FOSBOVI NÚCLEO BOI VERDE", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 12.8402, mt2: 12.8617, mt3: 13.1506, go: 12.7797 },
  { cod: "BRR339B025", nome: "FOSBOVI NUCLEO BOI VERDE M", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 14.0496, mt2: 14.0711, mt3: 14.3600, go: 13.9891 },
  { cod: "BRR989P025", nome: "FOSBOVI NUCLEO BOI VERDE PRIMA", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 9.0640, mt2: 9.0855, mt3: 9.3745, go: 9.0036 },
  { cod: "BRR022A025", nome: "NÚCLEO BOI VERDE REPRODUÇÃO", cat: "Gado de Corte Boi Verde", peso: 25, mt1: 13.4583, mt2: 13.4798, mt3: 13.7687, go: 13.3978 },
  { cod: "BRR033A030", nome: "FOSBOVI PROTEICO 35 (BRR033A030)", cat: "Programa de Seca", peso: 30, mt1: 5.9329, mt2: 5.9544, mt3: 6.2434, go: 5.8725 },
  { cod: "BRR085A030", nome: "FOSBOVI PROTEICO 35 COM MONENSINA", cat: "Programa de Seca", peso: 30, mt1: 6.1345, mt2: 6.1560, mt3: 6.4449, go: 6.0740 },
  { cod: "BRR106A030", nome: "FOSBOVI PROTEICO 45", cat: "Programa de Seca", peso: 30, mt1: 7.1289, mt2: 7.1504, mt3: 7.4394, go: 7.0685 },
  { cod: "BRR014A025", nome: "FOSBOVINHO PROTEICO ADE", cat: "Suplementação Estratégica", peso: 25, mt1: 8.7684, mt2: 8.7899, mt3: 9.0788, go: 8.7079 },
  { cod: "BRR096A030", nome: "FOSBOVI PROTEICO ENERGÉTICO 25 (BRR096A030)", cat: "Suplementação Estratégica", peso: 30, mt1: 5.1804, mt2: 5.2019, mt3: 5.4908, go: 5.1199 },
  { cod: "BRR058A030", nome: "FOSBOVI PROTEICO ENERGÉTICO 25 M", cat: "Suplementação Estratégica", peso: 30, mt1: 5.3685, mt2: 5.3900, mt3: 5.6790, go: 5.3081 },
  { cod: "BRR012A030", nome: "FOSBOVI SECA", cat: "Programa de Seca", peso: 30, mt1: 8.9565, mt2: 8.9780, mt3: 9.2669, go: 8.8961 },
  { cod: "BRR016A030", nome: "FOSCROMO SECA", cat: "Programa de Seca", peso: 30, mt1: 8.1771, mt2: 8.1986, mt3: 8.4875, go: 8.1166 },
  { cod: "BRR079A025", nome: "NUTRIGOLD 15", cat: "Programa de Seca", peso: 25, mt1: 7.6262, mt2: 7.6477, mt3: 7.9366, go: 7.5657 },
  { cod: "BRR040A025", nome: "NUTRIGOLD 20%", cat: "Programa de Seca", peso: 25, mt1: 7.7740, mt2: 7.7955, mt3: 8.0844, go: 7.7135 },
  { cod: "BRR098A025", nome: "NUTRIGOLD NUCLEO", cat: "Programa de Seca", peso: 25, mt1: 9.4134, mt2: 9.4349, mt3: 9.7238, go: 9.3530 },
];

const CATEGORIAS = [...new Set(PRODUTOS.map((p) => p.cat))];

// Campanha comercial de Outubro/2026, válida até 31/10/2026.
// Desconto ESP de 4,5% somente para os códigos da campanha recebida.
// O usuário decide aplicar a campanha no card do produto.
const CAMPANHAS_OUTUBRO_2026 = {
  // Corte Pasto Linha Tradicional (TQ) - Mineral Pronto Uso
  "BRR103A030": [{ origem: "ESP", pct: 4.5 }],
  "BRR100A030": [{ origem: "ESP", pct: 4.5 }],
  "BRR056A030": [{ origem: "ESP", pct: 4.5 }],
  "BRR101A030": [{ origem: "ESP", pct: 4.5 }],
  "BRM077A025": [{ origem: "ESP", pct: 4.5 }],
  "BRR059A025": [{ origem: "ESP", pct: 4.5 }],
  // Corte Pasto Linha Tradicional (TQ) - Para diluir/misturar
  "BRR104A025": [{ origem: "ESP", pct: 4.5 }],
  "BRR102A025": [{ origem: "ESP", pct: 4.5 }],
  "BRM080A025": [{ origem: "ESP", pct: 4.5 }],
  // Corte Pasto Linha Boi Verde - Mineral Pronto Uso
  "BRR015A030": [{ origem: "ESP", pct: 4.5 }],
  "BRR008A030": [{ origem: "ESP", pct: 4.5 }],
  "BRR011A030": [{ origem: "ESP", pct: 4.5 }],
  "BRR010C030": [{ origem: "ESP", pct: 4.5 }],
  // Sem preço nas tabelas recebidas: NOVO FOSBOVI AVEIA-AZEVÉM.
  "BRT897A025": [{ origem: "ESP", pct: 4.5 }],
  // Corte Pasto Linha Boi Verde - Adensado
  "BRR992M025": [{ origem: "ESP", pct: 4.5 }],
  "BRT698A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ325A025": [{ origem: "ESP", pct: 4.5 }],
  // Corte Pasto Linha Boi Verde - Ureado
  "BRQ279A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ404A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ182A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ183A025": [{ origem: "ESP", pct: 4.5 }],
  // Corte Pasto Linha Boi Verde - Proteico
  "BRQ319A030": [{ origem: "ESP", pct: 4.5 }],
  "BRQ282A030": [{ origem: "ESP", pct: 4.5 }],
  "BRQ281A030": [{ origem: "ESP", pct: 4.5 }],
  "BRQ283A030": [{ origem: "ESP", pct: 4.5 }],
  "BRR084A030": [{ origem: "ESP", pct: 4.5 }],
  // Corte Pasto Linha Boi Verde - Proteico-energético
  "BRR031A030": [{ origem: "ESP", pct: 4.5 }],
  "BRQ221A030": [{ origem: "ESP", pct: 4.5 }],
  "BRQ222A030": [{ origem: "ESP", pct: 4.5 }],
  // Corte Pasto Linha Boi Verde - Núcleo com ureia
  "BRQ288A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ402A025": [{ origem: "ESP", pct: 4.5 }],
  "BRM798A025": [{ origem: "ESP", pct: 4.5 }],
  // Corte Pasto Linha Boi Verde - Núcleo sem ureia
  "BRQ194A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ195A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ285A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ403A025": [{ origem: "ESP", pct: 4.5 }],
  "BRM477A025": [{ origem: "ESP", pct: 4.5 }],
  "BRQ284A025": [{ origem: "ESP", pct: 4.5 }],
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
  if (item.precoManual == null && !PRODUTOS[item.produtoIdx]) {
    return {
      precoTabela: 0, volume: 0, faixa: faixaPedido,
      qtdeEfetivo: item.qtdePct != null ? item.qtdePct : faixaPedido.qtde,
      logEfetivo: item.logisticaPct != null ? item.logisticaPct : faixaPedido.logistica,
      precoKg: 0, precoSaco: 0, total: 0,
    };
  }
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

function novoItem(produtoIdx = null) {
  return {
    id: Math.random().toString(36).slice(2),
    produtoIdx,
    precoManual: null,
    pesoSaco: PRODUTOS[produtoIdx]?.peso ?? "",
    qtdeSacos: "",
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
  return <label className="mp-field"><span className="mp-label">{label}</span>{children}{hint && <small className="mp-label">{hint}</small>}</label>;
}

function PctInput({ value, onChange, auto }) {
  return <div className="mp-pct" data-auto={auto}>
    <input type="number" step="0.01" value={value} onChange={(e) => onChange(parseFloat(e.target.value) || 0)} />
    <span aria-hidden="true">%</span>
    {auto !== undefined && <small className="mp-auto-badge">{auto ? "automático" : "manual"}</small>}
  </div>;
}

function Icon({ name }) {
  const paths = {
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></>,
    image: <><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></>,
    settings: <><path d="M4 7h16M4 17h16" /><circle cx="9" cy="7" r="2" /><circle cx="15" cy="17" r="2" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

const normalizarBusca = (texto) => texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

// Organização comercial das tabelas, independente dos preços e dos cálculos.
const PRODUTOS_POR_CODIGO = new Map(PRODUTOS.map((p, idx) => [p.cod, { ...p, idx }]));
const GRUPO_POR_CODIGO = new Map(GRUPOS_PRODUTOS.flatMap((grupo) => grupo.codigos.map((cod) => [cod, grupo])));
const numeroDigitado = (valor) => valor === "" ? "" : parseFloat(valor) || 0;
const temProduto = (item) => item.precoManual != null || Boolean(PRODUTOS[item.produtoIdx]);
const itemCompleto = (item, mtTier) => {
  const preco = item.precoManual != null ? item.precoManual : PRODUTOS[item.produtoIdx]?.[mtTier];
  return temProduto(item) && preco !== "" && Number.isFinite(preco) && preco >= 0
    && Number.isFinite(item.qtdeSacos) && item.qtdeSacos > 0
    && Number.isFinite(item.pesoSaco) && item.pesoSaco > 0;
};

function ProductSearch({ produtoIdx, itemNumber, onSelect }) {
  const prod = PRODUTOS[produtoIdx];
  const nome = prod?.nome || "";
  const grupoSelecionado = prod ? GRUPO_POR_CODIGO.get(prod.cod) : null;
  const [query, setQuery] = useState(nome);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  useEffect(() => { setQuery(nome); }, [nome]);
  useEffect(() => {
    if (open && active >= 0) resultsRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, open, query]);
  const termo = normalizarBusca(query === nome ? "" : query.trim());
  const grupos = GRUPOS_PRODUTOS
    .map((grupo) => ({
      ...grupo,
      produtos: grupo.codigos.map((cod) => PRODUTOS_POR_CODIGO.get(cod)).filter((p) => p && normalizarBusca(`${p.nome} ${p.cod}`).includes(termo)),
    }))
    .filter((grupo) => grupo.produtos.length > 0);
  const matches = grupos.flatMap((grupo) => grupo.produtos);
  const select = (p) => {
    inputRef.current?.focus();
    onSelect(p.idx);
    setQuery(p.nome);
    setOpen(false);
    setActive(-1);
  };
  return <div className="mp-product-search" onBlur={(e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) { setOpen(false); setQuery(nome); setActive(-1); }
  }}>
    <label className="mp-field">
      <span className="mp-label">Produto · busca por nome ou código</span>
      <div className="mp-search">
        <Icon name="search" />
        <input ref={inputRef} role="combobox" aria-label={`Buscar produto ${itemNumber}`} aria-expanded={open} aria-controls={listId} aria-autocomplete="list" aria-activedescendant={open && active >= 0 && matches[active] ? `${listId}-${matches[active].cod}` : undefined}
          autoComplete="off" value={query} placeholder="Digite o nome ou código do produto"
          onFocus={(e) => { setOpen(true); e.currentTarget.select(); }}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(-1); }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown" || e.key === "ArrowUp") {
              e.preventDefault(); setOpen(true);
              setActive((a) => matches.length ? (e.key === "ArrowDown" ? (a + 1) % matches.length : (a <= 0 ? matches.length - 1 : a - 1)) : -1);
            } else if (e.key === "Enter" && open) {
              e.preventDefault(); if (matches[active >= 0 ? active : 0]) select(matches[active >= 0 ? active : 0]);
            } else if (e.key === "Escape") { setOpen(false); setQuery(nome); setActive(-1); }
          }} />
      </div>
    </label>
    {open && <div ref={resultsRef} className="mp-results" id={listId} role="listbox" aria-label="Produtos encontrados">
      {matches.length ? grupos.map((grupo) => <div key={grupo.id} role="group" aria-labelledby={`${listId}-grupo-${grupo.id}`}>
        <div className="mp-result-group-title" id={`${listId}-grupo-${grupo.id}`}>
          {grupo.linha}{grupo.divisao && <> · {grupo.divisao}</>}<span>{grupo.produtos.length}</span>
        </div>
        {grupo.produtos.map((p) => <button type="button" className="mp-result" role="option" id={`${listId}-${p.cod}`} key={p.cod} tabIndex={-1} aria-selected={matches[active]?.cod === p.cod}
          onMouseDown={(e) => e.preventDefault()} onClick={() => select(p)}>
          <span>{p.nome}<small>{p.cod}</small></span>
        </button>)}
      </div>) : <div className="mp-empty">Nenhum produto encontrado.</div>}
    </div>}
    {prod && <div className="mp-product-meta"><span>{grupoSelecionado ? `${grupoSelecionado.linha}${grupoSelecionado.divisao ? ` · ${grupoSelecionado.divisao}` : ""}` : prod.cat}</span><code>{prod.cod}</code></div>}
  </div>;
}

function ItemCard({ item, index, mtTier, encargo, faixaPedido, volumeTotalPedido, onChange, onRemove, canRemove }) {
  const c = calcItem(item, mtTier, encargo, faixaPedido);
  const prod = PRODUTOS[item.produtoIdx];
  const preenchido = temProduto(item);
  const set = (patch) => onChange({ ...item, ...patch });
  const campanha = item.precoManual == null && prod && CAMPANHAS_OUTUBRO_2026[prod.cod];
  return <section className="mp-panel" aria-label={`Produto ${index + 1}`}>
    <div className="mp-item-head"><div className="mp-item-number"><b>{index + 1}</b> Produto</div>{canRemove && <button type="button" className="mp-text-button" aria-label={`Remover produto ${index + 1}`} onClick={onRemove}>Remover</button>}</div>
    {item.precoManual == null ? <ProductSearch produtoIdx={item.produtoIdx} itemNumber={index + 1} onSelect={(idx) => set({ produtoIdx: idx, pesoSaco: PRODUTOS[idx].peso })} /> : <Field label="Preço de tabela manual (R$/kg)">
      <input type="number" min="0" step="0.0001" value={item.precoManual} onChange={(e) => set({ precoManual: numeroDigitado(e.target.value) })} />
    </Field>}
    <div className="mp-inputs">
      <Field label="Quantidade de sacos"><input type="number" min="0" step="1" aria-label={`Quantidade de sacos do produto ${index + 1}`} value={item.qtdeSacos} onChange={(e) => set({ qtdeSacos: numeroDigitado(e.target.value) })} /></Field>
      <Field label="Peso por saco (kg)"><input type="number" min="0" step="0.5" aria-label={`Peso por saco do produto ${index + 1}`} value={item.pesoSaco} onChange={(e) => set({ pesoSaco: numeroDigitado(e.target.value) })} /></Field>
      <div><div className="mp-label">Preço de tabela</div><div className="mp-price-table">{preenchido && item.precoManual !== "" ? `R$ ${fmt(c.precoTabela, 4)}` : "—"}<small>/kg</small></div></div>
    </div>
    <div className="mp-manual-row"><span>{fmt(c.volume, 0)} kg neste produto</span><button className="mp-text-button" type="button" onClick={() => set({ precoManual: item.precoManual == null ? (prod ? c.precoTabela : "") : null })}>{item.precoManual == null ? "Usar preço manual" : "Voltar à tabela"}</button></div>
    {campanha && <div className="mp-campaign"><div><span>Campanha de outubro</span><small>4,5% · válida até 31/10/2026</small></div>
      <button type="button" aria-pressed={item.campanhaPct === campanha[0].pct} onClick={() => set({ campanhaPct: item.campanhaPct === campanha[0].pct ? 0 : campanha[0].pct })}>{item.campanhaPct === campanha[0].pct ? "Remover 4,5%" : "Aplicar 4,5%"}</button>
    </div>}
    <details className="mp-discounts"><summary>Descontos e ajustes <span>· {item.qtdePct == null && item.logisticaPct == null ? "automático" : "manual"}</span></summary>
      <div className="mp-discount-grid">
        <Field label="Desconto por volume" hint={`Faixa do pedido: ${fmt(volumeTotalPedido, 0)} kg`}><PctInput value={(c.qtdeEfetivo * 100).toFixed(2)} auto={item.qtdePct == null} onChange={(v) => set({ qtdePct: v / 100 })} /></Field>
        <Field label="Desconto de logística"><PctInput value={(c.logEfetivo * 100).toFixed(2)} auto={item.logisticaPct == null} onChange={(v) => set({ logisticaPct: v / 100 })} /></Field>
        <Field label="Campanha por item"><PctInput value={item.campanhaPct} onChange={(v) => set({ campanhaPct: v })} /></Field>
        <Field label="AD2 por item"><PctInput value={item.ad2Pct} onChange={(v) => set({ ad2Pct: v })} /></Field>
      </div>
      {(item.qtdePct != null || item.logisticaPct != null) && <button className="mp-text-button" type="button" onClick={() => set({ qtdePct: null, logisticaPct: null })}>Voltar aos descontos automáticos</button>}
    </details>
    <div className="mp-item-values"><div><span>Preço final / kg</span><strong>{preenchido && item.precoManual !== "" ? fmtMoney(c.precoKg) : "—"}</strong></div><div><span>Preço por saco</span><strong>{preenchido && item.precoManual !== "" && item.pesoSaco !== "" ? fmtMoney(c.precoSaco) : "—"}</strong></div><div><span>Subtotal</span><strong>{fmtMoney(c.total)}</strong></div></div>
  </section>;
}

export default function PriceCalculator() {
  const [items, setItems] = useState(() => [novoItem()]);
  const [mtTier, setMtTier] = useState("mt1");
  const [prazoIdx, setPrazoIdx] = useState(0);
  const [encargoManual, setEncargoManual] = useState(null);
  const [observacoes, setObservacoes] = useState("");
  const [exporting, setExporting] = useState(null);
  const [exportError, setExportError] = useState("");

  const encargo = encargoManual == null ? PRAZOS[prazoIdx].encargo : encargoManual;
  const itensNoPedido = items.filter(temProduto);
  const volumeTotalPedido = itensNoPedido.reduce((s, it) => s + (it.qtdeSacos || 0) * (it.pesoSaco || 0), 0);
  const faixaPedido = faixaPorVolume(volumeTotalPedido);
  const calcs = useMemo(() => items.map((it) => calcItem(it, mtTier, encargo, faixaPedido)), [items, mtTier, encargo, faixaPedido]);
  const totalSacos = itensNoPedido.reduce((s, it) => s + (it.qtdeSacos || 0), 0);
  const totalKg = calcs.reduce((s, c) => s + c.volume, 0);
  const totalReais = calcs.reduce((s, c) => s + c.total, 0);
  const updateItem = (id, next) => setItems((prev) => prev.map((it) => (it.id === id ? next : it)));
  const removeItem = (id) => setItems((prev) => {
    const restantes = prev.filter((it) => it.id !== id);
    return restantes.length ? restantes : [novoItem()];
  });
  const addItem = () => setItems((prev) => [...prev, novoItem()]);
  const podeExportar = items.length > 0 && items.every((it) => itemCompleto(it, mtTier));
  const exportar = async (tipo) => {
    if (!podeExportar) return;
    setExporting(tipo); setExportError("");
    try {
      const dados = { items, calcs, totalSacos, totalKg, totalReais, prazo: PRAZOS[prazoIdx].nome };
      if (tipo === "cliente") await gerarImagemOrcamento(dados);
      else await gerarImagemParametrosCotacao({ ...dados, mtTier, encargo, observacoes });
    } catch (e) { setExportError(`Erro ao gerar imagem: ${e.message || "Tente novamente."}`); }
    finally { setExporting(null); }
  };

  return <div className="maisa-app">
    <header className="mp-top"><div className="mp-brand"><img className="mp-maisa-logo" src={MAISA_LOGO} alt="Mais@ Pecuária Estratégica" /><span className="mp-divider" aria-hidden="true" /><div className="mp-title">Formação de Preço<small>Nutrição animal · Tortuga</small></div></div><img className="mp-tortuga" src={TORTUGA_LOGO} alt="Tortuga" /></header>
    <div className="mp-layout">
      <main className="mp-main">
        <div className="mp-page-heading"><h1>Novo orçamento</h1><span className="mp-date">{new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}</span></div>
        <section className="mp-panel" aria-label="Condições do pedido"><h2 className="mp-section-title">Condições do pedido</h2>
          <div className="mp-conditions"><div><div className="mp-label" style={{ marginBottom: 7 }}>Tabela de preços</div><div className="mp-regions" role="group" aria-label="Região da tabela">{["mt1", "mt2", "mt3", "go"].map((t) => <button type="button" key={t} aria-pressed={mtTier === t} onClick={() => setMtTier(t)}>{t.toUpperCase()}</button>)}</div></div>
            <Field label="Condição de pagamento"><select value={prazoIdx} onChange={(e) => { setPrazoIdx(parseInt(e.target.value)); setEncargoManual(null); }}>{PRAZOS.map((p, i) => <option key={p.nome} value={i}>{p.nome}</option>)}</select></Field>
          </div>
          <div className="mp-condition-meta"><span>ICMS <strong>18% fixo</strong></span><span>Encargo <strong>{fmt(encargo * 100, 2)}%</strong></span><details><summary>Ajustar encargo</summary><div className="mp-charge"><Field label="Encargo aplicado"><PctInput value={(encargo * 100).toFixed(2)} auto={encargoManual == null} onChange={(v) => setEncargoManual(v / 100)} /></Field><button className="mp-button" type="button" onClick={() => setEncargoManual(null)}>Usar o prazo selecionado</button></div></details></div>
        </section>
        <div className="mp-row-title"><h2>Produtos do pedido <span className="mp-count">{itensNoPedido.length}</span></h2><button className="mp-button" type="button" onClick={addItem}><Icon name="plus" />Adicionar produto</button></div>
        <div className="mp-cards">{items.map((it, idx) => <ItemCard key={it.id} item={it} index={idx} mtTier={mtTier} encargo={encargo} faixaPedido={faixaPedido} volumeTotalPedido={volumeTotalPedido} onChange={(next) => updateItem(it.id, next)} onRemove={() => removeItem(it.id)} canRemove={items.length > 1 || temProduto(it) || it.qtdeSacos !== "" || it.pesoSaco !== ""} />)}</div>
        <details className="mp-panel mp-notes"><summary>Observações internas{observacoes.trim() ? " · preenchidas" : ""}</summary><Field label="Aparecem apenas na imagem de parâmetros da cotação"><textarea value={observacoes} onChange={(e) => setObservacoes(e.target.value)} rows={3} aria-label="Observações internas" placeholder="Entrega, carga, embalagem ou outras condições…" /></Field>{observacoes.trim() && <button className="mp-text-button" type="button" onClick={() => setObservacoes("")}>Limpar observações</button>}</details>
      </main>
      <aside className="mp-panel mp-summary" aria-label="Resumo do pedido">
        <div className="mp-summary-head"><h2>Resumo do pedido</h2><span className="mp-status"><Icon name="check" />Atualizado</span></div>
        <div className="mp-order-list">{itensNoPedido.length === 0 && <p className="mp-order-empty">Escolha um produto para começar.</p>}{items.map((it, idx) => temProduto(it) && <div className="mp-order-line" key={it.id}><div><strong>{it.precoManual == null ? PRODUTOS[it.produtoIdx].nome : "Produto avulso"}</strong><small>{it.qtdeSacos === "" ? "Informe a quantidade" : `${fmt(it.qtdeSacos, 0)} sacos`}{it.pesoSaco !== "" && ` × ${fmt(it.pesoSaco, 1)} kg`}</small></div><strong>{fmtMoney(calcs[idx].total)}</strong></div>)}</div>
        <div className="mp-summary-stats"><span><strong>{fmt(totalSacos, 0)}</strong> sacos</span><span><strong>{fmt(totalKg, 0)}</strong> kg</span><span>{mtTier.toUpperCase()}</span></div>
        <div className="mp-total" aria-live="polite" aria-atomic="true"><small>Total do pedido</small><strong>{fmtMoney(totalReais)}</strong><span>{PRAZOS[prazoIdx].nome}</span></div>
        <div className="mp-summary-actions"><button type="button" className="mp-button mp-gold-button" disabled={exporting != null || !podeExportar} onClick={() => exportar("cliente")}><Icon name="image" />{exporting === "cliente" ? "Gerando imagem…" : "Gerar orçamento do cliente"}</button><button type="button" className="mp-button" disabled={exporting != null || !podeExportar} onClick={() => exportar("interno")}><Icon name="settings" />{exporting === "interno" ? "Gerando imagem…" : "Parâmetros da cotação"}</button>{!podeExportar && <p className="mp-export-hint">Preencha produto, quantidade e peso em cada item para gerar o orçamento.</p>}{exportError && <p className="mp-error" role="alert">{exportError}</p>}</div>
        <div className="mp-summary-foot">Tabela de 16/10/2026 · valores em reais</div>
      </aside>
    </div>
    <footer className="mp-footer"><span>Zootecnista CRMV-MT 01122-ZP · Sinop/MT</span><span>Mais@ · Pecuária Estratégica</span></footer>
  </div>;
}
