class Coin extends MovableObject {
    height = 125;
    width = 125;
    y = 200;
    x = 300;

    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = 200 +Math.random() * 550; // Zahl zwischen 200 & 700
    }
}