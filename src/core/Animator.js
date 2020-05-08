class Animator extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y,texture,scale) {
        super(scene,x,y,texture);
        scene.physics.world.enable(this);
        scene.add.existing(this.setScale(scale));
        // this.imageData = this.texture.getSourceImage(); TODO: passar isto pela canvas da pl4
    }

}