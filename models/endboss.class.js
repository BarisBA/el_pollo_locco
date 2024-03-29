class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 50;
    energy = 50;
    firstContact = false;
    allowBottleThrow = false;
    offset = {
        top: 90,
        left: 40,
        right: 50,
        bottom: 40
    }
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

    IMAGES_ENDBOSS_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ENDBOSS_WALKING);
        this.loadImages(this.IMAGES_ENDBOSS_HURT);
        this.loadImages(this.IMAGES_ENDBOSS_DEAD);
        this.loadImages(this.IMAGES_ENDBOSS_ATTACK);

        this.x = 2500;
        this.speed = 1.5;

        this.applyGravity();
        this.animate();
    }

    animate() {
        let i = 0;
        
        let endbossInterval = setInterval(() => {
            if (i < 8) {
                this.playAnimation(this.IMAGES_ALERT);
            } else {
                this.playAnimation(this.IMAGES_ENDBOSS_WALKING);
            }
            i++
            if (world.character.x > 1500 && !this.firstContact) {
                i = 0;
                this.firstContact = true;
            }
            }, 200);

        let isDeadInterval = setInterval(() => {
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_ENDBOSS_HURT);
            }

            else if (this.isDead()) {
                clearInterval(endbossInterval);
                clearInterval(moveInterval);
                clearInterval(attackInterval);
                this.playAnimation(this.IMAGES_ENDBOSS_DEAD);

                setTimeout(() => {
                clearInterval(isDeadInterval);
                }, 2000);
            }
        },150);

        let moveInterval = setInterval(() => {
            if (world.character.x > this.x) {
                this.moveRight();
                this.speed = 2.5;
                this.otherDirection = true;  
            } else if (this.firstContact == true && i > 8) {
                this.moveLeft();
                this.speed = 2;
                this.otherDirection = false;
            } 

        }, 1000 / 60);

        setInterval(() => { 
            if (i > 8 && !this.isAboveGround() && !this.isDead()) {
                this.jump();
            }
        }, 3000);

        let attackInterval = setInterval(() => {
            if (this.attack == true) {
                this.playAnimation(this.IMAGES_ENDBOSS_ATTACK);
            } 
        },150);
    }
}