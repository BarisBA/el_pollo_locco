class Bottle extends MovableObject {
    height = 60;
    width = 50;
    offset = {
        top: 6,//10
        left: 10,//20
        right: 18,//40
        bottom: 7//20
    };
    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');

        this.x = 350 +Math.random() * 2000; 
        this.y = 360 
    }
}