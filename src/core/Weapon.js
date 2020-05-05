class Weapon extends Animator {
    constructor(scene,weaponID) {
        var x = CONSTANTS.CANVAS.WIDTH *CONSTANTS.SCENE.INGAME.WEAPON.X[weaponID - 1];
        var y = CONSTANTS.CANVAS.HEIGHT*CONSTANTS.SCENE.INGAME.WEAPON.Y;
        super(scene,x,y,CONSTANTS.SCENE.INGAME.WEAPON.NAMES.NORMAL[weaponID - 1],CONSTANTS.SCENE.INGAME.WEAPON.SCALE);
        this.weaponId = weaponID;
    }

    focus(bool){
        if (bool) {
            this.setTexture(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.SELECTED[this.weaponId - 1]);
        } else {
            this.setTexture(CONSTANTS.SCENE.INGAME.WEAPON.NAMES.NORMAL[this.weaponId - 1]);
        }
    }
}