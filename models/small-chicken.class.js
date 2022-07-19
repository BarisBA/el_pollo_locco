class SmallChicken extends MovableObject {
    height = 45;
    width = 45;
    y = 375;
    energy = 10;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_SMALLCHICKEN_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 400 +Math.random() * 1200; // Zahl zwischen 200 & 700
        this.speed = 0.15 + Math.random() * 0.4;

        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        
        let isDeadInterval = setInterval(() => { // noch NACHFRAGEN!
            if (this.isDead()) {
                this.loadImage(this.IMAGES_SMALLCHICKEN_DEAD);  
                clearInterval(isDeadInterval);     
            } 
        }, 1000);
    }
}