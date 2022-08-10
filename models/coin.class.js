class Coin extends MovableObject {
    height = 100;
    width = 100;
    y = 110;
    x = 300;
    offset = {
        top: 30,
        left: 30,
        right: 60,
        bottom: 60
    }
    constructor() {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.x = 300 +Math.random() * 2000; // Zahl zwischen 200 & 700
    }
}