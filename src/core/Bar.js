class Bar extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, w = CONSTANTS.SCENE.INGAME.HEALTHBAR.RECTANGLE.WIDTH, h = CONSTANTS.SCENE.INGAME.HEALTHBAR.RECTANGLE.HEIGHT, scale = CONSTANTS.SCENE.INGAME.HEALTHBAR.SCALE) {
        var rectX = x + CONSTANTS.SCENE.INGAME.HEALTHBAR.PADDING.X * CONSTANTS.SCENE.INGAME.HEALTHBAR.SCALE;
        var rectY = y + CONSTANTS.SCENE.INGAME.HEALTHBAR.PADDING.Y * CONSTANTS.SCENE.INGAME.HEALTHBAR.SCALE;
        super(scene, rectX, rectY, w, h, CONSTANTS.SCENE.INGAME.HEALTHBAR.STARTCOLOR);
        this.setOrigin(0, 0);
        this.setScale(scale);
        this.depth = CONSTANTS.SCENE.INGAME.HEALTHBAR.DEPTH;
        scene.add.existing(this);
        this.maxWidth = w;
    }

    setPercentage(percentage) {
        var width = this.maxWidth * percentage;
        this.setSize(width <= 0 ? 0 : width, this.height);
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

