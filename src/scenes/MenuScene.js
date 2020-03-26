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
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.PLAY.NAME, "assets/Sprites/UI/MenuPlay.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.HELP.NAME, "assets/Sprites/UI/MenuHelp.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.STORE.NAME, "assets/Sprites/UI/MenuStore.png");
        this.load.image(CONSTANTS.SCENE.MENU.BUTTON.SETTINGS.NAME, "assets/Sprites/UI/MenuSettings.png");

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
    }

    update() {
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
    }

    transitionComplete(ev) {
        this.logo.setScale(CONSTANTS.SCENE.LOGO.SCALE);
    }


}