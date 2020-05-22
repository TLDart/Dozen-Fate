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

    init(data) {
        console.log("init menuscene");
        this.logoStartVisible = data.logoVisibility;
        //console.log(data);
        this.bugFix = data.bugFix;
        this.cookies = data.cookies;
        this.reseted = false;
        this.timer = 0;
        console.log(this.cookies)
        this.flushCookie(this.cookies)
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
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0).setVisible(this.bugFix);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE).setVisible(this.logoStartVisible);
        // Logo listener
        this.events.on("transitioncomplete", this.transitionComplete, this); // Este "this" é preciso ainda que a documentação diga que não, senão isto dá erro
        // + Add to this scene
        this.playButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING, CONSTANTS.SCENE.MENU.BUTTON.PLAY.NAME).setInteractive().setVisible(this.bugFix);
        this.helpButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 2, CONSTANTS.SCENE.MENU.BUTTON.HELP.NAME).setInteractive().setVisible(this.bugFix);
        this.storeButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 3, CONSTANTS.SCENE.MENU.BUTTON.STORE.NAME).setInteractive().setVisible(this.bugFix);
        this.settingsButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 4, CONSTANTS.SCENE.MENU.BUTTON.SETTINGS.NAME).setInteractive().setVisible(this.bugFix);
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);
        // Listeners
        if(CONSTANTS.MUSIC.REF === undefined){
            CONSTANTS.MUSIC.REF = this.sound.add(CONSTANTS.SCENE.MENU.BACKGROUND_MUSIC.NAME);
            console.log("volume ", this.cookies["volume"] )
            CONSTANTS.MUSIC.REF.setVolume(this.cookies["volume"]);
            CONSTANTS.MUSIC.REF.play(CONSTANTS.SCENE.MENU.BACKGROUND_MUSIC.CONFIG);
        }

        this.changeplay = function () {
            this.changelevel(CONSTANTS.SCENE.MENUPLAY.NAME)
        }
        this.changehelp = function () {
            this.changelevel(CONSTANTS.SCENE.HELP.NAME)
        }
        this.changestore= function () {
            this.changelevel(CONSTANTS.SCENE.STORE.NAME)
        }
        this.changesettings= function () {
            this.changelevel(CONSTANTS.SCENE.SETTINGS.NAME)
        }
        this.activePlay = function () {
            this.activate(this.playButton, CONSTANTS.SCENE.MENU.BUTTON.PLAYSELECTED.NAME);
        }
        this.inactivePlay = function () {
            this.deactivate(this.playButton, CONSTANTS.SCENE.MENU.BUTTON.PLAY.NAME);
        }
        this.activeHelp = function () {
            this.activate(this.helpButton, CONSTANTS.SCENE.MENU.BUTTON.HELPSELECTED.NAME);
        }
        this.inactiveHelp = function () {
            this.deactivate(this.helpButton, CONSTANTS.SCENE.MENU.BUTTON.HELP.NAME);
        }
        this.activeStore = function () {
            this.activate(this.storeButton, CONSTANTS.SCENE.MENU.BUTTON.STORESELECTED.NAME);
        }
        this.inactiveStore = function () {
            this.deactivate(this.storeButton, CONSTANTS.SCENE.MENU.BUTTON.STORE.NAME);
        }
        this.activeSettings = function () {
            this.activate(this.settingsButton, CONSTANTS.SCENE.MENU.BUTTON.SETTINGSSELECTED.NAME);
        }
        this.inactiveSettings = function () {
            this.deactivate(this.settingsButton, CONSTANTS.SCENE.MENU.BUTTON.SETTINGS.NAME);
        }
        this.playButton.on('pointerover', this.activePlay, this);
        this.playButton.on('pointerout', this.inactivePlay, this);
        this.playButton.on('pointerdown', this.changeplay, this);
        this.helpButton.on('pointerover', this.activeHelp, this);
        this.helpButton.on('pointerout', this.inactiveHelp, this);
        this.helpButton.on('pointerdown', this.changehelp, this);
        this.storeButton.on('pointerover', this.activeStore, this);
        this.storeButton.on('pointerout', this.inactiveStore, this);
        this.storeButton.on('pointerdown', this.changestore, this);
        this.settingsButton.on('pointerover', this.activeSettings, this);
        this.settingsButton.on('pointerout', this.inactiveSettings, this);
        this.settingsButton.on('pointerdown', this.changesettings, this);
    }

    activate(button, texture) {
        button.setTexture(texture);
        this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG);
    }

    deactivate(button, texture) {
        button.setTexture(texture);
    }

    changelevel(levelName) {
        var config = {
            target: levelName,
            duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
            moveBelow: true,
            onUpdate: this.transitionOut,
            data: this.cookies
        };
        this.scene.transition(config);
    }

    transitionOut(progress) {
        //this.music.stop();
        if (progress >= 0.5) {
            this.background.alpha = 1 - 4 * (progress - 0.5) ** 2; //perguntem-me sobre esta formula
        }
    }

    update() {
        this.timer += 16;
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
        if (this.timer > CONSTANTS.SCENE.SPEED.TRANSITION && !this.reseted){
            this.reseted = true;
            this.allVisible();
        }
    }

    transitionComplete(ev) {
        this.allVisible();
    }

    allVisible(){
        this.logo.visible = true;
        this.background.setVisible(true);
        this.playButton.setVisible(true);
        this.helpButton.setVisible(true);
        this.storeButton.setVisible(true);
        this.settingsButton.setVisible(true);
    }

    flushCookie(dataS,days=30) {
        let d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000)); // Cookies expiring days
        let expireDay = "expires="+d.toUTCString();
        Object.keys(dataS).forEach(element => {
            //console.log(element + "=" + dataS[element].toString()+ ";" + expireDay);
            document.cookie = element + "=" + dataS[element].toString() + ";" + expireDay;
        });
    }

}