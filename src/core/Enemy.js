class Enemy extends StarShip {
    constructor(scene) {
        var vulnerability = Math.round(2 * Math.random());
        super(scene, -500, -500, CONSTANTS.SCENE.INGAME.ENEMY.NAMES[vulnerability][0], CONSTANTS.SCENE.INGAME.ENEMY.LIFEPOINTS, CONSTANTS.SCENE.INGAME.ENEMY.SCALE);
        scene.enemies.add(this);
        this.setRandomPosition(this.width / 2, -this.height, CONSTANTS.CANVAS.WIDTH - this.width, 0);
        this.setVelocityY(CONSTANTS.SCENE.INGAME.ENEMY.SPEED.Y);
        // Bullet Configs
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.NAMES[0];
        this.bulletSpeedX = 0;
        this.bulletSpeedY = CONSTANTS.SCENE.INGAME.BULLET.SPEED;
        // Vulnerability
        this.vulnerability = vulnerability + 1;
    }

    moveLeft() {
        super.moveLeft(CONSTANTS.SCENE.INGAME.ENEMY.SPEED.X * Math.random());
        this.bulletSpeedX = CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.cos(Math.PI / 2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
        this.bulletSpeedY = CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.sin(Math.PI / 2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);

    }

    moveRight() {
        super.moveRight(-CONSTANTS.SCENE.INGAME.ENEMY.SPEED.X * Math.random());
        this.bulletSpeedX = -CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.cos(Math.PI / 2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
        this.bulletSpeedY = CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.sin(Math.PI / 2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
    }

    stop() {
        super.stop();
        this.bulletSpeedX = 0;
        this.bulletSpeedY = CONSTANTS.SCENE.INGAME.BULLET.SPEED;
    }

    fire() {
        var bullet = new Bullet(this.scene, this.bulletTexture, CONSTANTS.SCENE.INGAME.HERO.VULNERABILITY, this);
        this.scene.enemyBullets.add(bullet);
        bullet.body.velocity.x = this.bulletSpeedX;
        bullet.body.velocity.y = this.bulletSpeedY;
        bullet.angle = 180 + this.bulletAngle;
    }

    update() {
        if (this.lifePoints <= 0.33 * CONSTANTS.SCENE.INGAME.ENEMY.LIFEPOINTS) {
            this.setTexture(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[this.vulnerability - 1][2]);
        } else if (this.lifePoints <= 0.66 * CONSTANTS.SCENE.INGAME.ENEMY.LIFEPOINTS) {
            this.setTexture(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[this.vulnerability - 1][1]);
        }
        if (!this.scene.playing){
            this.stop();
            this.setVelocityY(0);
        }
        if (this.lifePoints <= 0) {
            this.destroy();
        } else if (this.y > CONSTANTS.CANVAS.HEIGHT) {
            this.scene.player.lifePoints -= CONSTANTS.SCENE.INGAME.ENEMY.DAMAGEBOTTOM;
            this.scene.heart.play(CONSTANTS.SCENE.INGAME.HEALTHBAR.ANIMATION);
            this.destroy();
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