import { Ficha } from "./ficha.js";
import { Tablero } from "./tablero.js";
import { Jugador } from "./jugador.js";

document.addEventListener('DOMContentLoaded', () => {

    "use strict";

    //Elementos juego
    let imgJuego = document.querySelector("#img-juego");
    let nombreJugadorUno;
    let nombreJugadorDos;
    let imagenJugadorUno;
    let imagenJugadorDos;
    let tipoJuego;

    //Nombre jugador turno actual
    let spanTurnoActual = document.querySelector("#nombre-jugar-turno");
    let spanTemporizador = document.querySelector("#juego-temporizador");

    //Boton jugar
    let btnJugar = document.querySelector("#btn-jugar");
    btnJugar.addEventListener("click", mostrarForm);

    //Boton reset
    let btnReset = document.querySelector("#btn-reset");
    btnReset.addEventListener("click", resetearJuego);

    //From juego
    let divFormJuego = document.querySelector(".div-form-juego");
    let formJugar = document.querySelector("#form-juego");
    formJugar.addEventListener("submit", empezarJuego);

    function mostrarForm(){
        divFormJuego.classList.remove("display-none");
    }

    function empezarJuego(e){
        e.preventDefault();

        let data = new FormData(formJugar);

        nombreJugadorUno = data.get("jugador-uno");
        nombreJugadorDos = data.get("jugador-dos");
        imagenJugadorUno = data.get("img-jugador-uno");
        imagenJugadorDos = data.get("img-jugador-dos");
        tipoJuego = data.get("tipo-juego");

        if(nombreJugadorUno === nombreJugadorDos){
            alert("seleccione nombre diferentes");
        } else if(imagenJugadorUno === imagenJugadorDos){
            alert("seleccione pilotos diferentes");
        } else {
            divFormJuego.classList.add("display-none");
            imgJuego.classList.add("display-none");
            empezar();
        }
    }

    //Canvas
    let canvas = document.querySelector("#canvas");
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.offsetWidth;
    let canvasHeight = canvas.offsetHeight;

    //Casilla
    let casillaAnchoYAlto = 72;
    let casillaCantidad;

    //Jugadores
    let jugadorUno;
    let jugadorDos;
    let jugadorActual;

    //Fichas
    let fichasCantidad;
    let fichaRadio = 25;
    let fichas = [];
    let originalX;
    let originalY;

    //Tablero
    let tablero;

    //Variables de evento
    let mouseClickeado = false;
    let fichaClickeada = null;
    let caida;
    let coordY;
    let firstTime = true;
    let reset = false;

    function resetearJuego(){
        formJugar.reset();
        imgJuego.classList.remove("display-none");
        divFormJuego.classList.add("display-none");
        fichas = [];
        casillaCantidad = 0;
        reiniciarCanvas();
        reset = true;
        spanTurnoActual.innerHTML = "";
    }
    
    function empezar(){
        jugadorUno = new Jugador(nombreJugadorUno, imagenJugadorUno, true);
        jugadorDos = new Jugador(nombreJugadorDos, imagenJugadorDos, false);
        casillaCantidad = tipoJuego;
        fichasCantidad = casillaCantidad * (casillaCantidad-1)/2;
        tablero = new Tablero(ctx, casillaCantidad, casillaAnchoYAlto, canvasWidth, canvasHeight);
        jugadorActual = jugadorUno;
        spanTurnoActual.innerHTML = `Turno actual: ${jugadorActual.nombre}`;
        iniciarEventos();
        tablero.dibujarTablero();
        prepararFichas();
        reset = false;
        iniciarTemporizador(300);
    }

    function iniciarTemporizador(segundos){
        if(reset){
            spanTemporizador.innerHTML = "";
        }else if(segundos >= 0){
            setTimeout(() => {
                spanTemporizador.innerHTML = `Restan ${segundos} segs.`;
                iniciarTemporizador(segundos-1);
            }, 1000);
        } else {
            alert("Tiempo finalizado");
            finalizarEventos();
        }
    }

    function prepararFichas(){
        let posicionXComienzo = tablero.posicionXenCanvas/2;
        let posicionXFin = canvasWidth - tablero.posicionXenCanvas/2;
        let positionY = (tablero.posicionYenCanvas + (casillaCantidad-1)*casillaAnchoYAlto) - fichaRadio;
        let pathImgJugadorUno = `../img/juegos/4-en-fila/${imagenJugadorUno}.png`;
        let pathImgJugadorDos = `../img/juegos/4-en-fila/${imagenJugadorDos}.png`;

        //Fichas jugador uno
        for(let i = 0; i < fichasCantidad; i++){
            let ficha = new Ficha(ctx, pathImgJugadorUno, posicionXComienzo, (positionY - i*10), fichaRadio);
            ficha.jugador = jugadorUno;
            fichas.push(ficha);
        }

        //Fichas jugador dos
        for(let i = 0; i < fichasCantidad; i++){
            let ficha = new Ficha(ctx, pathImgJugadorDos, posicionXFin, (positionY - i*10), fichaRadio);
            ficha.jugador = jugadorDos;
            fichas.push(ficha);
        }
        dibujarJuego();
    }

    function dibujarJuego(){
        reiniciarCanvas();
        tablero.dibujarTablero();
        if(firstTime){
            fichas.forEach(f => {
                setTimeout(() => {
                    f.dibujar();
                }, 50)
            });
            firstTime = false;
        } else {
            fichas.forEach(f => f.dibujar())
        }
    }

    function reiniciarCanvas(){
        ctx.fillStyle = '#6ED8FF';
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    //Evento mantener clickeado
    function onMouseDown(e){
        mouseClickeado = true;
        if(fichaClickeada != null){
            fichaClickeada = null;
        }

        let ficha = buscarFichaClickeada(e.offsetX, e.offsetY);
        if(ficha != null){
            fichaClickeada = ficha;
            originalX = fichaClickeada.x;
            originalY = fichaClickeada.y;
        }
    }

    //Evento soltar click
    function onMouseUp(){
        if(fichaClickeada != null && fichaClickeada.estaHabilitada){
            let coordX = tablero.obtenerCoordX(fichaClickeada);
            mouseClickeado = false;
            if(coordX != null && fichaClickeada.y <= tablero.posicionYenCanvas){
                fichaClickeada.x = coordX;
                coordY = tablero.obtenerCoordY(coordX, fichaClickeada);
                if(coordY < tablero.posicionYenCanvas){
                    fichaClickeada.setPosicion(originalX, originalY);
                    dibujarJuego();
                    fichaClickeada = null;
                } else {
                    caida = window.requestAnimationFrame(tirarFicha);
                    fichaClickeada.estaHabilitada = false;
                    finalizarEventos();
                }
            } else {
                fichaClickeada.x = originalX;
                fichaClickeada.y = originalY;
                dibujarJuego();
            }
        }
    }

    function tirarFicha(){
        dibujarJuego();
        if(fichaClickeada != null && fichaClickeada.y < coordY){
            fichaClickeada.setPosicion(fichaClickeada.x, fichaClickeada.y+10);
            
            caida = window.requestAnimationFrame(tirarFicha);
        } else{
            fichaClickeada.setPosicion(fichaClickeada.x, coordY);
            dibujarJuego();
            window.cancelAnimationFrame(caida);

            //Control de turno
            if(jugadorUno.turno){
                jugadorUno.turno = false;
                jugadorDos.turno = true;
                jugadorActual = jugadorDos;
                spanTurnoActual.innerHTML = `Turno actual: ${jugadorActual.nombre}`;
            } else if(jugadorDos.turno){
                jugadorUno.turno = true;
                jugadorDos.turno = false;
                jugadorActual = jugadorUno;
                spanTurnoActual.innerHTML = `Turno actual: ${jugadorActual.nombre}`;
            }

            let fichasGanadoras = tablero.esFichaGanadora(fichaClickeada);
            if(fichasGanadoras != null){
                fichasGanadoras.forEach(f => {
                    f.resaltar();
                    f.dibujar();
                });
            } else {
                iniciarEventos();
            }
        }
    }

    //Evento mover mouse
    function onMouseMove(e){
        if(mouseClickeado === true && fichaClickeada != null){
            fichaClickeada.setPosicion(e.offsetX, e.offsetY);
            dibujarJuego();
        }
    }

    //Evento mouse sale del elemento html
    function onMouseLeave(){
        if(mouseClickeado === true && fichaClickeada != null){
            fichaClickeada.setPosicion(originalX, originalY);
            dibujarJuego();
            fichaClickeada = null;
        }
    }

    function buscarFichaClickeada(x, y){
        for(let i = fichas.length - 1; i >= 0; i--){
            let ficha = fichas[i];
            if(ficha.cursorDentro(x, y) && ficha.estaHabilitada && ficha.jugador.turno){
                return ficha;
            }
        }
    }

    function iniciarEventos(){
        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('mouseleave', onMouseLeave);
    }

    function finalizarEventos(){
        canvas.removeEventListener('mousedown', onMouseDown);
        canvas.removeEventListener('mouseup', onMouseUp);
        canvas.removeEventListener('mousemove', onMouseMove);
        canvas.removeEventListener('mouseleave', onMouseLeave);
    }
});

