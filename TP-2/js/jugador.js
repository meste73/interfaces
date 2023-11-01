class Jugador{

    #nombre;
    #imagenFicha;
    
    constructor(nombre, imagenFicha){
        this.#nombre = nombre;
        this.#imagenFicha = imagenFicha;
    }

    get nombre(){
        return this.#nombre;
    }

    get imagenFicha(){
        return this.#imagenFicha;
    }

    set nombre(nombre){
        this.#nombre = nombre;
    }

    set imagenFicha(imagenFicha){
        this.#imagenFicha = imagenFicha;
    }
}

export {Jugador}