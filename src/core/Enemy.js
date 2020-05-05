class Enemy extends StarShip {
    constructor(scene) {
        var vulnerability = Math.round(2 * Math.random());
        super(scene, -500, -500, CONSTANTS.SCENE.INGAME.ENEMY.NAMES[vulnerability], CONSTANTS.SCENE.INGAME.ENEMY.LIFEPOINTS, CONSTANTS.SCENE.INGAME.ENEMY.SCALE);
        scene.enemies.add(this);
        this.setRandomPosition(this.width / 2, -this.height, CONSTANTS.CANVAS.WIDTH - this.width, 0);
        this.setVelocityY(CONSTANTS.SCENE.INGAME.ENEMY.SPEED.Y);
        this.vulnerability = vulnerability + 1;

        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.NAME;
        this.bulletSpeedX = 0;
        this.bulletSpeedY = CONSTANTS.SCENE.INGAME.BULLET.SPEED;

    }

    moveRight() {
        this.setVelocityX(CONSTANTS.SCENE.INGAME.ENEMY.SPEED.X * Math.random());
        this.setTexture(CONSTANTS.SCENE.INGAME.ENEMY.RIGHT[this.vulnerability - 1]);
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.LEFT; //TODO: alterar LEFT
        this.bulletSpeedX = CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.cos(Math.PI/2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
        this.bulletSpeedY = CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.sin(Math.PI/2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
    }

    moveLeft() {
        this.setVelocityX(-CONSTANTS.SCENE.INGAME.ENEMY.SPEED.X * Math.random());
        this.setTexture(CONSTANTS.SCENE.INGAME.ENEMY.LEFT[this.vulnerability - 1]);
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.RIGHT;//TODO: alterar RIGHT
        this.bulletSpeedX = -CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.cos(Math.PI/2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
        this.bulletSpeedY = CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.sin(Math.PI/2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
    }

    stop() {
        this.setVelocityX(0);
        this.setTexture(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[this.vulnerability - 1]);
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.NAME;
        this.bulletSpeedX = 0;
        this.bulletSpeedY = CONSTANTS.SCENE.INGAME.BULLET.SPEED;
    }

    fire(){
        var bullet = new Bullet(this.scene,this.bulletTexture,-1,this);
        this.scene.enemyBullets.add(bullet);
        bullet.body.velocity.x = this.bulletSpeedX;
        bullet.body.velocity.y = this.bulletSpeedY;
        bullet.angle = 180;
    }

    update() {
        if (this.lifePoints <= 0) {
            this.destroy()
        } else {
            var leftBoundX = Math.round(this.width / 2);
            var rightBoundX = CONSTANTS.CANVAS.WIDTH - Math.round(this.width / 2);
            if (this.x < leftBoundX) {
                this.stop();
                this.setPosition(leftBoundX, this.y)
            } else if (this.x >= rightBoundX) {
                this.stop();
                this.setPosition(rightBoundX, this.y)
            }
        }

    }
}