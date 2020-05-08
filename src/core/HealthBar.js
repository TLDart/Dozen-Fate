class HealthBar extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y) {
        var rectX = x + CONSTANTS.SCENE.INGAME.HEALTHBAR.PADDING.X * CONSTANTS.SCENE.INGAME.HEALTHBAR.SCALE;
        var rectY = y + CONSTANTS.SCENE.INGAME.HEALTHBAR.PADDING.Y * CONSTANTS.SCENE.INGAME.HEALTHBAR.SCALE;
        super(scene, rectX, rectY, CONSTANTS.SCENE.INGAME.HEALTHBAR.RECTANGLE.WIDTH, CONSTANTS.SCENE.INGAME.HEALTHBAR.RECTANGLE.HEIGHT, CONSTANTS.SCENE.INGAME.HEALTHBAR.STARTCOLOR);
        this.setOrigin(0, 0);
        this.setScale(CONSTANTS.SCENE.INGAME.HEALTHBAR.SCALE);
        this.depth = CONSTANTS.SCENE.INGAME.HEALTHBAR.DEPTH;
        scene.add.existing(this);
    }

    setPercentage(percentage) {
        var width = CONSTANTS.SCENE.INGAME.HEALTHBAR.RECTANGLE.WIDTH * percentage;
        this.setSize(width <= 0 ? 0 : width, CONSTANTS.SCENE.INGAME.HEALTHBAR.RECTANGLE.HEIGHT);
        this.fillColor = this.gradient(1 - percentage);
    }

    // red to green gradient
    gradient(percentage) {
        var yellowish = 0xfff000;
        var index = Math.round(30 * percentage);
        if (index < 15) {
            return yellowish - (0x100000) * (15 - index);
        } else if (index === 15) {
            return yellowish;
        } else {
            var color = yellowish - (0x002000) * (index - 15);
            return color < 0xff0000 ? 0xff0000 : color;
        }
    }
}

