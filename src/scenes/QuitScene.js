class QuitScene extends Phaser.Scene {
    constructor() {
        super(CONSTANTS.SCENE.QUIT.NAME);
    }

    preload() {
        this.mainText = "Do You Want To Leave?";
        this.load.image(CONSTANTS.SCENE.INGAME.MENU.NAME, "assets/Sprites/UI/LevelWin.png");
        this.load.image("sim", "assets/Sprites/UI/yes_selected.png");
        this.load.image("no", "assets/Sprites/UI/no_selected.png");
        this.load.bitmapFont(CONSTANTS.SCENE.QUIT.TEXT.FONT, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt")

    }

    create() {
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.menu = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.CANVAS.HEIGHT / 2, CONSTANTS.SCENE.INGAME.MENU.NAME);
        var topLeft = this.menu.getTopLeft();
        var posY = topLeft.y + 0.65 * this.menu.height;
        this.mainText = this.add.bitmapText(this.menu.x, topLeft.y + 0.35 * this.menu.height, CONSTANTS.SCENE.QUIT.TEXT.FONT, this.mainText, CONSTANTS.SCENE.QUIT.TEXT.FONTSIZE).setOrigin();
        this.yesBtn = this.add.sprite(this.posX(0.25), posY, "sim").setOrigin();
        this.noBtn = this.add.sprite(this.posX(0.75), posY, "no").setOrigin();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.escape)) {
            this.scene.stop();
            this.scene.resume(CONSTANTS.SCENE.INGAME.NAME);
        }/* else if (){

        } else if(){

        }*/
    }

    posX(p) {
        return this.menu.getTopLeft().x + p * this.menu.width;
    }
}