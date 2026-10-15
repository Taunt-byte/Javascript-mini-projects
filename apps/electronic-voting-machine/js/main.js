
"use strict";

/* =========================================
   1. Candidatos fictícios
========================================= */

const candidatos = {
    "10": {
        numero: "10",
        nome: "Ana Oliveira",
        partido: "Partido Verde (PV)",
        foto: "",
        votos: 0
    },

    "20": {
        numero: "20",
        nome: "Carlos Santos",
        partido: "Partido Azul (PA)",
        foto: "",
        votos: 0
    },

    "30": {
        numero: "30",
        nome: "Mariana Costa",
        partido: "Partido Amarelo (PAM)",
        foto: "",
        votos: 0
    }
};

/* =========================================
   2. Estado da votação
========================================= */

const estado = {
    numeroDigitado: "",
    votoEmBranco: false,
    votosBrancos: 0,
    votosNulos: 0,
    votosValidos: 0,
    bloqueado: false
};

// Controla o temporizador da confirmação.
let temporizadorConfirmacao = null;

/* =========================================
   3. Elementos da interface
========================================= */

const tela = document.querySelector("#tela");
const cargo = document.querySelector("#cargo");

const numeroDigitos = document.querySelector("#numero-digitos");
const candidatoInfo = document.querySelector("#candidato-info");
const candidatoFoto = document.querySelector("#candidato-foto");
const candidatoNome = document.querySelector("#candidato-nome");
const candidatoPartido = document.querySelector("#candidato-partido");

const votoEspecial = document.querySelector("#voto-especial");
const mensagemVoto = document.querySelector("#mensagem-voto");

const botaoBranco = document.querySelector("#botao-branco");
const botaoCorrige = document.querySelector("#botao-corrige");
const botaoConfirma = document.querySelector("#botao-confirma");
const botaoReset = document.querySelector("#botao-reset");

const totalValidos = document.querySelector("#total-validos");
const totalBrancos = document.querySelector("#total-brancos");
const totalNulos = document.querySelector("#total-nulos");
const totalVotos = document.querySelector("#total-votos");

const listaResultados = document.querySelector("#lista-resultados");

/* =========================================
   4. Inicialização
========================================= */

inicializar();

function inicializar() {
    // Eventos dos botões numéricos.
    document.querySelectorAll("[data-numero]").forEach((botao) => {
        botao.addEventListener("click", () => {
            digitarNumero(botao.dataset.numero);
        });
    });

    // Eventos dos botões de operação.
    botaoBranco.addEventListener("click", selecionarBranco);
    botaoCorrige.addEventListener("click", corrigirVoto);
    botaoConfirma.addEventListener("click", confirmarVoto);
    botaoReset.addEventListener("click", reiniciarVotacao);

    // Permite utilizar o teclado físico.
    document.addEventListener("keydown", tratarTecladoFisico);

    // Prepara a interface.
    atualizarTela();
    atualizarApuracao();
}

/* =========================================
   5. Entrada de números
========================================= */

function digitarNumero(numero) {
    // Impede alterações durante a confirmação
    // ou quando o voto em branco está selecionado.
    if (estado.bloqueado || estado.votoEmBranco) {
        return;
    }

    // Aceita somente um dígito por chamada.
    if (!/^\d$/.test(numero)) {
        return;
    }

    // Limita a entrada a dois dígitos.
    if (estado.numeroDigitado.length >= 2) {
        mostrarMensagem("Número completo. Confirme ou corrija.");
        return;
    }

    estado.numeroDigitado += numero;

    atualizarTela();

    // Solicita o segundo dígito.
    if (estado.numeroDigitado.length === 1) {
        mostrarMensagem("Digite o segundo número.");
        return;
    }

    // Verifica se o candidato existe.
    const candidato = candidatos[estado.numeroDigitado];

    if (candidato) {
        mostrarMensagem("Confira os dados do candidato.");
    } else {
        mostrarMensagem(
            "Número inexistente. O voto será nulo se confirmado."
        );
    }
}

