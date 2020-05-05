class Enemy extends StarShip {
    constructor(scene) {
        var vulnerability = Math.round(2 * Math.random());
        super(scene,-500,-500,CONSTANTS.SCENE.INGAME.ENEMY.NAMES[vulnerability],CONSTANTS.SCENE.INGAME.ENEMY.LIFEPOINTS,CONSTANTS.SCENE.INGAME.ENEMY.SCALE);
        scene.enemies.add(this);
        this.setRandomPosition(this.width / 2, -this.height, CONSTANTS.CANVAS.WIDTH - this.width, 0);
        this.setVelocityY(CONSTANTS.SCENE.INGAME.ENEMY.SPEED.Y);
        this.vulnerability = vulnerability + 1;

    }

    moveRight(){
        this.setVelocityX(CONSTANTS.SCENE.INGAME.ENEMY.SPEED.X*Math.random());
        this.setTexture(CONSTANTS.SCENE.INGAME.ENEMY.RIGHT[this.vulnerability - 1]);
    }

    moveLeft(){
        this.setVelocityX(-CONSTANTS.SCENE.INGAME.ENEMY.SPEED.X*Math.random());
        this.setTexture(CONSTANTS.SCENE.INGAME.ENEMY.LEFT[this.vulnerability - 1]);
    }

    stop(){
        console.log(this);
        this.setVelocityX(0);
        this.setTexture(CONSTANTS.SCENE.INGAME.ENEMY.NAMES[this.vulnerability - 1]);
    }
    update(){
        if (this.lifePoints <= 0){
            this.destroy()
        } else {
            var leftBoundX = Math.round(this.width/2);
            var rightBoundX = CONSTANTS.CANVAS.WIDTH - Math.round(this.width/2);
            if (this.x < leftBoundX){
                this.stop();
                this.setPosition(leftBoundX,this.y)
            } else if (this.x >= rightBoundX ){
                this.stop();
                this.setPosition(rightBoundX,this.y)
            }
        }

    }
}