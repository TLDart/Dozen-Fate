class SettingsScene extends Phaser.Scene {
    logo;
    background;

    constructor() {
        super(CONSTANTS.SCENE.SETTINGS.NAME); // DO NOT FORGET TO ADD SCENE TO MAIN
    }

    init(data){
        this.cookies = data; // TODO: fix this
        console.log(this.cookies)
    }
    preload() {
        for(let i = 0; i < this.cookies["ships"].length; i++){
            if(this.cookies["ships"][i] === CONSTANTS.SCENE.STORE.CODES.USING) // FInd the ship that the player is using
                var index = i;
        }
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.NAME, "assets/Sprites/UI/backArrowBlue.png");
        this.load.image(CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.NAMESELECTED, "assets/Sprites/UI/backArrowPink.png");
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
        var url;
        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexsliderplugin.min.js';
        this.load.plugin('rexsliderplugin', url, true);

        url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/assets/images/white-dot.png';
        this.load.image('dot', url);
        this.load.image("shipS",`assets/Sprites/Ally/heroi_${index + 1}.png`);
    }

    create() {
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE);
        this.backButton = this.add.sprite(CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING - CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.NAME).setInteractive();
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);
        this.changemenu = function () {
            this.changelevel(CONSTANTS.SCENE.MENU.NAME);}

        this.backButton.on('pointerout', this.changebackoff, this);
        this.backButton.on('pointerover', this.changebackon, this);
        this.backButton.on('pointerdown', this.changemenu, this);

        this.vol = this.add.bitmapText(CONSTANTS.CANVAS.WIDTH / 2 - CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING * 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.BTNSIZE + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING, CONSTANTS.SCENE.INTRO.TEXT.NAME, CONSTANTS.SCENE.SETTINGS.TEXT.MESSAGE, CONSTANTS.SCENE.INTRO.TEXT.FONTSIZE).setOrigin();

        this.img = this.add.sprite(CONSTANTS.CANVAS.WIDTH/2 - CONSTANTS.SCENE.SETTINGS.SLIDERWIDTH/2 , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.BTNSIZE + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING * 4, 'shipS').setScale(0.5).setDepth(1);
        this.img.slider = this.plugins.get('rexsliderplugin').add(this.img, {
            endPoints: [{
                x: this.img.x,
                y: this.img.y,
            },
                {
                    x: this.img.x + 200,
                    y: this.img.y
                }
            ],
            value: this.cookies["volume"],
            gap: 0.01,
        });

        //this.add.sprite("shipS").strokePoints(this.img.slider.endPoints)
        this.add.graphics()
            .lineStyle(2, 0x55ff55, 1)
            .strokePoints(this.img.slider.endPoints);

       //this.text = this.add.bitmapText(CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING * 5, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.BTNSIZE + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING, CONSTANTS.SCENE.INTRO.TEXT.NAME, "", CONSTANTS.SCENE.INTRO.TEXT.FONTSIZE).setOrigin();
        this.text = this.add.text(CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING * 6, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.BTNSIZE + CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.PADDING,"").setOrigin();

        this.cursorKeys = this.input.keyboard.createCursorKeys();


    }

    changebackon(pointer) {
        this.backButton.setTexture(CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.NAMESELECTED);
        this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)
    }

    changebackoff(pointer) {
        this.backButton.setTexture(CONSTANTS.SCENE.SETTINGS.BUTTON.BACK.NAME);
    }

    changelevel(levelName) {
        var config = {
            target: levelName,
            duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
            moveBelow: true,
            data: this.cookies
        };
        this.scene.transition(config);
    }


    update() {
            if (this.cursorKeys.left.isDown) {
                this.img.slider.value -= 0.01;
            } else if (this.cursorKeys.right.isDown) {
                this.img.slider.value += 0.01;
            }

        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
        this.cookies["volume"] = this.img.slider.value
        CONSTANTS.MUSIC.REF.setVolume(this.cookies["volume"]);
        this.text.setText((Math.round(this.img.slider.value* 100)).toString() + "%");
    }


}