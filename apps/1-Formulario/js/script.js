
"use strict";

/* =========================================
   1. Slide data
========================================= */

const slides = [
    {
        category: "01 / THE WILD",
        title: "Beyond the Horizon",
        description:
            "Find your own path through landscapes that take your breath away.",
        image:
            "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2000&q=85",
        alt: "Mountain landscape reflected in a peaceful lake."
    },
    {
        category: "02 / THE OCEAN",
        title: "Where the Sea Meets the Sky",
        description:
            "Let the endless coastline remind you how beautiful the unknown can be.",
        image:
            "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=85",
        alt: "Ocean waves rolling toward the coast."
    },
    {
        category: "03 / THE MOUNTAINS",
        title: "A Different Perspective",
        description:
            "Rise above the ordinary and discover a world full of possibilities.",
        image:
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85",
        alt: "Dramatic mountain peaks rising into the sky."
    },
    {
        category: "04 / THE FOREST",
        title: "Into the Unknown",
        description:
            "Sometimes the most memorable journeys begin where the road ends.",
        image:
            "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2000&q=85",
        alt: "Sunlight filtering through a dense green forest."
    }
];

/* =========================================
   2. DOM elements
========================================= */

const painel = document.querySelector("#slides");

const categoria = document.querySelector("#slide-category");
const titulo = document.querySelector("#slide-title");
const descricao = document.querySelector("#slide-description");

const slideAtualTexto = document.querySelector("#current-slide");
const totalSlidesTexto = document.querySelector("#total-slides");

const indicadores = document.querySelector("#slide-indicators");
const anuncio = document.querySelector("#slide-announcement");

const botaoAnterior = document.querySelector("#previous-slide");
const botaoProximo = document.querySelector("#next-slide");
const botaoReproducao = document.querySelector("#toggle-playback");
const iconeReproducao = document.querySelector("#playback-icon");

const slider = document.querySelector(".slider");

/* =========================================
   3. State
========================================= */

let indiceAtual = 0;
let temporizador = null;

const INTERVALO_SLIDE = 6000;

const movimentoReduzido = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

let usuarioPausou = movimentoReduzido.matches;
let mouseSobreSlider = false;
let focoNoSlider = false;
let paginaVisivel = !document.hidden;

/* =========================================
   4. Initialize
========================================= */

inicializarSlideshow();

function inicializarSlideshow() {
    if (
        !painel ||
        !categoria ||
        !titulo ||
        !descricao ||
        !indicadores ||
        !slider
    ) {
        console.error(
            "Slideshow initialization failed: required HTML elements are missing."
        );

        return;
    }

    criarSlides();
    criarIndicadores();

    totalSlidesTexto.textContent = padNumber(slides.length);

    atualizarSlide(0, false);
    atualizarReproducao();

    botaoAnterior.addEventListener("click", voltar);
    botaoProximo.addEventListener("click", avancar);
    botaoReproducao.addEventListener("click", alternarReproducao);

    /*
     * Pause while the visitor is interacting with the slider.
     */

    slider.addEventListener("mouseenter", () => {
        mouseSobreSlider = true;
        atualizarReproducao();
    });

    slider.addEventListener("mouseleave", () => {
        mouseSobreSlider = false;
        atualizarReproducao();
    });

    slider.addEventListener("focusin", () => {
        focoNoSlider = true;
        atualizarReproducao();
    });

    slider.addEventListener("focusout", () => {
        /*
         * Wait until focus has moved to its next element.
         */

        requestAnimationFrame(() => {
            focoNoSlider = slider.contains(document.activeElement);
            atualizarReproducao();
        });
    });

    /*
     * Stop playback when the browser tab is hidden.
     */

    document.addEventListener("visibilitychange", () => {
        paginaVisivel = !document.hidden;
        atualizarReproducao();
    });

    /*
     * Follow changes to the operating system's motion preference.
     */

    movimentoReduzido.addEventListener("change", (evento) => {
        if (evento.matches) {
            usuarioPausou = true;
        }

        atualizarReproducao();
    });

    /*
     * Keyboard navigation.
     * Ignore keys when typing into form fields.
     */

    document.addEventListener("keydown", (evento) => {
        if (
            evento.altKey ||
            evento.ctrlKey ||
            evento.metaKey ||
            evento.shiftKey
        ) {
            return;
        }

        const elemento = evento.target;

        if (
            elemento instanceof HTMLElement &&
            (
                elemento.isContentEditable ||
                ["INPUT", "TEXTAREA", "SELECT"].includes(
                    elemento.tagName
                )
            )
        ) {
            return;
        }

        if (evento.key === "ArrowLeft") {
            evento.preventDefault();
            voltar();
        } else if (evento.key === "ArrowRight") {
            evento.preventDefault();
            avancar();
        }
    });

    /*
     * Start automatically unless motion is reduced
     * or the visitor explicitly pauses playback.
     */

    atualizarReproducao();
}

