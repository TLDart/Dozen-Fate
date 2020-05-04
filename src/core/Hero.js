class Hero extends StarShip{
    constructor(scene,lifePoints) {
        super(scene,CONSTANTS.CANVAS.WIDTH / 2,CONSTANTS.CANVAS.HEIGHT * 0.9,CONSTANTS.SCENE.INGAME.HERO.STOP,CONSTANTS.SCENE.INGAME.HERO.LIFEPOINTS);
        this.setCollideWorldBounds(true);
        this.speed = CONSTANTS.SCENE.INGAME.HERO.SPEED;
        //TODO: meter nas constantes
        this.weaponID = 1;
    }

    moveRight(){
        this.setVelocityX(this.speed);
        this.setTexture(CONSTANTS.SCENE.INGAME.HERO.RIGHT);
    }

    moveLeft(){
        this.setVelocityX(-this.speed);
        this.setTexture(CONSTANTS.SCENE.INGAME.HERO.LEFT);
    }

    stop(){
        this.setVelocityX(0);
        this.setTexture(CONSTANTS.SCENE.INGAME.HERO.STOP);
    }

    fire(){
        var bullet = new Bullet(this.scene,this.weaponID);
        this.scene.bullets.add(bullet);
        bullet.body.velocity.y = - CONSTANTS.SCENE.INGAME.BULLET.SPEED;
    }
}