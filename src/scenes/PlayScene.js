class PlayScene extends Phaser.Scene{
    logo;
    background;
    historyButton;
    arcadeButton;
    constructor() {
        super(CONSTANTS.SCENE.MENUPLAY.NAME); // DO NOT FORGET TO ADD SCENE TO MAIN
    }
    preload(){
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME, "assets/Sprites/UI/MenuHistoryBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORYSELECTED.NAME, "assets/Sprites/UI/MenuHistoryPink.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME, "assets/Sprites/UI/MenuArcadeBlue.png");
        this.load.image(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADESELECTED.NAME, "assets/Sprites/UI/MenuArcadePink.png");
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
    }
    create(){
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE);
        this.historyButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING, CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME).setInteractive();
        this.arcadeButton = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.MENU.BUTTON.SPACING * 2, CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME).setInteractive();
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);

        this.historyButton.on('pointerover', this.changehistoryon,this);
        this.historyButton.on('pointerout', this.changehistoryoff,this);
        this.arcadeButton.on('pointerover', this.changearcadeon,this);
        this.arcadeButton.on('pointerout', this.changearcadeoff,this);
    }
    changehistoryon(pointer){ this.historyButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORYSELECTED.NAME);this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)}
    changehistoryoff(pointer){this.historyButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.HISTORY.NAME);}
    changearcadeon(pointer){this.arcadeButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADESELECTED.NAME); this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)}
    changearcadeoff(pointer){this.arcadeButton.setTexture(CONSTANTS.SCENE.MENUPLAY.BUTTON.ARCADE.NAME);}



    update(){
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;

    }
}