class Hero extends StarShip {
    constructor(scene, startingWeapon,lifePoints) {
        super(scene, CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.CANVAS.HEIGHT * 0.88, CONSTANTS.SCENE.INGAME.HERO.NAME, CONSTANTS.SCENE.INGAME.HERO.LIFEPOINTS);
        this.setCollideWorldBounds(true);
        this.speed = CONSTANTS.SCENE.INGAME.HERO.SPEED;
        this.weaponID = startingWeapon;
        // Bullet configs
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.NAMES[startingWeapon];
        this.bulletSpeedX = 0;
        this.bulletSpeedY = -CONSTANTS.SCENE.INGAME.BULLET.SPEED;
        this.vulnerability = CONSTANTS.SCENE.INGAME.HERO.VULNERABILITY;
    }

    moveRight() {
        super.moveRight(this.speed);
        this.bulletSpeedX = CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.cos(Math.PI / 2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
        this.bulletSpeedY = -CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.sin(Math.PI / 2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
    }

    moveLeft() {
        super.moveLeft(-this.speed);
        this.bulletSpeedX = -CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.cos(Math.PI / 2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
        this.bulletSpeedY = -CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.sin(Math.PI / 2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);

    }

    stop() {
        super.stop();
        this.bulletSpeedX = 0;
        this.bulletSpeedY = -CONSTANTS.SCENE.INGAME.BULLET.SPEED;
    }

    fire() {
        var bullet = new Bullet(this.scene, this.bulletTexture, this.weaponID, this);
        this.scene.heroBullets.add(bullet);
        bullet.angle = this.bulletAngle;
        bullet.body.velocity.x = this.bulletSpeedX;
        bullet.body.velocity.y = this.bulletSpeedY;
    }
}