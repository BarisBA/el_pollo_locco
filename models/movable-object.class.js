class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 1.5;
    lastHit = 0;
    collectedBottles = 0;
    collectedCoins = 0;
    secondLife = false;
    attack = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // TO should allways fall
            return true;
        } else {
            return this.y < 165;
        }
    }

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y && 
            this.x < mo.x && 
            this.y < mo.y + mo.height;
    }

    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    attackCharacter() {
        return this.attack = true;
    }

    dontAttackCharacter() {
        return this.attack = false;
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; // difference in s
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0; 
    }

    collectCoins() {
        this.collectedCoins += 20;
        if (this.collectedCoins > 100) {
            this.collectedCoins = 100;
        } 
    }

    collectBottles() {
        this.collectedBottles += 20;
        if (this.collectedBottles > 100) {
            this.collectedBottles = 100;
        } 
    }

    removeCollectedBottle() {
        this.collectedBottles -= 20;
        if (this.collectedBottles < 0) {
            this.collectedBottles = 0;
        } 
    }

    bottleCollision() {
        return this.bottleIsColliding = true;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }
}