class Bottle extends MovableObject {
    height = 60;
    width = 60;
    y = 365;
    x = 300;

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 200 +Math.random() * 550; // Zahl zwischen 200 & 700
    }
}