class ThrowableObject extends MovableObject {
    bottleIsColliding = false;
    bottleRotation = false;
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;

        this.loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);

        if (world.character.otherDirection == true) {
            this.throwLeft(-150, -100); 
        } else {
            this.throw(100, 150);
        }
        
    }

    throw() {
        this.speedY = 15;

        this.applyGravity();

        setInterval(() => {
            this.x += 15;
        }, 40);

        this.animate();
    }

    throwLeft() {
        this.speedY = 15;

        this.applyGravity();

        setInterval(() => {
            this.x -= 20;
        }, 40);

        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.bottleRotation == true) {
                this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
            }
        }, 100);

        setInterval(() => {
            if (this.bottleIsColliding == true) {
                this.playAnimation(this.IMAGES_BOTTLE_SPLASH); 
            }
        }, 100);
    }
}