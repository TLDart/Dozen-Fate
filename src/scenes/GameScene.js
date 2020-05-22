class GameScene extends Phaser.Scene {
    timer;
    moveEnemyTimer;

    constructor() {
        super(CONSTANTS.SCENE.INGAME.NAME);
    }

    init(config) {
        this.timer = 0;
        this.moveEnemyTimer = 0;
        this.bulletRegenerationTimer = 0;
        this.weapon = [];
        this.arcadeMode = false;
        this.difficulty = config.difficulty + 1;
        if (config.difficulty === -1) {
            this.arcadeMode = true;
            this.difficulty = 12;
        }
        this.record = false;
        this.maxEnemies = 3 * this.difficulty;
        this.cookies = config.cookies;
        this.heroNumber = this.cookies.ships.indexOf(2) + 1;
        this.spawnSpeed = CONSTANTS.SCENE.INGAME.ENEMY.SPAWNSPEED + 100 * (12 - this.difficulty);
        this.movePercentage = CONSTANTS.SCENE.INGAME.ENEMY.MOVEPERCENTAGE * (1 - this.difficulty / 12);
        this.shootPercentage = CONSTANTS.SCENE.INGAME.ENEMY.FIREPERCENTAGE;
        this.moveTime = CONSTANTS.SCENE.INGAME.ENEMY.ACTIONTIME + this.difficulty / 2;
    }

    preload() {
        // Load win/esc menu
        this.load.image(CONSTANTS.SCENE.INGAME.MENU.NAME, "assets/Sprites/UI/LevelWin.png");
        // Load Background
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.INGAME.COGWHEEL.NAME, "assets/Sprites/Others/cogwheel.png");
        // Load Hero
        this.load.image(CONSTANTS.SCENE.INGAME.HERO.NAME[this.heroNumber], "assets/Sprites/Ally/heroi_" + this.heroNumber + ".png");
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
        this.load.image(CONSTANTS.SCENE.INGAME.BULLET.AMMO, "assets/Sprites/Others/multi.png");
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
        this.load.bitmapFont(CONSTANTS.SCENE.INGAME.GAMEOVER.FONT, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt");
        this.load.bitmapFont(CONSTANTS.SCENE.INGAME.BULLET.FONT, "assets/Fonts/joystix/joystix_black.png", "assets/Fonts/joystix/joystix_black.fnt");
    }

    create() {
        this.score = 0;
        this.bulletCounter = CONSTANTS.SCENE.INGAME.BULLET.START;
        var startingWeapon = 1;
        // Add Background, UI and Texts
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.cogWheel = this.add.sprite(CONSTANTS.CANVAS.WIDTH, 0, CONSTANTS.SCENE.INGAME.COGWHEEL.NAME).setScale(CONSTANTS.SCENE.INGAME.COGWHEEL.SCALE).setOrigin(1, 0).setDepth(CONSTANTS.SCENE.INGAME.GAMEOVER.DEPTH).setInteractive();
        this.gameOverText = this.add.bitmapText(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.CANVAS.HEIGHT * CONSTANTS.SCENE.INGAME.GAMEOVER.Y, CONSTANTS.SCENE.INTRO.TEXT.NAME, CONSTANTS.SCENE.INGAME.GAMEOVER.MESSAGE, CONSTANTS.SCENE.INGAME.GAMEOVER.FONTSIZE).setOrigin().setDepth(CONSTANTS.SCENE.INGAME.GAMEOVER.DEPTH).setVisible(false);
        this.underText = this.add.bitmapText(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.CANVAS.HEIGHT * CONSTANTS.SCENE.INGAME.GAMEOVER.UNDER.Y, CONSTANTS.SCENE.INTRO.TEXT.NAME, CONSTANTS.SCENE.INGAME.GAMEOVER.UNDER.MESSAGE, CONSTANTS.SCENE.INGAME.GAMEOVER.FONTSIZE / 3).setOrigin().setDepth(CONSTANTS.SCENE.INGAME.GAMEOVER.DEPTH).setVisible(false);
        this.scoreText = this.add.bitmapText(0, 0, CONSTANTS.SCENE.INTRO.TEXT.NAME, "Score ", 16).setDepth(CONSTANTS.SCENE.INGAME.GAMEOVER.DEPTH);
        this.multiBullet = this.add.image(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.CANVAS.HEIGHT * 0.96, CONSTANTS.SCENE.INGAME.BULLET.AMMO).setDepth(CONSTANTS.SCENE.INGAME.GAMEOVER.DEPTH - 1);
        this.bulletCounterText = this.add.bitmapText(this.multiBullet.x + 0.1 * this.multiBullet.width, this.multiBullet.y + 0.2 * this.multiBullet.height, CONSTANTS.SCENE.INGAME.BULLET.FONT, this.bulletCounter, 16).setOrigin().setDepth(CONSTANTS.SCENE.INGAME.GAMEOVER.DEPTH);
        // Keyboard Listeners
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        // Mouse Listeners
        this.cogWheel.on("pointerdown", this.quitScene, this);
        // Add Hero
        this.player = new Hero(this, startingWeapon, this.heroNumber);
        // Weapons
        for (let i = 0; i < 3; i++) {
            this.weapon[i] = new Weapon(this, i + 1);
            this.weapon[i].depth = CONSTANTS.SCENE.INGAME.WEAPON.DEPTH;
        }
        this.weapon[startingWeapon - 1].focus(true);    // Starting weapon
        // Creating Groups and Bounding Box Collisions
        this.enemies = this.physics.add.group();
        this.heroBullets = this.physics.add.group();
        this.enemyBullets = this.physics.add.group();
        this.physics.add.overlap(this.enemies, this.heroBullets, this.bulletHitHandler, null, this);
        this.physics.add.overlap(this.player, this.enemyBullets, this.bulletHitHandler, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.playerEnemyCollideHandler, null, this);
        this.physics.add.overlap(this.enemyBullets, this.heroBullets, this.bulletsCollisionHandler, null, this);
        // Heart Structure and Animation
        this.heart = this.add.sprite(CONSTANTS.CANVAS.WIDTH * CONSTANTS.SCENE.INGAME.HEALTHBAR.XPERCENTAGE, CONSTANTS.CANVAS.HEIGHT * CONSTANTS.SCENE.INGAME.HEALTHBAR.YPERCENTAGE, CONSTANTS.SCENE.INGAME.HEALTHBAR.NAME).setOrigin(0, 0).setScale(CONSTANTS.SCENE.INGAME.HEALTHBAR.SCALE);
        this.heart.depth = CONSTANTS.SCENE.INGAME.WEAPON.DEPTH;
        this.anims.create({
            key: CONSTANTS.SCENE.INGAME.HEALTHBAR.ANIMATION,
            frameRate: 3,
            repeat: 1,
            frames: this.anims.generateFrameNumbers(CONSTANTS.SCENE.INGAME.HEALTHBAR.NAME, {frames: [1, 0]})
        });
        // Bars
        this.healthBar = new Bar(this, this.heart.x, this.heart.y);
        this.reloadBar = new Bar(this, this.multiBullet.getTopLeft().x, this.multiBullet.getTopLeft().y + 0.7 * this.multiBullet.height, this.multiBullet.width, 5, 1);
        this.reloadBar.setOrigin(0.47, 0.5);
        console.log(this.multiBullet)
        // Update Function Control Vars
        this.playing = true;
        this.stopped = true;
        this.transitionInProgress = false;
    }


    update() {
        //console.log(this.maxEnemies + " " + this.playing)
        if (this.playing && this.maxEnemies > 0) {
            // Increments
            this.timer += 16; // so every real 16ms, we increment timer += 16 (ms)
            this.moveEnemyTimer += 16;
            this.bulletRegenerationTimer += 16;
            this.background.tilePositionY -= 0.2;
            // Spawner
            if (this.timer > this.spawnSpeed) {
                this.timer = 0;
                new Enemy(this);
                this.arcadeUpdate();
            }
            // To stop all enemy ships when moveTime reaches half of self
            if (this.moveEnemyTimer > this.moveTime / 2) {
                for (let i = 0; i < this.enemies.getChildren().length; i++) {
                    this.enemies.getChildren()[i].stop();
                }
            }
            // To move enemy ships when moveTime reaches end of self
            if (this.moveEnemyTimer > this.moveTime) {
                this.moveEnemyTimer = 0;
                this.enemiesActionHandler();
            }
            // To regenerate bullets
            if (this.bulletRegenerationTimer > CONSTANTS.SCENE.INGAME.BULLET.RENEG) {
                this.bulletRegenerationTimer = 0;
                this.bulletCounter += CONSTANTS.SCENE.INGAME.BULLET.AMOUNT;
            }
            // To move Player
            this.movePlayerHandler();
            // To shoot/switch weapon
            this.weaponHandler();
            // To Handle the bars
            this.barsHandler();
            // To update game objects on canvas
            this.renderer();
            /* Debug */
            //console.log("Weapon: " + CONSTANTS.SCENE.INGAME.ENEMY.NAMES[this.player.weaponID - 1])
            //console.log("hero life: " + this.player.lifePoints);
            //console.log("enemies len: "+this.enemies.getChildren().length)
            //console.log("enemies bullets: " + this.enemyBullets.getChildren().length)
        } else if (this.maxEnemies <= 0) {
            this.playing = false;
            this.maxEnemies = 1;
            this.gameOverText.setText("You Won!");
        } else if (this.stopped) {
            this.renderer();
            this.player.stop();
            this.spaceTimer = 0;
            this.gameOverText.setVisible(true);
            this.scoreText.setVisible(false);
            this.healthBar.setPercentage(0);
            this.cookies.coins += this.score;
            if (this.maxEnemies === 1) {
                this.healthBar.setVisible(true);
                this.healthBar.setPercentage(1);
            }
            if (this.arcadeMode) {
                if (this.cookies.highscore < this.score) {
                    console.log("passou cookie score")
                    this.cookies.highscore = this.score;
                    this.record = true;
                }
            }
            console.log("record_stop"+this.record)
            this.reloadBar.setPercentage(0);
            this.stopped = false;
        } else if (!this.transitionInProgress) {
            this.heart.setFrame(1); // broken heart
            if (this.record) {
                console.log(this.record)
                this.scoreText.setText("New Personal best: " + this.cookies.highscore);
                this.scoreText.setVisible(true);
            }
            if (this.maxEnemies === 1) {
                this.heart.setFrame(0);
                this.healthBar.setPercentage(1);
            }
            this.spaceTimer += 16; // so every real 16ms, we increment timer += 16 (ms)
            if (this.spaceTimer > CONSTANTS.SCENE.INGAME.GAMEOVER.TIMER) {
                this.spaceTimer = 0;
                this.underText.visible = !this.underText.visible;
            }
            if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
                this.transitionInProgress = true;
                this.underText.visible = true;
                var config = {
                    target: CONSTANTS.SCENE.MENU.NAME,
                    duration: CONSTANTS.SCENE.SPEED.TRANSITION,
                    moveBelow: true,
                    onUpdate: this.transitionOut,
                    data: {logoVisibility: false, bugFix: false, cookies: this.cookies},
                };
                this.scene.transition(config);
            }
        }
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
            if (this.bulletCounter > 0) {
                this.player.fire();
                --this.bulletCounter;
                //TODO: Add sound
            } else {
                //TODO: out of ammo sound
            }
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
            if (Math.random() < this.movePercentage) {
                if (Math.random() < 0.5) {
                    enemy.moveLeft();
                } else {
                    enemy.moveRight();
                }
            }
            if (Math.random() < this.shootPercentage) {
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
        if (this.stopped && Phaser.Input.Keyboard.JustDown(this.escape)) {
            this.quitScene();
        }
        this.labelsUpdater();
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

    bulletsCollisionHandler(bulletA, bulletB) {
        bulletA.destroy();
        bulletB.destroy();
    }


    barsHandler() {
        if (this.player.lifePoints <= 0) {
            this.playing = false;
        }
        this.healthBar.setPercentage(this.player.lifePoints / CONSTANTS.SCENE.INGAME.HERO.LIFEPOINTS);
        this.reloadBar.setPercentage(this.bulletRegenerationTimer / CONSTANTS.SCENE.INGAME.BULLET.RENEG)
    }

    labelsUpdater() {
        if (this.arcadeMode) {
            this.scoreText.setText("Score: " + this.score + "     Highscore:" + this.cookies.highscore);
        } else {
            this.scoreText.setText("Ships Left: " + this.maxEnemies);
        }
        this.bulletCounterText.setText(this.bulletCounter);
    }

    transitionOut(progress) {
        console.log(progress);
        var slow = 1 - progress;
        this.heart.alpha = slow;
        this.player.alpha = slow;
        this.gameOverText.alpha = slow;
        this.underText.alpha = slow;
        this.cogWheel.alpha = slow;
        this.bulletCounterText.alpha = slow;
        this.multiBullet.alpha = slow;
        this.scoreText.alpha = slow;
        this.healthBar.alpha = slow;
        for (let i = 0; i < 3; i++) {
            this.weapon[i].alpha = slow;
        }
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            this.enemies.getChildren()[i].alpha = slow;
        }
        if (progress >= 0.5) {
            this.background.alpha = 1 - 4 * (progress - 0.5) ** 2;
        }
        // TODO: add to const
        this.gameOverText.setFontSize(50 + 100 * progress);
        this.underText.setFontSize(50 / 3 + 100 / 3 * progress);
    }

    quitScene() {
        this.scene.pause();
        this.cursorKeys.left.isDown = false;
        this.cursorKeys.right.isDown = false;
        this.escape.isDown = false;
        this.player.stop();
        this.scene.launch(CONSTANTS.SCENE.QUIT.NAME, {parentScene: this});
    }

    arcadeUpdate() {
        this.spawnSpeed = this.spawnSpeed - 1;
        this.movePercentage = this.movePercentage + 0.005;
        this.shootPercentage = this.shootPercentage + 0.00005;
    }
}