let level1;
function initLevel() {
    level1 = new Level(
        enemies = [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken()
        ],
        endboss = [
            new Endboss()
        ],
        clouds = [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
        ],
        backgroundObjects = [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
    
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
    
            new BackgroundObject('img/5_background/layers/air.png', 719 *2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 *2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 *2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 *2),
    
            new BackgroundObject('img/5_background/layers/air.png', 719 *3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 *3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 *3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 *3),
        ],
        coins = [
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin(),
            new Coin()
        ],
        bottles = [
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle(),
            new Bottle()
        ]
    );
   } 