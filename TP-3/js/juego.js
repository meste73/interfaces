import { Ficha } from "./ficha.js";
import { Tablero } from "./tablero.js";
import { Jugador } from "./jugador.js";

document.addEventListener('DOMContentLoaded', () => {

    "use strict";

    //Canvas
    let canvas = document.querySelector("#canvas");
    /** @type {CanvasRenderingContext2D} */
    let ctx = canvas.getContext("2d");
    let canvasWidth = canvas.offsetWidth;
    let canvasHeight = canvas.offsetHeight;

    //Casilla
    let casillaAnchoYAlto = 72;
    let casillaCantidad = 7;

    //Jugadores
    let jugadorUno = new Jugador("Ezequiel", "Imagen seleccionada", true);
    let jugadorDos = new Jugador("Alexa", "Imagen seleccionada", false);

    //Fichas
    let fichasCantidad = casillaCantidad * (casillaCantidad-1)/2;
    let fichaRadio = 25;
    let fichas = [];
    let originalX;
    let originalY;

    //Tablero
    let tablero = new Tablero(ctx, casillaCantidad, casillaAnchoYAlto, canvasWidth, canvasHeight);

    //Variables de evento
    let mouseClickeado = false;
    let fichaClickeada = null;
    let caida;
    let coordY;
    let firstTime = true;
    
    iniciarEventos();
    tablero.dibujarTablero();
    prepararFichas();

    function prepararFichas(){
        let posicionXComienzo = tablero.posicionXenCanvas/2;
        let posicionXFin = canvasWidth - tablero.posicionXenCanvas/2;
        let positionY = (tablero.posicionYenCanvas + (casillaCantidad-1)*casillaAnchoYAlto) - fichaRadio;
        let srcImg = "../img/juegos/4-en-fila/checo.svg";

        //Fichas jugador uno
        for(let i = 0; i < fichasCantidad; i++){
            let ficha = new Ficha(ctx, srcImg, posicionXComienzo, (positionY - i*10), fichaRadio);
            ficha.jugador = jugadorUno;
            fichas.push(ficha);
        }

        //Fichas jugador dos
        for(let i = 0; i < fichasCantidad; i++){
            let ficha = new Ficha(ctx, srcImg, posicionXFin, (positionY - i*10), fichaRadio);
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
                }, 20)
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
            } else if(jugadorDos.turno){
                jugadorUno.turno = true;
                jugadorDos.turno = false;
            }

            let fichasGanadoras = tablero.esFichaGanadora(fichaClickeada);
            if(fichasGanadoras != null){
                fichasGanadoras.forEach(f => {
                    f.resaltar();
                    f.dibujar();
                });
                console.table(fichasGanadoras);
            } else {
                console.log("No hay ganador aun.")
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

