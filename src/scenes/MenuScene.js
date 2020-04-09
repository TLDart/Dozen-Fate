class MenuScene extends Phaser.Scene {
    logo;
    background;
    playButton;
    helpButton;
    storeButton;
    settingsButton;

    constructor() {
        super(CONSTANTS.SCENE.MENU.NAME);
    }

    preload() {
        console.log("preload menuscene");
        //Preload Assets

        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.PLAY.NAME, "assets/Sprites/UI/MenuPlayBlue.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.PLAYSELECTED.NAME, "assets/Sprites/UI/MenuPlayPink.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.HELP.NAME, "assets/Sprites/UI/MenuHelpBlue.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.HELPSELECTED.NAME, "assets/Sprites/UI/MenuHelpPink.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.STORE.NAME, "assets/Sprites/UI/MenuStoreBlue.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.STORESELECTED.NAME, "assets/Sprites/UI/MenuStorePink.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.SETTINGS.NAME, "assets/Sprites/UI/MenuSettingsBlue.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.SETTINGSSELECTED.NAME, "assets/Sprites/UI/MenuSettingsPink.png");
        this.load.audio(CONSTANTS.SCENE.MENU.BACKGROUND_MUSIC.NAME, "assets/Sounds/Double_the_Bits.mp3");

    }

    create() {
        console.log("create menuscene");
        // Add to this scene

        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(0);
        this.playButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING, CONSTANTS.SCENE.MENU.BUTTON.PLAY.NAME).setInteractive();
        this.helpButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 2, CONSTANTS.SCENE.MENU.BUTTON.HELP.NAME).setInteractive();
        this.storeButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 3, CONSTANTS.SCENE.MENU.BUTTON.STORE.NAME).setInteractive();
        this.settingsButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 4, CONSTANTS.SCENE.MENU.BUTTON.SETTINGS.NAME).setInteractive();
        // Listeners
        this.events.on("transitioncomplete", this.transitionComplete, this); // Este "this" é preciso ainda que a documentação diga que não, senão isto dá erro
        this.music = this.sound.add(CONSTANTS.SCENE.MENU.BACKGROUND_MUSIC.NAME);
        this.music.play(CONSTANTS.SCENE.MENU.BACKGROUND_MUSIC.CONFIG);
        this.playButton.on('pointerover', this.changeplayon,this.playButton);
        this.playButton.on('pointerout', this.changeplayoff,this.playButton);
        this.helpButton.on('pointerover', this.changehelpon,this.helpButton);
        this.helpButton.on('pointerout', this.changehelpoff,this.helpButton);
        this.storeButton.on('pointerover', this.changestoreon, this.storeButton);
        this.storeButton.on('pointerout', this.changestoreoff,this.storeButton);
        this.settingsButton.on('pointerover', this.changesettingson,this.settingsButton);
        this.settingsButton.on('pointerout', this.changesettingsoff,this.settingsButton);
        }

    changeplayon(pointer){ this.setTexture(CONSTANTS.SCENE.MENU.BUTTON.PLAYSELECTED.NAME);}
    changeplayoff(pointer){this.setTexture(CONSTANTS.SCENE.MENU.BUTTON.PLAY.NAME);}
    changehelpon(pointer){ this.setTexture(CONSTANTS.SCENE.MENU.BUTTON.HELPSELECTED.NAME);}
    changehelpoff(pointer){this.setTexture(CONSTANTS.SCENE.MENU.BUTTON.HELP.NAME);}
    changestoreon(pointer){ this.setTexture(CONSTANTS.SCENE.MENU.BUTTON.STORESELECTED.NAME);}
    changestoreoff(pointer){this.setTexture(CONSTANTS.SCENE.MENU.BUTTON.STORE.NAME);}
    changesettingson(pointer){ this.setTexture(CONSTANTS.SCENE.MENU.BUTTON.SETTINGSSELECTED.NAME);}
    changesettingsoff(pointer){this.setTexture(CONSTANTS.SCENE.MENU.BUTTON.SETTINGS.NAME);}

    update() {
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
    }

    transitionComplete(ev) {
        this.logo.setScale(CONSTANTS.SCENE.LOGO.SCALE);
    }


}