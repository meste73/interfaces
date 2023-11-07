import { Ficha } from "./ficha.js";
import { Tablero } from "./tablero.js";
import { Jugador } from "./jugador.js";

document.addEventListener('DOMContentLoaded', () => {

    "use strict";

    //Variables juego
    let imgJuego = document.querySelector("#img-juego");
    let nombreJugadorUno;
    let nombreJugadorDos;
    let imagenJugadorUno;
    let imagenJugadorDos;
    let tipoJuego;
    let jugando = false;
    let terminado = false;

    //Nombre jugador turno actual
    let divTurnoActual = document.querySelector(".contenedor-turno");
    let spanTurnoActual = document.querySelector("#nombre-jugar-turno");

    //Temporizador
    let divTemporizador = document.querySelector(".contenedor-temporizador");
    let spanTemporizador = document.querySelector("#juego-temporizador");

    //Ganador
    let divGanador = document.querySelector(".contenedor-ganador");
    let h3Ganador = document.querySelector("#h3-ganador");

    //Boton jugar
    let btnJugar = document.querySelector("#btn-jugar");
    btnJugar.addEventListener("click", mostrarForm);

    //Boton reset
    let btnReset = document.querySelector("#btn-reset");
    btnReset.addEventListener("click", mostrarPopup);

    //Boton confirmar reset
    let btnConfirmarReset = document.querySelector("#confirmar-reset");
    btnConfirmarReset.addEventListener("click", resetearJuego);

    //Boton cancelar reset
    let btnCancelarReset = document.querySelector("#cancelar-reset");
    btnCancelarReset.addEventListener("click", cerrarPopup);

    //Boton cerrar form
    let btnCerrar = document.querySelector("#img-cerrar");
    btnCerrar.addEventListener("click", cerrarForm);

    //From juego
    let divFormJuego = document.querySelector(".div-form-juego");
    let formJugar = document.querySelector("#form-juego");
    formJugar.addEventListener("submit", empezarJuego);

    //Popup restart
    let popup = document.querySelector(".popup-reset");

    function mostrarForm(){
        if(!jugando){
            divGanador.classList.add("display-none");
            divFormJuego.classList.remove("display-none");
        }
    }

    function cerrarForm(){
        divFormJuego.classList.add("display-none");
        imgJuego.classList.remove("display-none");
        formJugar.reset();
    }

    //Funcion que es llamada por el evento submit del formulario, aqui se toman los valores de inicializacion del juego y
    //se llama a otra funcion para iniciar el juego en si.
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
            divTurnoActual.classList.remove("display-none");
            imgJuego.classList.add("display-none");
            reiniciarCanvas();
            if(!fondo.complete){
                fondo.onload = () => {
                    empezar();
                }
            } else {
                empezar();
            }
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
    let fondo = new Image();
    fondo.src = `./img/juegos/4-en-fila/fondo.png`;

    //Variables de evento
    let mouseClickeado = false;
    let fichaClickeada = null;
    let caida;
    let coordY;
    let firstTime = true;
    let reset = false;
    
    //funcion para mostrar popup de restart de juego
    function mostrarPopup() {
        if(jugando && !terminado){
            popup.classList.remove("display-none");
        }
    }

    //funcion para cerrar popup de restart de juego
    function cerrarPopup() {
        popup.classList.add("display-none");
    }

    //Vuelve a estado 0 el juego, para volver a empezar una nueva partida.
    function resetearJuego(){
        cerrarPopup();
        formJugar.reset();
        imgJuego.classList.remove("display-none");
        divFormJuego.classList.add("display-none");
        divTurnoActual.classList.add("display-none");
        fichas = [];
        casillaCantidad = 0;
        reiniciarCanvas();
        reset = true;
        jugando = false;
        spanTurnoActual.innerHTML = "";
        divGanador.classList.add("display-none");
        firstTime = true;
    }
    
    //Instanciacion de cada parte y arranque del juego.
    function empezar(){
        ctx.strokeStyle = "black";
        let img = new Image();
        img.src = `./img/icons/casillero.svg`;
        img.onload = ()=>{
            jugadorUno = new Jugador(nombreJugadorUno, imagenJugadorUno, true);
            jugadorDos = new Jugador(nombreJugadorDos, imagenJugadorDos, false);
            casillaCantidad = tipoJuego;
            fichasCantidad = casillaCantidad * (casillaCantidad-1)/2;
            tablero = new Tablero(ctx, casillaCantidad, casillaAnchoYAlto, canvasWidth, canvasHeight, img, fondo);
            jugadorActual = jugadorUno;
            spanTurnoActual.innerHTML = `Turno actual: ${jugadorActual.nombre}`;
            iniciarEventos();
            tablero.dibujarTablero();
            prepararFichas();
            reset = false;
            terminado = false;
            jugando = true;
            iniciarTemporizador(300);
        }
    }

    //Temporizador
    function iniciarTemporizador(segundos) {
        if (reset) {
            divTemporizador.classList.add("display-none");
            spanTemporizador.innerHTML = "";
        } else if (segundos >= 0) {
            divTemporizador.classList.remove("display-none");
            setTimeout(() => {
                iniciarTemporizador(segundos - 1);
                spanTemporizador.innerHTML = `${segundos} segs.`;
            }, 1000);
        } else {
            divGanador.classList.remove("display-none");
            divTurnoActual.classList.add("display-none");
            divTemporizador.classList.add("display-none");
            spanTemporizador.innerHTML = "";
            h3Ganador.innerHTML = "Tiempo finalizado";
            reset = true;
            terminado = true;
            jugando = false;
            spanTurnoActual.innerHTML = "";
            fichas = [];
            firstTime = true;
            finalizarEventos();
        }
    }

    //Utilizando las variables previamente seteadas, se preparan las fichas y se guardan en un arreglo, luego se dibuja el juego.
    function prepararFichas(){
        let posicionXComienzo = tablero.posicionXenCanvas/2;
        let posicionXFin = canvasWidth - tablero.posicionXenCanvas/2;
        let positionY = (tablero.posicionYenCanvas + (casillaCantidad-1)*casillaAnchoYAlto) - fichaRadio;
        let pathImgJugadorUno = `./img/juegos/4-en-fila/${imagenJugadorUno}.png`;
        let pathImgJugadorDos = `./img/juegos/4-en-fila/${imagenJugadorDos}.png`;

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

    //Se dibuja el tablero y se recorre el arreglo de fichas, dibujando cada una de las mismas.
    function dibujarJuego(){
        reiniciarCanvas();
        tablero.dibujarTablero();
        if(firstTime){
            fichas.forEach(f => {
                setTimeout(() => {
                    f.dibujar();
                }, 400)
            });
            firstTime = false;
        } else {
            fichas.forEach(f => f.dibujar())
        }
        tablero.dibujarTableroFrente();
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

    //Manejo de animacion de caida de la ficha, control de turnos
    function tirarFicha(){
        dibujarJuego();
        if(fichaClickeada != null && fichaClickeada.y < coordY){
            fichaClickeada.setPosicion(fichaClickeada.x, fichaClickeada.y+7);
            
            caida = window.requestAnimationFrame(tirarFicha);
        } else{
            fichaClickeada.setPosicion(fichaClickeada.x, coordY);
            dibujarJuego();
            window.cancelAnimationFrame(caida);
            controlTurno();
            controlGanador();
        }
    }

    //Control de turno
    function controlTurno(){
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
    }

    //Chequeo de ganador
    function controlGanador(){
        let fichasGanadoras = tablero.esFichaGanadora(fichaClickeada);
        let ganador;
        if(fichasGanadoras != null){
            ganador = fichasGanadoras[0].jugador;
            fichasGanadoras.forEach(f => {
                f.resaltar();
                f.dibujar();
            });
            divGanador.classList.remove("display-none");
            divTurnoActual.classList.add("display-none");
            h3Ganador.innerHTML = `${ganador.nombre} has ganado!!!`;
            reset = true;
            terminado = true;
            jugando = false;
            spanTurnoActual.innerHTML = "";
            fichas = [];
            firstTime = true;
        } else {
            iniciarEventos();
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

