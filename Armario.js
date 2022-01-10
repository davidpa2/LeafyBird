class Armario {
    constructor() { //El constructor se encarga de establecer el armario inferior
        alturaDisponible = canvas.height - distanciaEntreArmarios;
        this.xArmario = canvas.width - 50;
        this.yArmario = canvas.height - Math.round(Math.random() * (alturaDisponible - 1) + 1);
        this.altura = canvas.height - this.yArmario;
        this.anchura = 60;
    }

    static generarArmarioSuperior(armarioInferior){
        let armarioSuperior = [];

        armarioSuperior[0] = canvas.width - 50; //Posición X del armario
        armarioSuperior[1] = 0; //Posición Y del armario
        armarioSuperior[2] = 60 ; //Anchura del armario
        armarioSuperior[3] = alturaDisponible - armarioInferior.altura; //Altura del armario

        return armarioSuperior;
    }
}