var music = null;
class MenuScene extends Phaser.Scene {
    logo;
    background;
    playButton;
    helpButton;
    storeButton;
    settingsButton;
    music;

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
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
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
        music = this.sound.add(CONSTANTS.SCENE.MENU.BACKGROUND_MUSIC.NAME);
        //music.play(CONSTANTS.SCENE.MENU.BACKGROUND_MUSIC.CONFIG);
        this.changeplay = function () {
            this.changelevel(CONSTANTS.SCENE.MENUPLAY.NAME)
        }
        this.changehelp = function() {
            this.changelevel(CONSTANTS.SCENE.HELP.NAME)
        }

        this.playButton.on('pointerover', this.changeplayon,this);
        this.playButton.on('pointerout', this.changeplayoff,this);
        this.playButton.on('pointerdown', this.changeplay,this);
        this.helpButton.on('pointerover', this.changehelpon,this);
        this.helpButton.on('pointerout', this.changehelpoff,this);
        this.helpButton.on('pointerdown', this.changehelp,this);
        this.storeButton.on('pointerover', this.changestoreon, this);
        this.storeButton.on('pointerout', this.changestoreoff,this);
        this.settingsButton.on('pointerover', this.changesettingson,this);
        this.settingsButton.on('pointerout', this.changesettingsoff,this);
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);


    }

    changeplayon(pointer){ this.playButton.setTexture(CONSTANTS.SCENE.MENU.BUTTON.PLAYSELECTED.NAME); this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)}
    changeplayoff(pointer){this.playButton.setTexture(CONSTANTS.SCENE.MENU.BUTTON.PLAY.NAME);}
    changehelpon(pointer){ this.helpButton.setTexture(CONSTANTS.SCENE.MENU.BUTTON.HELPSELECTED.NAME);this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)}
    changehelpoff(pointer){this.helpButton.setTexture(CONSTANTS.SCENE.MENU.BUTTON.HELP.NAME);}
    changestoreon(pointer){ this.storeButton.setTexture(CONSTANTS.SCENE.MENU.BUTTON.STORESELECTED.NAME);this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)}
    changestoreoff(pointer){this.storeButton.setTexture(CONSTANTS.SCENE.MENU.BUTTON.STORE.NAME);}
    changesettingson(pointer){ this.settingsButton.setTexture(CONSTANTS.SCENE.MENU.BUTTON.SETTINGSSELECTED.NAME);this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)}
    changesettingsoff(pointer){this.settingsButton.setTexture(CONSTANTS.SCENE.MENU.BUTTON.SETTINGS.NAME);}

    changelevel(levelName) {
        var config = {
            target: levelName,
            duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
            moveBelow: true,
            onUpdate: this.transitionOut,
        };
        this.scene.transition(config);
    }

    transitionOut(progress){
        console.log("gasdfagskfhj");
        //this.music.stop();
        if (progress >= 0.5){
            this.background.alpha = 1 - 4 * (progress - 0.5)**2; //perguntem-me sobre esta formula
        }
    }
    update() {
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
    }

    transitionComplete(ev) {
        this.logo.setScale(CONSTANTS.SCENE.LOGO.SCALE);
    }


}