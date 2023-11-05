class Jugador{

    #nombre;
    #imagenFicha;
    #turno;
    
    constructor(nombre, imagenFicha, turno){
        this.#nombre = nombre;
        this.#imagenFicha = imagenFicha;
        this.#turno = turno;
    }

    get nombre(){
        return this.#nombre;
    }

    get imagenFicha(){
        return this.#imagenFicha;
    }
    
    get turno(){
        return this.#turno;
    }
    set nombre(nombre){
        this.#nombre = nombre;
    }

    set imagenFicha(imagenFicha){
        this.#imagenFicha = imagenFicha;
    }

    set turno(turno){
        this.#turno = turno;
    }
}

export {Jugador}