class Ficha{

    /** @type {CanvasRenderingContext2D} */
    #ctx;
    #fill;
    #x;
    #y;
    #radio;
    #estaHabilitada;
    #jugador;

    constructor(ctx, fill, x, y, radio){
        this.#ctx = ctx;
        this.#fill = fill;
        this.#x = x;
        this.#y = y;
        this.#radio = radio;
        this.#estaHabilitada = true;
    }

    get ctx(){
        return this.#ctx;
    }

    get fill(){
        return this.#fill;
    }

    get x(){
        return this.#x;
    }

    get y(){
        return this.#y;
    }
    
    get radio(){
        return this.#radio;
    }

    get estaHabilitada(){
        return this.#estaHabilitada;
    }

    get jugador(){
        return this.#jugador;
    }

    set x(x){
        this.#x = x;
    }

    set y(y){
        this.#y = y;
    }

    set estaHabilitada(booleano){
        this.#estaHabilitada = booleano;
    }

    set jugador(jugador){
        this.#jugador = jugador;
    }

    dibujar() {
        this.ctx.fillStyle = this.fill;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();
    }

    setPosicion(x, y){
        this.x = x;
        this.y = y;
    }

    cursorDentro(x, y){{
        let posX = this.x - x;
        let posY = this.y - y;
        return Math.sqrt(posX * posX + posY * posY) < this.#radio;
    }}

    resaltar(){
        this.ctx.lineWidth = 6;
        this.ctx.strokeStyle = "yellow";
    }
}

export {Ficha}