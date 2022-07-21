class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBarHealth();
    statusBarCoin = new StatusBarCoin();
    statusBarBottle = new StatusBarBottle();
    statusbarEndboss = new StatusBarEndboss();
    endboss = this.level.endboss[0];
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollsions();
            this.checkForThrow();
        }, 200);
        console.log('endboss', this.endboss.energy);
        console.log('rotation is', this.bottleRotation);
        console.log('collision is', this.bottleCollision);
    }

    checkCollsions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.hit();
                //console.log('enemies energy is', enemy.energy);
            } else if (this.character.isColliding(enemy) || this.character.isColliding(this.endboss)) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
                //console.log('cha', this.character.energy) 
            }
        });
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.statusBarBottle.setPercentage(this.character.collectedBottles);

                if (this.character.collectedBottles < 100) {
                    this.level.bottles.splice(index, 1);
                }
                console.log('bottles collected', this.character.collectedBottles); 
            }
        });
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.character.isAboveGround()) {
                this.character.collectCoins();
                this.statusBarCoin.setPercentage(this.character.collectedCoins);
                this.level.coins.splice(index, 1);
            }
        });
        this.throwableObjects.forEach(to => {
            if (to.isColliding(this.endboss)) {
                this.endboss.hit();
                this.statusbarEndboss.setPercentage(this.endboss.energy);
                console.log('endboss', this.endboss.energy);
                this.ThrowableObject.bottleCollision = true;
                console.log('collision is', this.bottleCollision)
            }
        });
    }

    checkForThrow() {
        if (this.character.collectedBottles >= 20 && this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.removeCollectedBottle();
            this.statusBarBottle.setPercentage(this.character.collectedBottles);
            console.log('rotation is', this.bottleRotation)
            console.log('bottles collected', this.character.collectedBottles); 
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // space for fixed objects
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarBottle);
        this.addToMap(this.statusbarEndboss);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        // draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(obj => {
            this.addToMap(obj);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}