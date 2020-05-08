class GameScene extends Phaser.Scene {
    timer;
    moveEnemyTimer;

    constructor() {
        super(CONSTANTS.SCENE.INGAME.NAME);
        this.timer = 0;
        this.moveEnemyTimer = 0;
        this.weapon = [];
    }

    /*
    init(config){
        this.spawnSpeed = config.spawnSpeed;
        this.maxEnemies = config.maxEnemies;
        this.hero = config.hero;
        this.movePercentage = config.movePercentage
        this.shootPercentage = config.shootPercentage
        this.moveTime = config.moveTime
    }
    */
    preload() {
        // Load Background
        var hero = 6;
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        // Load Hero
        this.load.image(CONSTANTS.SCENE.INGAME.HERO.NAME, "assets/Sprites/Ally/heroi_" + hero + ".png");
        // Load Enemies
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[0][0], "assets/Sprites/Enemy/evil_1.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[0][1], "assets/Sprites/Enemy/evil_1_66.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[0][2], "assets/Sprites/Enemy/evil_1_33.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[1][0], "assets/Sprites/Enemy/evil_2.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[1][1], "assets/Sprites/Enemy/evil_2_66.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[1][2], "assets/Sprites/Enemy/evil_2_33.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[2][0], "assets/Sprites/Enemy/evil_3.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[2][1], "assets/Sprites/Enemy/evil_3_66.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[2][2], "assets/Sprites/Enemy/evil_3_33.png");
        // Load Bullets
        this.load.image(CONSTANTS.SCENE.INGAME.BULLET.NAMES[0], "assets/Sprites/Others/tiro_inimigo.png");
        this.load.image(CONSTANTS.SCENE.INGAME.BULLET.NAMES[1], "assets/Sprites/Others/tiro_vermelho.png");
        this.load.image(CONSTANTS.SCENE.INGAME.BULLET.NAMES[2], "assets/Sprites/Others/tiro_azul.png");
        this.load.image(CONSTANTS.SCENE.INGAME.BULLET.NAMES[3], "assets/Sprites/Others/tiro_verde.png");
        // Load Weapons
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.NORMAL[0], "assets/Sprites/Weapon/arma1.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.NORMAL[1], "assets/Sprites/Weapon/arma2.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.NORMAL[2], "assets/Sprites/Weapon/arma3.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.SELECTED[0], "assets/Sprites/Weapon/arma1_s.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.SELECTED[1], "assets/Sprites/Weapon/arma2_s.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.SELECTED[2], "assets/Sprites/Weapon/arma3_s.png");
        // Load Health Bar frame
        this.load.spritesheet(CONSTANTS.SCENE.INGAME.HEALTHBAR.NAME, "assets/sprites/Others/bar_frame.png", {
            frameHeight: CONSTANTS.SCENE.INGAME.HEALTHBAR.HEIGHT,
            frameWidth: CONSTANTS.SCENE.INGAME.HEALTHBAR.WIDTH
        });
    }

    create() {
        var startingWeapon = 1;
        // Add Background
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        // Listeners
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // Add Hero
        this.player = new Hero(this, startingWeapon);
        // Weapons
        for (let i = 0; i < 3; i++) {
            this.weapon[i] = new Weapon(this, i + 1);
            this.weapon[i].depth = CONSTANTS.SCENE.INGAME.WEAPON.DEPTH;
        }
        // Starting weapon
        this.weapon[startingWeapon - 1].focus(true);
        // Creating Group for Enemies
        this.enemies = this.physics.add.group();
        // Creating a Group for Hero Bullets
        this.heroBullets = this.physics.add.group();
        // Creating a Group for Enemy Bullets
        this.enemyBullets = this.physics.add.group();
        // Bounding Box Collisions
        this.physics.add.overlap(this.enemies, this.heroBullets, this.bulletHitHandler, null, this);
        this.physics.add.overlap(this.player, this.enemyBullets, this.bulletHitHandler, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.playerEnemyCollideHandler, null, this);
        //Heart and Animation
        this.heart = this.add.sprite(CONSTANTS.CANVAS.WIDTH * CONSTANTS.SCENE.INGAME.HEALTHBAR.XPERCENTAGE, CONSTANTS.CANVAS.HEIGHT * CONSTANTS.SCENE.INGAME.HEALTHBAR.YPERCENTAGE, CONSTANTS.SCENE.INGAME.HEALTHBAR.NAME).setOrigin(0, 0).setScale(CONSTANTS.SCENE.INGAME.HEALTHBAR.SCALE);
        this.heart.depth = 100;
        this.anims.create({
            key: CONSTANTS.SCENE.INGAME.HEALTHBAR.ANIMATION,
            frameRate: 3,
            repeat: 1,
            frames: this.anims.generateFrameNumbers(CONSTANTS.SCENE.INGAME.HEALTHBAR.NAME, {frames: [1, 0]})
        });
        // Health Bar
        this.healthBar = new HealthBar(this, this.heart.x, this.heart.y, this.player.lifePoints);
    }


    update() {
        // Increments
        this.timer += 16; // so every real 16ms, we increment timer += 16 (ms)
        this.moveEnemyTimer += 16;
        this.background.tilePositionY -= 0.2;
        // Spawner
        if (this.timer > CONSTANTS.SCENE.INGAME.ENEMY.SPAWNSPEED) {
            this.timer = 0;
            new Enemy(this);
        }
        // To stop all enemy ships when moveTime reaches half of self
        if (this.moveEnemyTimer > CONSTANTS.SCENE.INGAME.ENEMY.ACTIONTIME / 2) {
            for (let i = 0; i < this.enemies.getChildren().length; i++) {
                this.enemies.getChildren()[i].stop();
            }
        }
        // To move enemy ships when moveTime reaches end of self
        if (this.moveEnemyTimer > CONSTANTS.SCENE.INGAME.ENEMY.ACTIONTIME) {
            this.moveEnemyTimer = 0;
            this.enemiesActionHandler();
        }
        // To move Player
        this.movePlayerHandler();
        // To shoot/switch weapon
        this.weaponHandler();
        // To Handle the life bar
        this.healthBarHandler();
        // To update game objects on canvas
        this.renderer();
        /* Debug */
        //console.log("Weapon: " + CONSTANTS.SCENE.INGAME.ENEMY.NAMES[this.player.weaponID - 1])
        //console.log("hero life: " + this.player.lifePoints);
        //console.log("enemies len: "+this.enemies.getChildren().length)
        //console.log("enemies bullets: " + this.enemyBullets.getChildren().length)
    }

    // TODO: Procurar alternativa mais clean
    movePlayerHandler() {
        if (this.cursorKeys.left.isDown && this.cursorKeys.right.isDown) {
            this.player.stop();
        } else if (this.cursorKeys.left.isDown) {
            this.player.moveLeft();
        } else if (this.cursorKeys.right.isDown) {
            this.player.moveRight();
        } else {
            this.player.stop();
        }
    }

    weaponHandler() {
        if (Phaser.Input.Keyboard.JustDown(this.key1)) {
            this.swapFocus(1);
        } else if (Phaser.Input.Keyboard.JustDown(this.key2)) {
            this.swapFocus(2);
        } else if (Phaser.Input.Keyboard.JustDown(this.key3)) {
            this.swapFocus(3);
        }
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            this.player.fire();
        }
    }

    swapFocus(weaponId) {
        this.weapon[this.player.weaponID - 1].focus(false);
        this.player.weaponID = weaponId;
        this.weapon[this.player.weaponID - 1].focus(true);
        this.player.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.NAMES[this.player.weaponID];
    }

    enemiesActionHandler() {
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            if (Math.random() < CONSTANTS.SCENE.INGAME.ENEMY.MOVEPERCENTAGE) {
                if (Math.random() < 0.5) {
                    enemy.moveLeft();
                } else {
                    enemy.moveRight();
                }
            }
            if (Math.random() < CONSTANTS.SCENE.INGAME.ENEMY.FIREPERCENTAGE) {
                enemy.fire();
            }
        }
    }

    renderer() {
        //console.log("bullets:" + this.bullets.getChildren().length + "\nenemies " +this.enemies.getChildren().length)
        for (let i = 0; i < this.heroBullets.getChildren().length; i++) {
            this.heroBullets.getChildren()[i].update();
        }
        for (let i = 0; i < this.enemyBullets.getChildren().length; i++) {
            this.enemyBullets.getChildren()[i].update();
        }
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            this.enemies.getChildren()[i].update();
        }
    }

    bulletHitHandler(ship, bullet) {
        //TODO: if (pixel perfect) do
        bullet.doDamage(ship);
    }

    playerEnemyCollideHandler(player, enemy) {
        //TODO: if (pixel perfect) do
        player.lifePoints -= CONSTANTS.SCENE.INGAME.ENEMY.DAMAGEHEROCOLLISION;
        this.heart.play(CONSTANTS.SCENE.INGAME.HEALTHBAR.ANIMATION);
        enemy.destroy();
    }

    healthBarHandler() {
        this.healthBar.setPercentage(this.player.lifePoints / CONSTANTS.SCENE.INGAME.HERO.LIFEPOINTS);
    }
}