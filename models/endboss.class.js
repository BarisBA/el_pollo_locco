class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    energy = 50;

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ENDBOSS_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);

        this.x = 2500;
        this.speed = 0.8;

        this.animate();
    }

    animate() {
        /*
        setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 350);
*/
        setInterval(() => {
            this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
        }, 300);

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}