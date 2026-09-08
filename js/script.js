function atualizarDataHora() {
    const agora = new Date();

    const dataHoraFormatada =
        agora.toLocaleString("pt-BR");

    document.getElementById("dataHora").textContent =
        "Data e hora atual: " + dataHoraFormatada;
}


atualizarDataHora();


setInterval(atualizarDataHora, 1000);


const botaoBanho =
    document.getElementById("botaoBanho");

const botaoTosa =
    document.getElementById("botaoTosa");

const areaServicos =
    document.getElementById("servicosSelecionados");

const listaServicos =
    document.getElementById("listaServicos");

const checkBanho =
    document.getElementById("agendamentoBanho");

const checkTosa =
    document.getElementById("agendamentoTosa");


let banhoSelecionado = false;
let tosaSelecionada = false;


botaoBanho.addEventListener("click", function () {

    banhoSelecionado = !banhoSelecionado;

    checkBanho.checked = banhoSelecionado;

    atualizarBotaoBanho();

    atualizarServicosSelecionados();
});


botaoTosa.addEventListener("click", function () {

    tosaSelecionada = !tosaSelecionada;

    checkTosa.checked = tosaSelecionada;

    atualizarBotaoTosa();

    atualizarServicosSelecionados();
});


checkBanho.addEventListener("change", function () {

    banhoSelecionado = checkBanho.checked;

    atualizarBotaoBanho();

    atualizarServicosSelecionados();
});


checkTosa.addEventListener("change", function () {

    tosaSelecionada = checkTosa.checked;

    atualizarBotaoTosa();

    atualizarServicosSelecionados();
});


function atualizarBotaoBanho() {

    if (banhoSelecionado) {

        botaoBanho.classList.add("selecionado");

        botaoBanho.textContent =
            "✓ Banho selecionado";

    } else {

        botaoBanho.classList.remove("selecionado");

        botaoBanho.textContent =
            "Selecionar Banho";
    }
}


function atualizarBotaoTosa() {

    if (tosaSelecionada) {

        botaoTosa.classList.add("selecionado");

        botaoTosa.textContent =
            "✓ Tosa selecionada";

    } else {

        botaoTosa.classList.remove("selecionado");

        botaoTosa.textContent =
            "Selecionar Tosa";
    }
}


function atualizarServicosSelecionados() {

    let servicos = [];


    if (banhoSelecionado) {
        servicos.push("Banho");
    }


    if (tosaSelecionada) {
        servicos.push("Tosa");
    }


    if (servicos.length > 0) {

        areaServicos.classList.add("mostrar");

        listaServicos.textContent =
            "Você selecionou: " +
            servicos.join(" + ");

    } else {

        areaServicos.classList.remove("mostrar");

        listaServicos.textContent =
            "Nenhum serviço selecionado.";
    }
}


const formAgendamento =
    document.getElementById("formAgendamento");


formAgendamento.addEventListener(
    "submit",
    function (event) {

        
        event.preventDefault();


        const nomeCliente =
            document.getElementById("nomeCliente").value;

        const nomePet =
            document.getElementById("nomePet").value;

        const data =
            document.getElementById("dataAgendamento").value;

        const horario =
            document.getElementById("horaAgendamento").value;


        const atendimentoSelecionado =
            document.querySelector(
                'input[name="atendimento"]:checked'
            );


        const mensagem =
            document.getElementById(
                "mensagemAgendamento"
            );


        if (nomeCliente === "" || nomePet === "") {

            mensagem.textContent =
                "Preencha primeiro os dados do cliente e do pet.";

            mensagem.style.color = "red";

            return;
        }


        if (
            !checkBanho.checked &&
            !checkTosa.checked
        ) {

            mensagem.textContent =
                "Selecione pelo menos um serviço.";

            mensagem.style.color = "red";

            return;
        }


        if (!atendimentoSelecionado) {

            mensagem.textContent =
                "Selecione a forma de atendimento.";

            mensagem.style.color = "red";

            return;
        }


        if (data === "" || horario === "") {

            mensagem.textContent =
                "Selecione a data e o horário do agendamento.";

            mensagem.style.color = "red";

            return;
        }


        const hoje = new Date();

        hoje.setHours(0, 0, 0, 0);


        const dataSelecionada =
            new Date(data + "T00:00:00");


        if (dataSelecionada < hoje) {

            mensagem.textContent =
                "Não é possível realizar um agendamento em uma data passada.";

            mensagem.style.color = "red";

            return;
        }


        let servicos = [];


        if (checkBanho.checked) {
            servicos.push("Banho");
        }


        if (checkTosa.checked) {
            servicos.push("Tosa");
        }


        mensagem.textContent =
            "Agendamento realizado com sucesso! " +
            nomePet +
            " foi agendado para " +
            servicos.join(" + ") +
            " no dia " +
            formatarData(data) +
            " às " +
            horario +
            ". Forma de atendimento: " +
            atendimentoSelecionado.value +
            ".";


        mensagem.style.color = "green";
    }
);



function formatarData(data) {

    const partes = data.split("-");

    return partes[2] +
           "/" +
           partes[1] +
           "/" +
           partes[0];
}