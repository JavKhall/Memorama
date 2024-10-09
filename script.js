var comparativa = [];

window.onload = cargarTablero (false);

//Se realiza la carta de casilla en el tablero, segun de donde venga la llamada de la funcion se realizara el primer muestreo de las figuas
function cargarTablero (mostrar) {
    var imagenes = [
        'img/006-cat.svg',
        'img/007-koi.svg',
        'img/019-dog.svg',
        'img/020-fish.svg',
        'img/021-fox.svg',
        'img/024-pine tree.svg',
        'img/025-mountain.svg',
        'img/034-bird.svg',
        'img/036-sun.svg',
        'img/039-bird.svg',
    ];

    let tablero = document.getElementById('tablero');
    let cartas = [];

    // original col-1 m-5 mt-xl-1
    //col-7 mt-5 col-sm-4 col-md-3 col-lg-2 m-2 mt-xl-5
    for (let i = 0; i < 20; i++) {
        cartas.push(`
            <div class="col-4 m-2 col-md-2 col-xl-2 m-xl-3">
                <div class="color rounded"> 
                    <img src="${imagenes[0]}" class="img-fluid rounded imagen oculto" alt="...">
                </div>
            </div>    
        `);

        if (i%2==1) {
            imagenes.splice(0,1); //elimina el primer elemento a cada vuelta impar
        }
    }

    cartas.sort(() => Math.random() - 0.5);
    tablero.innerHTML = cartas.join(" ");

    //console.log(mostrar);

    //Solo se mostrara la figuras si viene la llamada desde el boton
    if (mostrar){
        setTimeout (() => {
            mostrarTablero();
        }, 300);
    }    
}

//muetra el tableo por un tiempo para inciar el juego
function mostrarTablero () {
    let cartas = document.querySelectorAll('.imagen');

    for (let i = 0; i < cartas.length; i++) {
        let caja = cartas[i].parentElement;

        efectoEntrada (cartas[i], caja);
    }

    setTimeout (() => {
        for (let i = 0; i < cartas.length; i++) {
            let caja = cartas[i].parentElement;
    
            efectoSalida (cartas[i], caja);
        }
    }, 1000);
}

//evento sobre el cuerpo del pagina donde estan las figuras
var contenedor = document.getElementById('contenedor').addEventListener('click', (e) => {
    let demo = e.target;

    if (demo.classList.contains('imagen')) {   
        let imagen = e.target; 
        let caja = e.target.parentElement;
        
        if (imagen.classList.contains('oculto')) {
        imagen.classList.remove('oculto');
        comparativa.push(imagen);
        efectoEntrada (imagen, caja);
        }

        if (comparativa.length == 2) {
            verificacion(comparativa);
        }
    }
});

//Evento sobre el boton para iniciar el juego
var inicio = document.getElementById('inicio').addEventListener('click', (e)=>{
    console.log (e.target);
    cargarTablero(true);
});

//Verificancion de las dos figura reveladas
function verificacion (vector) {
    if (vector[0].src == vector[1].src) {
        setTimeout(()=>{
            sonIguales(vector);
        }, 500);
        
    } else { 
        setTimeout(()=>{
            sonDiferetes(vector);
        }, 500);
    }
    
}

function sonIguales (vector) {
    for (let i=0; i<vector.length; i++) {
        vector[i].classList.add('resuelto');
    }
    vector.splice(0,2);
}

function sonDiferetes (vector){ 
    for (let i = 0; i < vector.length; i++) {
        let caja = vector[i].parentElement;

        efectoSalida (vector[i], caja);
    }
    vector.splice(0, 2);
}

//Efecto de entrada y salida de cada figura
function efectoEntrada (imagen, caja) {
    caja.classList.add('color_click');
    imagen.classList.add('imagen_entrada');
}

function efectoSalida (imagen, caja) {
    caja.classList.remove('color_click');
    imagen.classList.replace('imagen_entrada', 'oculto');
    // imagen.addEventListener('transitionend', (e) => e.target.classList.remove('imagen_salida'));
}