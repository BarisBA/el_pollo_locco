class Chicken extends MovableObject {
    height = 60;
    width = 60;
    y = 360;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.x = 250 +Math.random() * 750; // Zahl zwischen 200 & 700
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
    }
}