/* =========================================
   5. Create slide elements
========================================= */

function criarSlides() {
    painel.replaceChildren();

    slides.forEach((slide, indice) => {
        const elemento = document.createElement("div");

        elemento.className = "slide";
        elemento.setAttribute("role", "group");
        elemento.setAttribute("aria-roledescription", "slide");

        elemento.setAttribute(
            "aria-label",
            `${indice + 1} of ${slides.length}: ${slide.title}`
        );

        const imagem = document.createElement("img");

        imagem.className = "slide-image";
        imagem.src = slide.image;
        imagem.alt = slide.alt;
        imagem.loading = indice === 0 ? "eager" : "lazy";
        imagem.decoding = "async";

        if (indice === 0) {
            imagem.fetchPriority = "high";
        }

        elemento.appendChild(imagem);
        painel.appendChild(elemento);
    });
}

/* =========================================
   6. Create slide indicators
========================================= */

function criarIndicadores() {
    indicadores.replaceChildren();

    slides.forEach((slide, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "slide-indicator";

        botao.setAttribute(
            "aria-label",
            `Go to slide ${indice + 1}: ${slide.title}`
        );

        botao.addEventListener("click", () => {
            atualizarSlide(indice, true);
        });

        indicadores.appendChild(botao);
    });
}

/* =========================================
   7. Update active slide
========================================= */

function atualizarSlide(novoIndice, anunciar = true) {
    indiceAtual = wrapIndex(novoIndice, slides.length);

    const slide = slides[indiceAtual];

    const elementosSlides = painel.querySelectorAll(".slide");
    const elementosIndicadores =
        indicadores.querySelectorAll(".slide-indicator");

    elementosSlides.forEach((elemento, indice) => {
        const ativo = indice === indiceAtual;

        elemento.classList.toggle("is-active", ativo);

        if (ativo) {
            elemento.setAttribute("aria-current", "true");
        } else {
            elemento.removeAttribute("aria-current");
        }

        /*
         * Prevent invisible slides from being read by
         * assistive technology.
         */

        elemento.setAttribute("aria-hidden", String(!ativo));
    });

    categoria.textContent = slide.category;
    titulo.textContent = slide.title;
    descricao.textContent = slide.description;

    slideAtualTexto.textContent = padNumber(indiceAtual + 1);

    elementosIndicadores.forEach((botao, indice) => {
        if (indice === indiceAtual) {
            botao.setAttribute("aria-current", "true");
        } else {
            botao.removeAttribute("aria-current");
        }
    });

    if (anunciar && anuncio) {
        anuncio.textContent =
            `Slide ${indiceAtual + 1} of ${slides.length}: ` +
            slide.title;
    }
}

/* =========================================
   8. Navigation
========================================= */

function avancar() {
    atualizarSlide(indiceAtual + 1);
}

function voltar() {
    atualizarSlide(indiceAtual - 1);
}

/* =========================================
   9. Playback controls
========================================= */

function alternarReproducao() {
    usuarioPausou = !usuarioPausou;
    atualizarReproducao();
}

function deveReproduzir() {
    return (
        !usuarioPausou &&
        !mouseSobreSlider &&
        !focoNoSlider &&
        paginaVisivel &&
        !movimentoReduzido.matches
    );
}

function atualizarReproducao() {
    const reproduzindo = deveReproduzir();

    /*
     * Clear the previous timer to prevent multiple
     * timers from advancing the slides simultaneously.
     */

    if (temporizador !== null) {
        clearInterval(temporizador);
        temporizador = null;
    }

    if (reproduzindo) {
        temporizador = setInterval(() => {
            avancar();
        }, INTERVALO_SLIDE);
    }

    iconeReproducao.textContent = reproduzindo ? "Ⅱ" : "▶";

    botaoReproducao.setAttribute(
        "aria-label",
        reproduzindo ? "Pause slideshow" : "Play slideshow"
    );

    botaoReproducao.title =
        reproduzindo ? "Pause slideshow" : "Play slideshow";
}
