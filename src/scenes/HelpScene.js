class HelpScene extends Phaser.Scene{
    logo;
    background;

    constructor() {
        super(CONSTANTS.SCENE.HELP.NAME); // DO NOT FORGET TO ADD SCENE TO MAIN
    }
    preload(){
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME, "assets/Sprites/UI/MenuHistoryBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAME, "assets/Sprites/UI/backArrowBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAMESELECTED, "assets/Sprites/UI/backArrowPink.png");
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
    }
    create(){
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE);
        this.backButton = this.add.sprite(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING + CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAME).setInteractive();
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);

        this.changemenu = function () {
            this.changelevel(CONSTANTS.SCENE.MENU.NAME)
        }

        this.backButton.on('pointerout', this.changebackoff,this);
        this.backButton.on('pointerover', this.changebackon,this);
        this.backButton.on('pointerdown', this.changemenu,this);

    }
    changebackon(pointer){this.backButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAMESELECTED); this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)}
    changebackoff(pointer){this.backButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAME);}

    changelevel(levelName) {

        var config = {
            target: levelName,
            duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
            moveBelow: true,
        };
        this.scene.transition(config);
    }


    update(){
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
    }


}