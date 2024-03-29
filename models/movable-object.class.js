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
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

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
        } else if (this instanceof Character) {
            return this.y < 165;
        } else if (this instanceof SmallChicken){
            return this.y < 365;
        } else if (this instanceof Endboss) {
            return this.y < 65;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && 
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && 
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
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

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000; // difference in s
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0; 
    }

    collectCoins() {
        this.collectedCoins += 10;
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
        if (this instanceof Endboss) {
            this.speedY = 30;
        } else {
            this.speedY = 20;
        }
    }
}