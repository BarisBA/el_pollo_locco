class Bottle extends MovableObject {
    height = 60;
    width = 50;
    y = 375;
    
    IMAGES_BOTTLE_ON_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];  

    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ON_GROUND);

        this.x = 350 +Math.random() * 750; // Zahl zwischen 200 & 700
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ON_GROUND);
        }, 100);
    }
}