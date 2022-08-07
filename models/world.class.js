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
    gameOver = false;
    gameWin = false;
    win_sound = new Audio('audio/win.mp3');
    heal_up_sound = new Audio('audio/heal_up.mp3');
    coin_sound = new Audio('audio/coin.mp3');
    bottle_throw_sound = new Audio('audio/bottle_throw.mp3');
    bottle_collect_sound = new Audio('audio/collect_bottle.mp3');
    bottle_shattered_sound = new Audio('audio/bottle_shattered.mp3');
    character_hurt_sound = new Audio('audio/character_hurt.mp3');
    chicken_dead_sound = new Audio('audio/chicken.mp3');
    endboss_sound = new Audio('audio/endboss_sound.mp3');

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
        let runInterval = setInterval(() => {
            this.checkCollsions();
            this.checkForThrow();
            this.checkCoinsCollected();
            this.checkSecondLife();
            this.checkGameOver(runInterval);
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
                this.chicken_dead_sound.play();
            } else if (this.character.isColliding(enemy) && !this.character.isHurt() || this.character.isColliding(this.endboss) && !this.character.isHurt()) {
                if (enemy.energy > 0 && this.endboss.energy > 0) {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                    this.character_hurt_sound.play();
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
                    this.bottle_collect_sound.play();
                }
            }
        });
    }

    collidingCoin() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && this.character.isAboveGround()) {          
                this.character.collectCoins();
                this.statusBarCoin.setPercentage(this.character.collectedCoins);

                if (this.character.collectedCoins <= 100) {
                    this.level.coins.splice(index, 1);
                    this.coin_sound.play();
                }
            }
        });
    }

    collidingThrowableObject() {
        this.throwableObjects.forEach((to, index) => {
            if (to.isColliding(this.endboss)) {
                this.endboss.hit();
                this.bottle_shattered_sound.play();
                this.endboss_sound.play();
                this.statusbarEndboss.setPercentage(this.endboss.energy);
                to.bottleCollision();

                setTimeout(() => {
                this.throwableObjects.splice(index, 1)                 
                }, 200);

            } else if (to.y > 255) {
                this.bottle_shattered_sound.play();
                to.bottleCollision();

                setTimeout(() => {
                this.throwableObjects.splice(index, 1)                 
                }, 100);
            }
        });
    }

    collidingEndboss() {
        if (this.endboss.isColliding(this.character)) {
            this.endboss.attackCharacter();
        }
    }

    checkForThrow() {
        if (this.character.collectedBottles >= 20 && this.keyboard.D) {///////////////////////////////////////
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            bottle.bottleRotation = true;
            this.character.removeCollectedBottle();
            this.statusBarBottle.setPercentage(this.character.collectedBottles);
            this.bottle_throw_sound.play();
        }
    } 

    checkCoinsCollected() {
        if (this.character.collectedCoins == 100) {
            this.character.secondLife = true; 
        }
    }

    checkSecondLife() {
        if (this.keyboard.G && this.character.secondLife == true) {
            this.heal_up_sound.play();
            this.character.secondLife = false;
            this.character.energy = 100;
            this.statusBarHealth.setPercentage(this.character.energy);
            this.character.collectedCoins = 0
            this.statusBarCoin.setPercentage(this.character.collectedCoins);
            this.checkCollsions();
        }
    }

    checkGameOver(runInterval) {
            if (this.character.isDead()) {          
                this.gameOver = true;
                this.gameIsOver(runInterval);
            } else if (this.endboss.isDead()) {          
                this.gameWin = true;    
                this.gameIsOver(runInterval);
                this.win_sound.play();
            }
    }

    gameIsOver(runInterval) {
        if (this.gameOver == true) {
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('controls').classList.add('d-none');
            document.getElementById('fullscreen').classList.add('d-none');
            document.getElementById('gameOverScreen').classList.remove('d-none')
            document.getElementById('restartButton').classList.remove('d-none') 
        } else if (this.gameWin == true) {
            document.getElementById('canvas').classList.add('d-none');
            document.getElementById('controls').classList.add('d-none');
            document.getElementById('fullscreen').classList.add('d-none');
            document.getElementById('winningScreen').classList.remove('d-none')
            document.getElementById('startButton').classList.remove('d-none') 
        }
        clearInterval(runInterval);
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

        if (this.character.x > 1300 || this.endboss.attackCharacter) {
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