class IntroScene extends Phaser.Scene {
    logo;
    background;
    text;
    timer;
    blink;

    constructor() {
        super(CONSTANTS.SCENE.INTRO.NAME);
        this.timer = 0;
        this.blink = true;
    }

    preload() {
        console.log("preload introscene");
        // Load from Assets
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.bitmapFont(CONSTANTS.SCENE.INTRO.TEXT.NAME, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt");
        this.load.audio(CONSTANTS.SCENE.INTRO.TEXT.SOUND, "assets/Sounds/Buttons/sfx_sounds_button4.wav");
        this.load.audio(CONSTANTS.SCENE.INTRO.BACKGROUND_MUSIC.NAME, "assets/Sounds/Logical_Sequence_of_Events.mp3");
    }

    create() {
        console.log("create introscene");
        let mockData = {
            volume : 0.6,
            ships : [2,1,1,0,0,0,0,0,0,0,0,0],
            coins: 100000,
            level: 6
        };
        // Add to this scene
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.INTRO.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE);
        this.text = this.add.bitmapText(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.INTRO.TEXT.Y, CONSTANTS.SCENE.INGAME.GAMEOVER.FONT, CONSTANTS.SCENE.INTRO.TEXT.MESSAGE, CONSTANTS.SCENE.INTRO.TEXT.FONTSIZE).setOrigin();
        // Listeners
        this.input.keyboard.on(CONSTANTS.SCENE.INTRO.CONTINUE, this.spaceHandler, this);
        this.btnAudio = this.sound.add(CONSTANTS.SCENE.INTRO.TEXT.SOUND);
        this.music = this.sound.add(CONSTANTS.SCENE.INTRO.BACKGROUND_MUSIC.NAME);
        this.music.play(CONSTANTS.SCENE.INTRO.BACKGROUND_MUSIC.CONFIG);
        //this.flushCookie(mockData)
        this.cookies = this.loadCookies();
        //console.log(this.cookies);
        //this.sound.pauseOnBlur = false;
    }

    update() {  // The update function updates the scene every 60hz ==> every 16ms
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
        if (this.blink) {
            this.timer += 16; // so every real 16ms, we increment timer += 16 (ms)
            if (this.timer > CONSTANTS.SCENE.SPEED.TEXT) {
                this.timer = 0;
                this.text.visible = !this.text.visible;
            }
        }
    }

    spaceHandler(ev) {
        this.input.keyboard.off(CONSTANTS.SCENE.INTRO.CONTINUE);
        this.blink = false;
        this.text.visible = true;
        var config = {
            target: CONSTANTS.SCENE.MENU.NAME,
            duration: CONSTANTS.SCENE.SPEED.TRANSITION,
            moveBelow: true,
            onUpdate: this.transitionOut,
            data: {logoVisibility: false, cookies : this.cookies}
        };
        this.scene.transition(config);
        this.btnAudio.play();
    }

    transitionOut(progress) {
        //console.log("progress " + progress);
        this.text.y = CONSTANTS.SCENE.INTRO.TEXT.Y + (CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.INTRO.TEXT.Y) * progress;
        this.text.alpha = 1 - progress;
        this.logo.y = CONSTANTS.SCENE.INTRO.LOGO.Y - (CONSTANTS.SCENE.INTRO.LOGO.Y - CONSTANTS.SCENE.MENU.LOGO.Y) * progress;
        this.music.stop();
        if (progress >= 0.5) {
            this.background.alpha = 1 - 4 * (progress - 0.5) ** 2; //perguntem-me sobre esta formula
        }
    }

    loadCookies() {
        let parsedData = {
            volume : 1,
            ships : [2].concat(new Array(CONSTANTS.SCENE.STORE.SPRITES.SPRITENUMBER - 1).fill(0)),
            coins: 0,
            level: 0
        };
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        ca.forEach(element => {
            let parsedInput = element.split("=");
           //console.log(parsedInput[0],parsedInput[1].toString());
            if(parsedInput[0].toString() === " volume"){
                console.log("here")
                parsedData.volume = parseFloat(parsedInput[1].toString())
            }
            else if(parsedInput[0].toString() === " coins"){
                parsedData.coins = parseInt(parsedInput[1].toString())
            }
            else if(parsedInput[0].toString() === " level"){
                parsedData.level = parseInt(parsedInput[1].toString())
            }
            else if(parsedInput[0].toString() === " ships"){
                parsedData.ships = parsedInput[1].split`,`.map(x=>+x); // this converts an array of strings to an array of ints
            }
        })
        //console.log(parsedData)
        return parsedData;
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
