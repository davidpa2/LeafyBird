var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Coordenadas iniciales de la bola
var x = canvas.width / 2;
var y = canvas.height / 2;
var dy = 2; //Decremento de la y para que caiga constantemente
var tamannoBola = 40; //Tamaño de la bola para detectar las colisiones
var velocidadArmario = 2;
var nivel = 1;
var clickPulsado = false;
var espacioPulsado = false;
var alturaDisponible;
var distanciaEntreArmarios = 160;
var puntos = 0;
//Armarios
var armarioInferior = new Armario();
var armarioSuperior = Armario.generarArmarioSuperior(armarioInferior);
var nuevoArmario = true; //Variable booleana que servirá para controlar la puntuación
//Imágenes
var imgArmario = new Image();
imgArmario.src = "/images/Armario.jpg";
var imgArmarioI = new Image();
imgArmarioI.src = "/images/Armario'.jpg";
var imgBola = new Image();
imgBola.src = "/images/Sol.png";
var imgBosque = new Image();
imgBosque.src = "/images/Bosque.jpg";
//Audio
const musicaAmbiente = new Audio('/sound/Ambiente.mp3');
musicaAmbiente.play();
musicaAmbiente.loop = true;
const perder = new Audio('/sound/Perder.mp3');
const subirNivel = new Audio('/sound/SubirNivel.mp3');

let finDelJuego = false;
draw(); //Comenzar el juego pintando todos los elementos
var trascurso = setInterval(draw, 10);


//Recoger el evento de cuando se pulsa el espacio
document.addEventListener("keyup", pulsarEspacio, false);
function pulsarEspacio(e) {
    if (e.keyCode == 32) {
        espacioPulsado = true;
        if (finDelJuego) {
            document.location.reload();
        }
    }
}

canvas.addEventListener("click", pulsarClick, false);
function pulsarClick(e) {
    //if (e.keyCode == 65) {
        clickPulsado = true;
        if (finDelJuego) {
            document.location.reload();
        }
    //}
}


/**
 * Pintar bola
 */
function drawBall() {
    ctx.beginPath();
    //ctx.arc(x, y, tamannoBola, 0, Math.PI * 2);
    //ctx.fillStyle = "#0095DD";
    ctx.drawImage(imgBola, x, y, tamannoBola, tamannoBola);
    ctx.closePath();
}

function drawDrawers() {
    if (armarioInferior.xArmario < 0) {
        armarioInferior = new Armario();
        armarioSuperior = Armario.generarArmarioSuperior(armarioInferior);
        nuevoArmario = true;
    }

    ctx.beginPath();
    //ctx.fillStyle = "#00FF00";
    //ctx.fillRect(armarioInferior.xArmario -= 2, armarioInferior.yArmario, armarioInferior.anchura, armarioInferior.altura);            
    ctx.drawImage(imgArmario, armarioInferior.xArmario -= velocidadArmario, armarioInferior.yArmario, armarioInferior.anchura, armarioInferior.altura);
    ctx.closePath();

    ctx.beginPath();
    //ctx.fillStyle = "#00FF00";
    //ctx.fillRect(armarioSuperior[0] -= 2, armarioSuperior[1], armarioSuperior[2], armarioSuperior[3]);
    ctx.drawImage(imgArmarioI, armarioSuperior[0] -= velocidadArmario, armarioSuperior[1], armarioSuperior[2], armarioSuperior[3]);
    ctx.closePath();
}

function drawBackground() {
    ctx.beginPath();
    //ctx.fillStyle = "#0095DD";
    ctx.drawImage(imgBosque, 0, 0, canvas.width, canvas.height);
    ctx.closePath();
}

function comprobarImpacto() {
    let hayImpacto = false;
    //Colisión lateral armario inferior
    if (x + tamannoBola == armarioInferior.xArmario && y > armarioInferior.yArmario) {
        hayImpacto = true;
    }
    //Colisión superior armario inferior
    if (y + tamannoBola > armarioInferior.yArmario && x > armarioInferior.xArmario && x < armarioInferior.xArmario + armarioInferior.anchura) {
        hayImpacto = true;
    }
    //Colisión lateral armario superior
    //x == xArmario         &&          y < yArmario + altura
    if (x + tamannoBola == armarioSuperior[0] && y < armarioSuperior[1] + armarioSuperior[3]) {
        hayImpacto = true;
    }
    //Colisión inferior armario superior
    //y < yArmario + altura         &&          x > xArmario        &&      x < xArmario + anchura
    if (y < armarioSuperior[1] + armarioSuperior[3] && x > armarioSuperior[0] && x < armarioSuperior[0] + armarioSuperior[2]) {
        hayImpacto = true;
    }

    return hayImpacto;
}

function comprobarPunto() {
    /*console.log(canvas.width / 2)
    console.log(armarioInferior.xArmario + armarioInferior.anchura + 1)*/
    /*if (canvas.width / 2 == armarioInferior.xArmario + armarioInferior.anchura || canvas.width / 2 == armarioInferior.xArmario + armarioInferior.anchura + 2) {
        puntos++;
    }*/
    if (canvas.width / 2 > armarioInferior.xArmario && nuevoArmario) {
        puntos++;
        nuevoArmario = false;
    }
    //y > armarioX + altura
    /*console.log("y" + y);
    if (y > armarioSuperior[1] + armarioSuperior[3] && y + tamannoBola < armarioInferior.altura && x + tamannoBola == armarioInferior.xArmario) {
        puntos++;
    }
    console.log("altura" + armarioSuperior[3])*/

    ctx.font = "25px Times";
    ctx.fillStyle = "white";
    ctx.fillText("Puntos: " + puntos, 10, 25);
    ctx.fillText("Nivel: " + nivel, 10, 55);

    //Sistema de niveles
    switch (puntos) {
        case 5:
            velocidadArmario = 3;
            nivel = 2;
            ctx.font = "35px Times";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Más rápido!", 240, 200);
            subirNivel.play();
            break;

        case 10:
            distanciaEntreArmarios = 135;
            nivel = 3;
            ctx.font = "35px Times";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Menos espacio!", 240, 200);
            subirNivel.play();
            break;

        case 15:
            velocidadArmario = 3.5;
            nivel = 4;
            ctx.font = "35px Times";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Aún más rápido!", 200, 200);
            subirNivel.play();
            break;

        case 20:
            distanciaEntreArmarios = 115;
            nivel = 5;
            ctx.font = "35px Times";
            ctx.fillStyle = "lightgreen";
            ctx.fillText("Mucho menos espacio!", 150, 200);
            subirNivel.play();
            break;
        default:
            break;
    }
}

/**
 * Dibujar y gestionar el canvas
 */
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //Borrar el canvas para repintarlo
    drawBackground()
    drawBall(); //Redibujar la bola en cada momento
    drawDrawers();
    comprobarPunto();
    let impacto = comprobarImpacto();
    //let impacto = false;

    //Hay que saber cuando se ha pulsado el espacio para subir la bola
    if (espacioPulsado || clickPulsado) {
        if (y > 0) {
            if (y < 100 && y > 0) {
                y = 60 - y;
            } else {
                y -= 60;
            }
            espacioPulsado = false;
            clickPulsado = false;
        }
    } else if (y + dy > canvas.height - tamannoBola || impacto) { //Fin del juego si la bola toca el borde inferior
        ctx.font = "70px Times";
        ctx.fillStyle = "lightgreen";
        ctx.fillText("¡Has perdido!", 110, 220);
        finDelJuego = true;
        clearInterval(trascurso);
        perder.play();
    }
    y += dy;
}