class Coin extends MovableObject {
    height = 100;
    width = 100;
    y = 120;
    x = 300;
    offset = {
        top: 30,
        left: 70,
        right: 70,
        bottom: 30
    }
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = 300 +Math.random() * 1800; // Zahl zwischen 200 & 700
    }
}