/* =========================================
   6. Voto em branco
========================================= */

function selecionarBranco() {
    if (estado.bloqueado) {
        return;
    }

    // É necessário limpar os números antes
    // de selecionar o voto em branco.
    if (estado.numeroDigitado !== "") {
        mostrarMensagem(
            "Pressione CORRIGE antes de selecionar voto em branco."
        );

        return;
    }

    estado.votoEmBranco = true;

    atualizarTela();

    mostrarMensagem(
        "Voto em branco selecionado. Pressione CONFIRMA para registrar."
    );
}

/* =========================================
   7. Correção
========================================= */

function corrigirVoto() {
    if (estado.bloqueado) {
        return;
    }

    estado.numeroDigitado = "";
    estado.votoEmBranco = false;

    atualizarTela();

    mostrarMensagem("Voto corrigido. Digite o número do candidato.");
}

/* =========================================
   8. Confirmação
========================================= */

function confirmarVoto() {
    if (estado.bloqueado) {
        return;
    }

    // Registra o voto em branco.
    if (estado.votoEmBranco) {
        estado.votosBrancos++;

        finalizarVoto("VOTO EM BRANCO CONFIRMADO");
        return;
    }

    // Impede confirmar sem digitar um número.
    if (estado.numeroDigitado === "") {
        mostrarMensagem("Digite um número ou selecione BRANCO.");
        return;
    }

    // Procura o candidato correspondente.
    const candidato = candidatos[estado.numeroDigitado];

    // Número inexistente gera voto nulo nesta simulação.
    if (!candidato) {
        estado.votosNulos++;

        finalizarVoto("VOTO NULO CONFIRMADO");
        return;
    }

    // Registra o voto válido.
    candidato.votos++;
    estado.votosValidos++;

    finalizarVoto(
        `VOTO CONFIRMADO: ${candidato.nome.toUpperCase()}`
    );
}

/* =========================================
   9. Finalização de um voto
========================================= */

function finalizarVoto(mensagem) {
    // Bloqueia novos comandos enquanto a confirmação aparece.
    estado.bloqueado = true;

    atualizarTela();
    atualizarApuracao();
    mostrarMensagem(mensagem);

    // Cancela qualquer temporizador anterior.
    if (temporizadorConfirmacao !== null) {
        clearTimeout(temporizadorConfirmacao);
        temporizadorConfirmacao = null;
    }

    // Aguarda 1,6 segundo antes de liberar a urna.
    temporizadorConfirmacao = window.setTimeout(() => {
        estado.numeroDigitado = "";
        estado.votoEmBranco = false;
        estado.bloqueado = false;

        temporizadorConfirmacao = null;

        atualizarTela();

        mostrarMensagem("Digite o número do candidato.");
    }, 1600);
}

/* =========================================
   10. Atualização da tela
========================================= */

