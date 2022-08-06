let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function startGame() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('fullscreen').classList.remove('d-none');
    initLevel();
}

function restartGame() {
    document.getElementById('gameOverScreen').classList.add('d-none')
    document.getElementById('winningScreen').classList.add('d-none')
    startGame();
    world = new World(canvas, keyboard);
}

function controls() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none')
    document.getElementById('fullscreen').classList.add('d-none')
    document.getElementById('controls').classList.remove('d-none');
}

function backToStart() {
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('help').classList.add('d-none');
}

function help() {
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('gameOverScreen').classList.add('d-none')
    document.getElementById('fullscreen').classList.add('d-none')
    document.getElementById('help').classList.remove('d-none');
}

function requestFullscreen() {
    requestFullscreen();
}

window.addEventListener('keydown',(event) => {
    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }

    if (event.keyCode == 70) {
        keyboard.F = true;
    }

    if (event.keyCode == 71) {
        keyboard.G = true;
    }
    //console.log(event)
});

window.addEventListener('keyup',(event) => {
    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }
    
    if (event.keyCode == 68) {
        keyboard.D = false;
    }

    if (event.keyCode == 70) {
        keyboard.F = false;
    }

    if (event.keyCode == 70) {
        keyboard.G = false;
    }
});