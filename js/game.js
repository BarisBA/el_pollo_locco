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

function muteAll() {
    character_hurt_sound = false;
}

function soundON() {
    character_hurt_sound = true;
}

function requestFullscreen() {
    requestFullscreen();
}

function mobileMoveLeft() {
    keyboard.LEFT = true;
}

function endMoveLeft() {
    keyboard.LEFT = false;
}

function mobileMoveRight() {
    keyboard.RIGHT = true;
}

function endMoveRight() {
    keyboard.RIGHT = false;
}

function mobileJump() {
    keyboard.SPACE = true;
}

function endJump() {
    keyboard.SPACE = false;
}

function mobileThrow() {
    keyboard.D = true;
}

function endThrow() {
    keyboard.D = false;
}