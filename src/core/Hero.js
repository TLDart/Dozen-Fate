class Hero extends StarShip{
    constructor(scene,lifePoints) {
        super(scene,CONSTANTS.CANVAS.WIDTH / 2,CONSTANTS.CANVAS.HEIGHT * 0.88,CONSTANTS.SCENE.INGAME.HERO.STOP,CONSTANTS.SCENE.INGAME.HERO.LIFEPOINTS);
        this.setCollideWorldBounds(true);
        this.speed = CONSTANTS.SCENE.INGAME.HERO.SPEED;
        this.weaponID = 1;
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.NAME;
        this.bulletSpeedX = 0;
        this.bulletSpeedY = -CONSTANTS.SCENE.INGAME.BULLET.SPEED;
        this.vulnerability = -1; //TODO: Polymorphism
    }

    moveRight(){
        this.setVelocityX(this.speed);
        this.setTexture(CONSTANTS.SCENE.INGAME.HERO.RIGHT);
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.RIGHT;
        this.bulletSpeedX = CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.cos(Math.PI/2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
        this.bulletSpeedY = -CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.sin(Math.PI/2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
    }

    moveLeft(){
        this.setVelocityX(-this.speed);
        this.setTexture(CONSTANTS.SCENE.INGAME.HERO.LEFT);
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.LEFT;
        this.bulletSpeedX = -CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.cos(Math.PI/2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
        this.bulletSpeedY = -CONSTANTS.SCENE.INGAME.BULLET.SPEED * Math.sin(Math.PI/2 - CONSTANTS.SCENE.INGAME.HERO.SHIPANGLE);
    }

    stop(){
        this.setVelocityX(0);
        this.setTexture(CONSTANTS.SCENE.INGAME.HERO.STOP);
        this.bulletTexture = CONSTANTS.SCENE.INGAME.BULLET.NAME;
        this.bulletSpeedX = 0;
        this.bulletSpeedY = -CONSTANTS.SCENE.INGAME.BULLET.SPEED;
    }

    fire(){
        var bullet = new Bullet(this.scene,this.bulletTexture,this.weaponID,this);
        this.scene.heroBullets.add(bullet);

        bullet.body.velocity.x = this.bulletSpeedX;
        bullet.body.velocity.y = this.bulletSpeedY;
    }
}