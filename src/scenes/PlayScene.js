class PlayScene extends Phaser.Scene{
    logo;
    background;
    historyButton;
    arcadeButton;
    backButton;
    btnSound;
    constructor() {
        super(CONSTANTS.SCENE.MENUPLAY.NAME); // DO NOT FORGET TO ADD SCENE TO MAIN
    }
    preload(){
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME, "assets/Sprites/UI/MenuHistoryBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAMESELECTED, "assets/Sprites/UI/MenuHistoryPink.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME, "assets/Sprites/UI/MenuArcadeBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAMESELECTED, "assets/Sprites/UI/MenuArcadePink.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAME, "assets/Sprites/UI/backArrowBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAMESELECTED, "assets/Sprites/UI/backArrowPink.png");
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
    }
    create(){
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE);
        this.historyButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING, CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME).setInteractive();
        this.arcadeButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 2, CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME).setInteractive();
        this.backButton = this.add.sprite(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING + CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.NAME).setInteractive();
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);

        this.changemenu = function () {
            this.changelevel(CONSTANTS.SCENE.MENU.NAME)
        }

        this.historyButton.on('pointerover', this.changehistoryon,this);
        this.historyButton.on('pointerout', this.changehistoryoff,this);
        this.arcadeButton.on('pointerover', this.changearcadeon,this);
        this.arcadeButton.on('pointerout', this.changearcadeoff,this);
        this.backButton.on('pointerout', this.changebackoff,this);
        this.backButton.on('pointerover', this.changebackon,this);
        this.backButton.on('pointerdown', this.changemenu,this);

    }
    changeButtonOn
    changehistoryon(pointer){this.historyButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAMESELECTED);this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG);}
    changehistoryoff(pointer){this.historyButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME);}
    changearcadeon(pointer){this.arcadeButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAMESELECTED); this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)}
    changearcadeoff(pointer){this.arcadeButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME);}
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