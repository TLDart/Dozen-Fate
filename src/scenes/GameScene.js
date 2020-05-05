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
    }
    */
    preload() {
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.INGAME.HERO.STOP, "assets/Sprites/Ally/heroi_6.png");
        this.load.image(CONSTANTS.SCENE.INGAME.HERO.LEFT, "assets/Sprites/Ally/heroi_6_e.png");
        this.load.image(CONSTANTS.SCENE.INGAME.HERO.RIGHT, "assets/Sprites/Ally/heroi_6_d.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[0], "assets/Sprites/Enemy/evil_1.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.LEFT[0], "assets/Sprites/Enemy/evil_1_d.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.RIGHT[0], "assets/Sprites/Enemy/evil_1_e.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[1], "assets/Sprites/Enemy/evil_2.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.LEFT[1], "assets/Sprites/Enemy/evil_2_d.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.RIGHT[1], "assets/Sprites/Enemy/evil_2_e.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[2], "assets/Sprites/Enemy/evil_3.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.LEFT[2], "assets/Sprites/Enemy/evil_3_d.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.RIGHT[2], "assets/Sprites/Enemy/evil_3_e.png");
        this.load.image(CONSTANTS.SCENE.INGAME.BULLET.NAME, "assets/Sprites/Others/bullet.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.NORMAL[0], "assets/Sprites/Weapon/arma1.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.SELECTED[0],"assets/Sprites/Weapon/arma1_s.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.NORMAL[1], "assets/Sprites/Weapon/arma2.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.SELECTED[1],"assets/Sprites/Weapon/arma2_s.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.NORMAL[2], "assets/Sprites/Weapon/arma3.png");
        this.load.image(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.SELECTED[2],"assets/Sprites/Weapon/arma3_s.png");

        //TODO: LOAD WEAPONS and add them on create()
    }

    create() {
        // Add Background
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        // Listeners
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        // Add Hero
        this.player = new Hero(this);
        // Add Hero Weapons
        this.weapon[0] = new Weapon(this,1);
        this.weapon[1] = new Weapon(this,2);
        this.weapon[2] = new Weapon(this,3);
        this.weapon[0].focus(true);
        // Creating Group for Enemies
        this.enemies = this.physics.add.group();
        // Creating a Group for Bullets
        this.bullets = this.physics.add.group();
        // Bounding Box Collisions
        this.physics.add.overlap(this.bullets, this.enemies, this.bulletHitHandler, null, this);
    }

    update() {
        this.timer += 16; // so every real 16ms, we increment timer += 16 (ms)
        this.moveEnemyTimer += 16;
        if (this.timer > CONSTANTS.SCENE.INGAME.ENEMY.SPAWNSPEED) {
            this.timer = 0;
            new Enemy(this);
            for (let i = 0; i < this.enemies.getChildren().length; i++) {
                this.enemies.getChildren()[i].stop();
            }
        }
        if (this.moveEnemyTimer > CONSTANTS.SCENE.INGAME.ENEMY.MOVETIME){
            this.moveEnemyTimer = 0;
            this.moveEnemiesHandler();
        }
        this.movePlayerHandler();
        this.weaponHandler();
        this.renderer();
        console.log("Weapon: " + CONSTANTS.SCENE.INGAME.ENEMY.NAMES[this.player.weaponID - 1])

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

    swapFocus(weaponId){
        this.weapon[this.player.weaponID - 1].focus(false);
        this.player.weaponID = weaponId;
        this.weapon[this.player.weaponID - 1].focus(true);
    }

    moveEnemiesHandler(){
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            if (Math.random() < 0.2){
                var enemy = this.enemies.getChildren()[i];
                if(Math.random() < 0.5){
                    enemy.moveRight();
                } else {
                    enemy.moveLeft();
                }
            }
        }
    }

    renderer() {
        //console.log("bullets:" + this.bullets.getChildren().length + "\nenemies " +this.enemies.getChildren().length)
        for (let i = 0; i < this.bullets.getChildren().length; i++) {
            var b = this.bullets.getChildren()[i];
            b.update();
        }
        for (let i = 0; i < this.enemies.getChildren().length; i++) {
            var enemy = this.enemies.getChildren()[i];
            enemy.update();
        }
    }

    bulletHitHandler(bullet, enemy) {
        //TODO: if (pixel perfect) do
        bullet.doDamage(enemy);
    }
}