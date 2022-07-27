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
    bottleCollision = false;
    attack = false;
    gameOver = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();

        setTimeout(() => {
            this.checkGameOver();
        }, 10000);
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollsions();
            this.checkForThrow();
            this.checkCoinsCollected();
            this.checkSecondLife();
        }, 200);

    }

    checkCollsions() {
        //console.log(this.character.x )
        this.collidingEnemy();
        this.collidingBottle();
        this.collidingCoin();
        this.collidingThrowableObject();
        this.collidingEndboss();
    }

    collidingEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy) && this.character.isAboveGround()) {
                enemy.hit();
            } else if (this.character.isColliding(enemy) || this.character.isColliding(this.endboss)) {
                if (enemy.energy > 0 && this.endboss.energy > 0) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    collidingBottle() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.character.collectBottles();
                this.statusBarBottle.setPercentage(this.character.collectedBottles);

                if (this.character.collectedBottles < 100) {
                    this.level.bottles.splice(index, 1);
                }
            }
        });
    }

    collidingCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.character.isAboveGround()) {
                this.character.collectCoins();
                this.statusBarCoin.setPercentage(this.character.collectedCoins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    collidingThrowableObject() {
        this.throwableObjects.forEach((to, index) => {
            if (to.isColliding(this.endboss)) {
                this.endboss.hit();
                this.statusbarEndboss.setPercentage(this.endboss.energy);
                to.bottleCollision();
                setTimeout(() => {
                    this.throwableObjects.splice(index, 1)
                }, 150);
                
            }
        });
    }

    collidingEndboss() {
        if (this.character.isColliding(this.endboss)) {
            this.endboss.attackCharacter();
        }
    }

    checkForThrow() {
        if (this.character.collectedBottles >= 20 && this.keyboard.D) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.character.removeCollectedBottle();
            this.statusBarBottle.setPercentage(this.character.collectedBottles);
        }
    } 

    checkCoinsCollected() {
        if (this.character.collectedCoins == 100) {
            this.character.secondLife = true; 
        }
    }

    checkSecondLife() {
        if (this.keyboard.G && this.character.secondLife == true) {
            this.character.energy = 100;
            this.statusBarHealth.setPercentage(this.character.energy);
        }
    }

    checkGameOver() {
            if (this.character.isDead()) {          
                this.gameOver = true;
                this.gameIsOver();
            } else if (this.endboss.isDead()) {          
                this.gameOver = true;    
                this.gameIsOver();
            }
    }

    gameIsOver() {
        if (this.gameOver == true) {
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('controls').classList.add('d-none');
            document.getElementById('gameOverScreen').classList.remove('d-none')
            document.getElementById('restartButton').classList.remove('d-none') 
           
        } this.gameOver = false;
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

        if (this.character.x > 1300) {
            this.addToMap(this.statusbarEndboss);
        }
        
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