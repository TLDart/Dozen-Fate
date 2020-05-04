class Enemy extends StarShip {
    constructor(scene) {
        var vulnerability = Math.round(2 * Math.random());
        super(scene,-500,-500,CONSTANTS.SCENE.INGAME.ENEMY.NAMES[vulnerability],CONSTANTS.SCENE.INGAME.ENEMY.LIFEPOINTS,CONSTANTS.SCENE.INGAME.ENEMY.SCALE);
        scene.enemies.add(this);
        this.setRandomPosition(this.width / 2, -this.height, CONSTANTS.CANVAS.WIDTH - this.width, 0);
        this.setVelocity(0, CONSTANTS.SCENE.INGAME.ENEMY.SPEED);
        this.vulnerability = vulnerability + 1;
    }

    update(){
        if (this.lifePoints <= 0){
            this.destroy()
        }
    }
}