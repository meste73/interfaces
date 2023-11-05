class Ficha{

    /** @type {CanvasRenderingContext2D} */
    #ctx;
    #imgSrc;
    #x;
    #y;
    #radio;
    #estaHabilitada;
    #jugador;
    #img;

    constructor(ctx, imgSrc, x, y, radio){
        this.#ctx = ctx;
        this.#imgSrc = imgSrc;
        this.#x = x;
        this.#y = y;
        this.#radio = radio;
        this.#estaHabilitada = true;
        this.#img = new Image();
        this.#img.src = this.#imgSrc;
    }

    get ctx(){
        return this.#ctx;
    }

    get img(){
        return this.#img;
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

    set img(img){
        this.#img = img;
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
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radio, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.closePath();
        this.ctx.save();
        this.ctx.clip();
        if(!this.img.complete){
            this.img.onload = async () => {
                 this.ctx.drawImage(this.img, this.x-this.radio, this.y-this.radio, this.radio*2, this.radio*2);
            }
        } else {
            this.ctx.drawImage(this.img, this.x-this.radio, this.y-this.radio, this.radio*2, this.radio*2);
        }
        this.ctx.restore();
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