function atualizarTela() {
    // Atualiza os dois espaços dos dígitos.
    numeroDigitos.replaceChildren();

    for (let i = 0; i < 2; i++) {
        const digito = document.createElement("span");

        digito.className = "digito";

        const valor = estado.numeroDigitado[i];

        if (valor === undefined) {
            digito.classList.add("vazio");
            digito.textContent = "";
        } else {
            digito.textContent = valor;
        }

        numeroDigitos.appendChild(digito);
    }

    // Esconde as informações antes de atualizar.
    candidatoInfo.hidden = true;
    votoEspecial.hidden = true;

    // Exibe a opção de voto em branco.
    if (estado.votoEmBranco) {
        votoEspecial.hidden = false;
        return;
    }

    // Só apresenta o candidato após dois dígitos.
    if (estado.numeroDigitado.length !== 2) {
        return;
    }

    const candidato = candidatos[estado.numeroDigitado];

    // Não apresenta dados para números inexistentes.
    if (!candidato) {
        return;
    }

    // Exibe os dados do candidato.
    candidatoInfo.hidden = false;

    candidatoNome.textContent = candidato.nome;
    candidatoPartido.textContent = candidato.partido;

    // Atualiza a foto ou o ícone de usuário.
    candidatoFoto.replaceChildren();

    if (candidato.foto) {
        const imagem = document.createElement("img");

        imagem.src = candidato.foto;
        imagem.alt = `Foto ilustrativa de ${candidato.nome}`;

        // Exibe um ícone caso a imagem não carregue.
        imagem.addEventListener(
            "error",
            () => {
                candidatoFoto.replaceChildren();

                const icone = document.createElement("span");

                icone.setAttribute("aria-hidden", "true");
                icone.textContent = "👤";

                candidatoFoto.appendChild(icone);
            },
            { once: true }
        );

        candidatoFoto.appendChild(imagem);
    } else {
        const icone = document.createElement("span");

        icone.setAttribute("aria-hidden", "true");
        icone.textContent = "👤";

        candidatoFoto.appendChild(icone);
    }
}

/* =========================================
   11. Mensagens de estado
========================================= */

function mostrarMensagem(texto) {
    mensagemVoto.textContent = texto;
}

/* =========================================
   12. Apuração dos votos
========================================= */

function atualizarApuracao() {
    // Soma todos os votos confirmados.
    const totalConfirmados =
        estado.votosValidos +
        estado.votosBrancos +
        estado.votosNulos;

    // Atualiza os indicadores.
    totalValidos.textContent = estado.votosValidos;
    totalBrancos.textContent = estado.votosBrancos;
    totalNulos.textContent = estado.votosNulos;
    totalVotos.textContent = totalConfirmados;

    // Limpa a lista anterior.
    listaResultados.replaceChildren();

    // Cria um item para cada candidato.
    Object.values(candidatos).forEach((candidato) => {
        const item = document.createElement("li");

        item.textContent =
            `${candidato.numero} — ${candidato.nome}: ` +
            `${candidato.votos} voto(s)`;

        listaResultados.appendChild(item);
    });
}

/* =========================================
   13. Teclado físico
========================================= */

function tratarTecladoFisico(evento) {
    // Ignora combinações de atalhos do navegador.
    if (evento.ctrlKey || evento.altKey || evento.metaKey) {
        return;
    }

    // Digitação dos números.
    if (/^\d$/.test(evento.key)) {
        evento.preventDefault();
        digitarNumero(evento.key);
        return;
    }

    // Backspace e Escape corrigem a seleção.
    if (evento.key === "Backspace" || evento.key === "Escape") {
        evento.preventDefault();
        corrigirVoto();
        return;
    }

    // Enter confirma o voto.
    if (evento.key === "Enter") {
        evento.preventDefault();
        confirmarVoto();
    }
}

/* =========================================
   14. Reinicialização da votação
========================================= */

function reiniciarVotacao() {
    const desejaReiniciar = window.confirm(
        "Deseja apagar todos os votos desta demonstração?"
    );

    if (!desejaReiniciar) {
        return;
    }

    // Cancela a confirmação pendente, se existir.
    if (temporizadorConfirmacao !== null) {
        clearTimeout(temporizadorConfirmacao);
        temporizadorConfirmacao = null;
    }

    // Limpa o estado da votação.
    estado.numeroDigitado = "";
    estado.votoEmBranco = false;
    estado.votosBrancos = 0;
    estado.votosNulos = 0;
    estado.votosValidos = 0;
    estado.bloqueado = false;

    // Zera os votos dos candidatos.
    Object.values(candidatos).forEach((candidato) => {
        candidato.votos = 0;
    });

    // Atualiza a interface.
    atualizarTela();
    atualizarApuracao();

    mostrarMensagem(
        "Votação reiniciada. Digite o número do candidato."
    );
}
