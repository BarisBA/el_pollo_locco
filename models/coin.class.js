class Coin extends MovableObject {
    height = 125;
    width = 125;
    y = 100;
    x = 300;

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = 300 +Math.random() * 1450; // Zahl zwischen 200 & 700
    }
}