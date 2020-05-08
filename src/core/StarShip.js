class StarShip extends Animator {
    constructor(scene,x,y,texture,lifePoints,scale=1) {
        super(scene,x,y,texture,scale);
        this.lifePoints = lifePoints;
        this.bulletAngle = 0;
    }

    moveLeft(speed){
        this.setVelocityX(speed);
        this.angle = -CONSTANTS.SCENE.INGAME.HERO.SHIPDEGREES;
        this.bulletAngle = -CONSTANTS.SCENE.INGAME.HERO.SHIPDEGREES;
    }

    moveRight(speed){
        this.setVelocityX(speed);
        this.angle = CONSTANTS.SCENE.INGAME.HERO.SHIPDEGREES;
        this.bulletAngle = CONSTANTS.SCENE.INGAME.HERO.SHIPDEGREES;
    }

    stop(){
        this.setVelocityX(0);
        this.angle = 0;
        this.bulletAngle = 0;
    }
}