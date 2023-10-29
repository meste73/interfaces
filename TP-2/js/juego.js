import { Ficha } from "./ficha.js";
import { Tablero } from "./tablero.js";

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
    let casillaCantidad = 9;

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
    
    iniciarEventos();
    tablero.dibujarTablero();
    prepararFichas();

    function prepararFichas(){
        let posicionXComienzo = tablero.posicionXenCanvas/2;
        let posicionXFin = canvasWidth - tablero.posicionXenCanvas/2;
        let positionY = (tablero.posicionYenCanvas + (casillaCantidad-1)*casillaAnchoYAlto) - fichaRadio;

        //Fichas jugador uno
        for(let i = 0; i < fichasCantidad; i++){
            let ficha = new Ficha(ctx, 'blue', posicionXComienzo, (positionY - i*10), fichaRadio);
            fichas.push(ficha);
        }

        //Fichas jugador dos
        for(let i = 0; i < fichasCantidad; i++){
            let ficha = new Ficha(ctx, 'red', posicionXFin, (positionY - i*10), fichaRadio);
            fichas.push(ficha);
        }
        dibujarJuego();
    }

    function dibujarJuego(){
        reiniciarCanvas();
        tablero.dibujarTablero();
        fichas.forEach(p => p.dibujar());
    }

    function reiniciarCanvas(){
        ctx.fillStyle = '#6E11FF';
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
        if(fichaClickeada != null){
            let x = tablero.obtenerColumna(fichaClickeada);
            mouseClickeado = false;
            if(x != null){
                fichaClickeada.x = x;
                tirarFicha();
                fichaClickeada.estaHabilitada = false;
            } else {
                fichaClickeada.x = originalX;
                fichaClickeada.y = originalY;
                dibujarJuego();
            }
        }
    }

    function tirarFicha(){
        finalizarEventos();
        if(mouseClickeado == false){
            setTimeout(() => {
                if(fichaClickeada != null && fichaClickeada.y < 500){
                    fichaClickeada.setPosicion(fichaClickeada.x, fichaClickeada.y+3.5);
                    dibujarJuego();
                    tirarFicha();
                } else{
                    iniciarEventos();
                }
            },2)
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
        onMouseUp();
    }

    function buscarFichaClickeada(x, y){
        for(let i = fichas.length - 1; i >= 0; i--){
            let ficha = fichas[i];
            if(ficha.cursorDentro(x, y) && ficha.estaHabilitada){
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

