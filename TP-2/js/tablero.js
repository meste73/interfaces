class Tablero{

    /** @type {CanvasRenderingContext2D} */
    #ctx
    #casillaCantidad;
    #casillaAnchoYAlto;
    #canvasWidth;
    #canvasHeight;
    #posicionXenCanvas;
    #posicionYenCanvas;
    #posicionesColumnas;
    #tableroLogica;

    constructor(ctx, casillaCantidad, casillaAnchoYAlto, canvasWidth, canvasHeight){
        this.#ctx = ctx;
        this.#casillaCantidad = casillaCantidad;
        this.#casillaAnchoYAlto = casillaAnchoYAlto;
        this.#canvasWidth = canvasWidth;
        this.#canvasHeight = canvasHeight;
        this.#posicionesColumnas = [];
        this.#tableroLogica = [];
        this.crearTableroLogica();
        console.log(this.#tableroLogica);
    }

    get ctx(){
        return this.#ctx;
    }

    get casillaCantidad(){
        return this.#casillaCantidad;
    }

    get casillaAnchoYAlto(){
        return this.#casillaAnchoYAlto;
    }

    get canvasWidth(){
        return this.#canvasWidth;
    }

    get canvasHeight(){
        return this.#canvasHeight;
    }

    get posicionXenCanvas(){
        return this.#posicionXenCanvas;
    }

    get posicionYenCanvas(){
        return this.#posicionYenCanvas;
    }

    get posicionesColumnas(){
        return this.#posicionesColumnas;
    }

    dibujarTablero(){

        let cantidadCasillasX = this.casillaCantidad;
        let cantidadCasillasY = cantidadCasillasX -1;

        let tamanioTableroX = cantidadCasillasX * this.casillaAnchoYAlto;
        let tamanioTableroY = cantidadCasillasY * this.casillaAnchoYAlto;

        if( tamanioTableroX < (this.canvasWidth - 100)){

            this.#posicionXenCanvas = (this.canvasWidth - tamanioTableroX)/2;
            this.#posicionYenCanvas = (this.canvasHeight - tamanioTableroY)/2;

            let posicionX = this.#posicionXenCanvas;
            let posicionY = this.#posicionYenCanvas;

            for(let x = 0; x < cantidadCasillasX; x++){
                
                for(let y = 0; y < cantidadCasillasY; y++){
                    this.dibujarRectangulo('darkblue', posicionX, posicionY);
                    posicionY += this.casillaAnchoYAlto;
                }
                posicionY = this.#posicionYenCanvas;
                posicionX += this.casillaAnchoYAlto;
            }
        }
        this.completarPosicionesColumnas();
    }

    dibujarRectangulo(fill, x, y){
        this.ctx.fillStyle = fill;
        this.ctx.fillRect(x, y, this.casillaAnchoYAlto, this.casillaAnchoYAlto);
        this.ctx.strokeStyle = "black";
        this.ctx.strokeRect(x, y, this.casillaAnchoYAlto, this.casillaAnchoYAlto);
    }

    //Llena el arreglo con las coordenadas x para detenerminar las x de cada columna
    completarPosicionesColumnas(){
        let firstposicionX = this.posicionXenCanvas;
        for(let i = 0; i <= this.casillaCantidad; i++){
            this.posicionesColumnas[i] = firstposicionX;
            firstposicionX += this.casillaAnchoYAlto;
        }
    }

    //Devuelve la coordenada x correspondiente a una columna
    obtenerColumna(fichaClickeada){
        for(let i = 0; i < this.posicionesColumnas.length-1; i++){
            if(fichaClickeada.x >= this.posicionesColumnas[i] && fichaClickeada.x < this.posicionesColumnas[i+1]){
                return (this.posicionesColumnas[i+1] - this.posicionesColumnas[i])/2 + this.posicionXenCanvas + i*this.casillaAnchoYAlto;
            }
        }
        return null;
    }

    crearTableroLogica(){
        for(let y = 0; y < this.#casillaCantidad-1; y++){
            this.#tableroLogica[y] = [];
            for(let x = 0; x < this.#casillaCantidad; x++){
                this.#tableroLogica[y][x] = null;
            }
        }
    }
}

export {Tablero};