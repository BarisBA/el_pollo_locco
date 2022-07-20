class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    energy = 10;

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

    IMAGES_ENDBOSS_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_ENDBOSS_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);

        this.x = 2500;
        this.speed = 0.8;

        this.animate();
    }

    animate() {
        
        let endbossAlertInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ALERT);
        }, 850);

        let endbossWalkingInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
        }, 800);

        let isDeadInterval = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_ENDBOSS_HURT);
            }

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_ENDBOSS_DEAD);
                clearInterval(endbossAlertInterval);
                clearInterval(endbossWalkingInterval);
                clearInterval(moveLeftInterval);
                clearInterval(isDeadInterval);
            }
        }, 75);

        let moveLeftInterval = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}