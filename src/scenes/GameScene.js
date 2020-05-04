class GameScene extends Phaser.Scene {
    timer;

    constructor() {
        super(CONSTANTS.SCENE.INGAME.NAME);
        this.timer = 0;
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
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[1], "assets/Sprites/Enemy/evil_2.png");
        this.load.image(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[2], "assets/Sprites/Enemy/evil_3.png");
        this.load.image(CONSTANTS.SCENE.INGAME.BULLET.NAME,"assets/Sprites/Others/bullet.png");
        //TODO: LOAD WEAPONS and add them on create()
    }

    create() {
        // Add Background
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        // Listeners
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        this.key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        this.key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
        //Add Hero
        this.player = new Hero(this);
        // Creating Group for Enemies
        this.enemies = this.physics.add.group();
        // Creating a Group for Bullets
        this.bullets = this.physics.add.group();
        // Bounding Box Collisions
        this.physics.add.overlap(this.bullets,this.enemies,this.bulletHitHandler,null,this);
    }

    update() {
        this.timer += 16; // so every real 16ms, we increment timer += 16 (ms)
        if (this.timer > CONSTANTS.SCENE.INGAME.ENEMY.SPAWNSPEED) {
            this.timer = 0;
            new Enemy(this);
        }
        this.movePlayerHandler();
        this.weaponHandler();
        this.renderer();
        console.log("Weapon: "+ CONSTANTS.SCENE.INGAME.ENEMY.NAMES[this.player.weaponID - 1])

    }
    // TODO: Procurar alternativa mais clean
    movePlayerHandler() {
        if (this.cursorKeys.left.isDown && this.cursorKeys.right.isDown){
            this.player.stop();
        } else if (this.cursorKeys.left.isDown){
            this.player.moveLeft();
        } else if (this.cursorKeys.right.isDown){
            this.player.moveRight();
        } else {
            this.player.stop();
        }
    }

    weaponHandler(){
        if(Phaser.Input.Keyboard.JustDown(this.key1)){
            this.player.weaponID = 1;
        } else if (Phaser.Input.Keyboard.JustDown(this.key2)){
            this.player.weaponID = 2;
        } else if (Phaser.Input.Keyboard.JustDown(this.key3)){
            this.player.weaponID = 3;
        }
        if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
            this.player.fire();
        }
    }
    renderer(){
        var i;
        //console.log("bullets:" + this.bullets.getChildren().length + "\nenemies " +this.enemies.getChildren().length)
        for (i = 0; i < this.bullets.getChildren().length; i++){
            var b = this.bullets.getChildren()[i];
            b.update();
        }
        for (i = 0; i < this.enemies.getChildren().length; i++){
            var ship = this.enemies.getChildren()[i];
            ship.update();
        }
    }

    bulletHitHandler(bullet, enemy){
        //TODO: if (pixel perfect) do
        bullet.doDamage(enemy);
    }
}