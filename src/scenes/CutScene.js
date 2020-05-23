class CutScene extends Phaser.Scene {
    constructor() {
        super(CONSTANTS.SCENE.CUT.NAME);
    }

    init(data) {
        this.cookies = data.cookies;
        this.timer = 0;
    }

    preload() {
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.bitmapFont(CONSTANTS.SCENE.CUT.FONT, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt");
        for (let i = 1; i <= 12; i++) {
            this.load.image(CONSTANTS.SCENE.INGAME.HERO.NAME[i], "assets/Sprites/Ally/heroi_" + i + ".png");
        }
    }

    create() {
        this.stopFlag = false;
        var x, y;
        this.ship = [];
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.text = this.add.bitmapText(0, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.CUT.FONT, CONSTANTS.SCENE.CUT.TEXT, CONSTANTS.SCENE.CUT.FONTSIZE, 200);
        this.leaveText = this.add.bitmapText(CONSTANTS.CANVAS.WIDTH/2,CONSTANTS.CANVAS.HEIGHT*2.1,CONSTANTS.SCENE.CUT.FONT,"Press ESC to continue",CONSTANTS.SCENE.CUT.FONTSIZE).setOrigin();
        for (let i = 1; i <= 12; i++) {
            if (i < 7) {
                x = -35 * (Math.abs(i - 6) + 1);
                y = 16 * Math.abs(i - 6);
            } else {
                x = 35 * (Math.abs(i - 7) + 1);
                y = 16 * Math.abs(i - 7);
            }
            this.ship[i] = this.add.image(CONSTANTS.CANVAS.WIDTH / 2 + (Math.abs(x) === 35 ? (i === 6 ? -25 : 25) : x), 1.85 * CONSTANTS.CANVAS.HEIGHT + y + 32, CONSTANTS.SCENE.INGAME.HERO.NAME[i]).setScale(0.7);
        }
    }

    update() {
        if (!this.stopFlag){
            var decrement = 0.5;
            this.timer += 16;
            if (this.leaveText.y > CONSTANTS.CANVAS.HEIGHT/2){
                this.leaveText.y -= decrement;
            }
            this.text.y -= decrement;
            for (let i = 1; i <= 12; i++) {
                this.ship[i].y -= decrement;
            }
            if (this.timer > 500){
                this.leaveText.visible = !this.leaveText.visible;
                this.timer = 0;
            }
        }
        if (Phaser.Input.Keyboard.JustDown(this.escape)) {
            this.stopFlag = true;
            this.leaveText.visible = true;
            var config = {
                target: CONSTANTS.SCENE.LEVELS.NAME,
                duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
                moveBelow: true,
                data: {cookies: this.cookies}
            };
            this.scene.transition(config);
        }
    }

}