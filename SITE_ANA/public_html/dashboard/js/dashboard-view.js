
function atualizacaoPeriodica() {
    obterdados(1);
    obterdados(2);
    obterdados(3);
    obterdados(4);
    setTimeout(atualizacaoPeriodica, 1000);
}

function criarCards() {
    var cards = document.getElementById("cards");
    obterEstufas();
    var length = 0;
    for(var i = 0; i < length; i++) {
        console.log("foi");
    }
}

criarCards();

function obterdados(idAquario) {
    fetch(`http://localhost:3000/api`)
        .then(resposta => {
            if (resposta.ok) {
                resposta.json().then(resposta => {

                    // console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

                    var dados = {
                        temperatura: resposta.data[0],
                        luminosidade: resposta.data2[0],
                    }

                    alertar(dados, idAquario);
                });
            } else {

                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`);
        });
}

function alertar(dados, idAquario) {
    var temperatura = dados.temperatura;
    var luminosidade = dados.luminosidade;

    var limites = {
        muito_quente: 25,
        quente: 22,
        ideal:20,
        frio: 10,
        muito_frio: 5
    };

    var classe_temperatura = 'card';

    if (temperatura >= limites.muito_quente) {
        classe_temperatura = 'card perigo-quente';
    }
    else if (temperatura < limites.muito_quente && temperatura >= limites.quente) {
        classe_temperatura = 'card alerta-quente';
    }
    else if (temperatura < limites.quente && temperatura > limites.frio) {
        classe_temperatura = 'card ideal';
    }
    else if (temperatura <= limites.frio && temperatura > limites.muito_frio) {
        classe_temperatura = 'card alerta-frio';
    }
    else if (temperatura < limites.min_temperatura) {
        classe_temperatura = 'card perigo-frio';
    }

    var card;
    var aquario;

    if (idAquario == 1) {
        aquario = temp_aquario_1;
        card = card_1
    } else if (idAquario == 2) {
        aquario = temp_aquario_2;
        card = card_2
    } else if (idAquario == 3) {
        aquario = temp_aquario_3;
        card = card_3
    } else if (idAquario == 4) {
        aquario = temp_aquario_4;
        card = card_4
    }

    // alterando
    card.className = classe_temperatura;
    aquario.innerHTML = `${temperatura} °C<br>${luminosidade} -L`;

}

// FUNÇÕES DO DASHBOARD HIDRO CONTROL
function show_cadastro(){
    if (cads.style.display == 'none'){
        cads.style.display = 'block';
        li_cadastros_icon.innerHTML = "&#9660;";
    } else {
        cads.style.display = 'none';
        li_cadastros_icon.innerHTML = "&#9654;";
    }
};
function show_dashboard(){
    if (estufasContainer.style.display == 'none'){
        estufasContainer.style.display = 'block';
        li_dashboard_icon.innerHTML = "&#9660;";
    } else {
        estufasContainer.style.display = 'none';
        li_dashboard_icon.innerHTML = "&#9654;";
    }
};
function simular_alerta(){ 
    alerta_geral.classList = 'alerta_negativo';
    titulo_alerta.innerHTML = 'ALERTA!';
    msg_alerta.innerHTML = 'Ocorreu alguma anormalidade durante o monitoramento. Acesse o histórico para obter mais informações.'
    ctg_alertas.innerHTML = 'ALERTAS: 2'
    ctg_alertas.style.backgroundColor = 'red'
    chart.datasets.borderColor = 'red'
};
