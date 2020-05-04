class StarShip extends Animator {
    constructor(scene,x,y,texture,lifePoints,scale=1) {
        super(scene,x,y,texture,scale);
        this.lifePoints = lifePoints;
    }

}