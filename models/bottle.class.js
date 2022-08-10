class Bottle extends MovableObject {
    height = 60;
    width = 50;
    offset = {
        top: 6,//10
        left: 10,//20
        right: 18,//40
        bottom: 7//20
    };
    /*
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];  
    */
    constructor() {
        super();
        this.loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
        //this.loadImages(this.IMAGES_BOTTLE);

        this.x = 350 +Math.random() * 2000; 
        this.y = 360 //125 +Math.random() * 270;
        //this.animate();
    }
    /*
    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE);
        }, 300);
    }
    */
}