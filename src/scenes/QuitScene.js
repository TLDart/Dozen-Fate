class QuitScene extends Phaser.Scene {
    constructor() {
        super(CONSTANTS.SCENE.QUIT.NAME);
    }

    init(data) {
        this.data = data;
    }

    preload() {
        this.mainText = "Leave?";
        this.load.bitmapFont(CONSTANTS.SCENE.QUIT.TEXT.FONT, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt")
        this.load.image(CONSTANTS.SCENE.INGAME.MENU.NAME, "assets/Sprites/UI/LevelWin.png");
        this.load.spritesheet(CONSTANTS.SCENE.BTNSOUND.TEXTURE, "assets/Sprites/Others/sound_on_off.png", {
            frameWidth: 64,
            frameHeight: 64,
        });
        this.load.spritesheet(CONSTANTS.SCENE.QUIT.SHEET.NO.NAME, "assets/Sprites/UI/no_sheet.png", {
            frameWidth: 108,
            frameHeight: 54,
        });
        this.load.spritesheet(CONSTANTS.SCENE.QUIT.SHEET.YES.NAME, "assets/Sprites/UI/yes_sheet.png", {
            frameWidth: 108,
            frameHeight: 54,
        });
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
    }

    create() {
        this.escape = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.menu = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.CANVAS.HEIGHT / 2, CONSTANTS.SCENE.INGAME.MENU.NAME);
        var topLeft = this.menu.getTopLeft();
        this.mainText = this.add.bitmapText(this.menu.x, topLeft.y + CONSTANTS.SCENE.QUIT.TEXT.pY * this.menu.height, CONSTANTS.SCENE.QUIT.TEXT.FONT, this.mainText, CONSTANTS.SCENE.QUIT.TEXT.FONTSIZE).setOrigin();
        this.yesBtn = this.add.sprite(this.posX(CONSTANTS.SCENE.QUIT.SHEET.YES.pX), this.posY(CONSTANTS.SCENE.QUIT.SHEET.YES.pY), CONSTANTS.SCENE.QUIT.SHEET.YES.NAME).setOrigin().setInteractive();
        this.noBtn = this.add.sprite(this.posX(CONSTANTS.SCENE.QUIT.SHEET.NO.pX), this.posY(CONSTANTS.SCENE.QUIT.SHEET.NO.pY), CONSTANTS.SCENE.QUIT.SHEET.NO.NAME).setOrigin().setInteractive();
        this.soundBtn = this.add.sprite(this.posX(CONSTANTS.SCENE.QUIT.SHEET.SOUND.pX), this.posY(CONSTANTS.SCENE.QUIT.SHEET.SOUND.pY), CONSTANTS.SCENE.BTNSOUND.TEXTURE).setScale(CONSTANTS.SCENE.QUIT.SHEET.SOUND.SCALE).setOrigin().setInteractive();
       /* if (soundVolume === 0) {
            this.soundBtn.setFrame(1);
        }*/
        this.yesBtnFrame = 0;
        this.noBtnFrame = 0;
        this.soundBtnFrame = CONSTANTS.MUSIC.REF.volume === 0 ? 1 : 0;
        this.soundBtn.setFrame(this.soundBtnFrame);
        this.soundPlayer = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);

        this.changeYesTexture = function () {
            this.yesBtnFrame = (this.yesBtnFrame + 1) % 2;
            if (this.yesBtnFrame) {
                this.soundPlayer.play(CONSTANTS.SCENE.BTNSOUND.CONFIG);
            }
            this.yesBtn.setFrame(this.yesBtnFrame);
        };

        this.changeNoTexture = function () {
            this.noBtnFrame = (this.noBtnFrame + 1) % 2;
            if (this.noBtnFrame) {
                this.soundPlayer.play(CONSTANTS.SCENE.BTNSOUND.CONFIG);
            }
            this.noBtn.setFrame(this.noBtnFrame);
        };

        // Listeners
        this.yesBtn.on('pointerover', this.changeYesTexture, this);
        this.yesBtn.on("pointerout", this.changeYesTexture, this);
        this.yesBtn.on("pointerdown", this.quitGame, this);

        this.noBtn.on("pointerover", this.changeNoTexture, this);
        this.noBtn.on("pointerout", this.changeNoTexture, this);
        this.noBtn.on("pointerdown", this.resumeGame, this);

        this.soundBtn.on("pointerdown", this.soundHandler, this);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.escape)) {
            this.resumeGame();
        }
    }

    resumeGame() {
        this.scene.stop();
        this.scene.resume(CONSTANTS.SCENE.INGAME.NAME);
    }

    quitGame() {
        this.data.parentScene.playing = false;
        this.resumeGame();
    }

    soundHandler() {//TODO: end sound handler
        this.soundBtnFrame = (this.soundBtnFrame + 1) % 2;
        if (this.soundBtnFrame) {
            CONSTANTS.MUSIC.REF.setVolume(0);
            this.data.parentScene.cookies["volume"] = 0;
        } else {
            CONSTANTS.MUSIC.REF.setVolume(0.5);
            this.data.parentScene.cookies["volume"] = 0.5;
        }

        this.soundBtn.setFrame(this.soundBtnFrame);
    }

    posX(p) {
        return this.menu.getTopLeft().x + p * this.menu.width;
    }

    posY(p) {
        return this.menu.getTopLeft().y + p * this.menu.height;
    }
}