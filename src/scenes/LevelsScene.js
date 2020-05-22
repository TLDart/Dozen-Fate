class LevelsScene extends Phaser.Scene {
    logo;
    background;
    test;
    buttons = new Array(CONSTANTS.SCENE.LEVELS.COLS * CONSTANTS.SCENE.LEVELS.ROWS);
    text = new Array(CONSTANTS.SCENE.LEVELS.COLS * CONSTANTS.SCENE.LEVELS.ROWS);
    menuText;
    fadedElements = [];
    pageNr = 0;
    constructor() {
        super(CONSTANTS.SCENE.LEVELS.NAME); // DO NOT FORGET TO ADD SCENE TO MAIN
    }

    init(data){
        this.cookies = data.cookies;
    }

    preload() {
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAME, "assets/Sprites/UI/backArrowBlue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAMESELECTED, "assets/Sprites/UI/backArrowPink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAME, "assets/Sprites/UI/farrowblue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAMESELECTED, "assets/Sprites/UI/farrowpink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAMEMAXPAGES, "assets/Sprites/UI/farrowgrey.png");

        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAME, "assets/Sprites/UI/buttonNormal.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESELECTED, "assets/Sprites/UI/buttonSelected.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMEDISABLED, "assets/Sprites/UI/buttonDeselect.png")


        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
        this.load.bitmapFont(CONSTANTS.SCENE.LEVELS.TEXT.NAMEPINK, "assets/Fonts/joystix/joystix_pink.png", "assets/Fonts/joystix/joystix_black.fnt");
        this.load.bitmapFont(CONSTANTS.SCENE.LEVELS.TEXT.NAMEBLACK, "assets/Fonts/joystix/joystix_black.png", "assets/Fonts/joystix/joystix_pink.fnt");
        this.load.bitmapFont(CONSTANTS.SCENE.LEVELS.TEXT.NAMEWHITE, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt");
    }

    create() {
        //Logo and Background
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE);
        // Next and prev buttons
        this.back = this.add.sprite(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING + CONSTANTS.SCENE.LEVELS.SPRITESIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.LEVELS.SPRITESIZE / 2, CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAME).setInteractive();
        this.next = this.add.sprite(CONSTANTS.CANVAS.WIDTH -CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAME).setInteractive();
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);

        // back to Menu Text
        this.menuText = this.add.bitmapText(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING + CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE - 15,CONSTANTS.SCENE.LEVELS.TEXT.NAMEWHITE ,CONSTANTS.SCENE.LEVELS.TEXT.MESSAGE, CONSTANTS.SCENE.LEVELS.TEXT.FONTSIZE).setOrigin().setVisible(false);

        //Coins on the top left

        //Main Menus
        this.makePage(this.cookies.ships, this.cookies.coins);
        //Auxiliary functions
        this.activenext = function () {
            if(this.pageNr === CONSTANTS.SCENE.LEVELS.MAXPAGES){
                this.next.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAMEMAXPAGES)
                this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG);
            }
            else
                this.next.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAMESELECTED)
                this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG);
        }
        this.inactivatenext = function (){this.next.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAME);}
        this.activeback = function () {
            if(this.pageNr === 0)
                this.menuText.setVisible(true);
            this.back.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAMESELECTED);
        }

        this.inactivateback = function (){this.back.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAME); this.menuText.setVisible(false)}

        // Listeners
        this.back.on('pointerover',this.activeback,this);
        this.back.on('pointerout',this.inactivateback,this);
        this.next.on('pointerover',this.activenext,this);
        this.next.on('pointerout',this.inactivatenext,this);
        this.back.on('pointerdown',this.handleback,this);
        this.next.on('pointerdown',this.handlenext,this);
    }
    handleback(){
        if(this.pageNr === 0){
            this.disableButtons()
            this.changelevel(CONSTANTS.SCENE.MENU.NAME);
        }

        else{
            this.disableButtons()
            this.pageNr--;
            this.fadeOut.play();
            //animate
        }

    }
    handlenext(){
        if(this.pageNr !== CONSTANTS.SCENE.STORE.MAXPAGES){
            this.disableButtons()
            this.pageNr++;
            this.fadeOut.play();
        }
    }

    disableButtons(){
        this.buttons.forEach( element => element.removeAllListeners())
        this.text.forEach( element => element.removeAllListeners())
    }

    changelevel(levelName) {
        var config = {
            target: levelName,
            duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
            moveBelow: true,
            data: {logoVisibility : true , cookies : this.cookies}
        };
        this.scene.transition(config);
    }

    update() {
        this.background.tilePositionY += CONSTANTS.SCENE.SPEED.TILE;
    }

    makePage(){
        console.log("max level -> ", this.cookies.level)
        console.log(this.cookies)
        for(let i = 0; i < CONSTANTS.SCENE.STORE.ROWS; i++){
            for(let j = 0; j < CONSTANTS.SCENE.STORE.COLS; j++){
                let arrayPos = i*(CONSTANTS.SCENE.STORE.COLS) +j;
                let pagePos = this.pageNr * (CONSTANTS.SCENE.STORE.COLS * CONSTANTS.SCENE.STORE.ROWS) + i*(CONSTANTS.SCENE.STORE.COLS) +j;
                //Buttons
                if( pagePos< this.cookies.level){
                this.buttons[arrayPos] = this.add.sprite(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(1 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.LEVELS.BUTTONS.NAME).setInteractive();
                //this.buttons[arrayPos] = this.add.sprite(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(2 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.LEVELS.BUTTONS.NAME).setInteractive();
                this.buttons[arrayPos].key = pagePos;
                console.log(this.buttons[arrayPos].key);
                this.buttons[arrayPos].on('pointerover',() =>{
                    //console.log(data[this.buttons[i*(CONSTANTS.SCENE.STORE.COLS + 1) +j].key], this.buttons[i*(CONSTANTS.SCENE.STORE.COLS + 1) +j].key)
                    this.buttons[arrayPos].setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESELECTED)
                    this.text[arrayPos].destroy();
                    this.text[arrayPos] = this.add.bitmapText(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(1 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.LEVELS.TEXT.NAMEPINK,pagePos + 1, CONSTANTS.SCENE.LEVELS.BUTTONS.TEXTSIZE).setOrigin(0.5,0.5);
                    this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)
                    this.createTween()
                });
                this.buttons[arrayPos].on('pointerout', () =>{
                    this.buttons[arrayPos].setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NAME);
                    this.text[arrayPos].destroy()
                    this.text[arrayPos] = this.add.bitmapText(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(1 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.LEVELS.TEXT.NAMEBLACK,pagePos + 1, CONSTANTS.SCENE.LEVELS.BUTTONS.TEXTSIZE).setOrigin(0.5,0.5);
                    this.createTween()
                });
                this.buttons[arrayPos].on('pointerdown', () =>{// Launch a new level on pointer down
                    var config = {
                        target: CONSTANTS.SCENE.INGAME.NAME,
                        duration: CONSTANTS.SCENE.SPEED.MENUTRANSITION,
                        moveBelow: true,
                        data: {difficulty : this.buttons[arrayPos].key , cookies : this.cookies}
                    };
                    this.scene.transition(config);
                });
                //Text
                this.text[arrayPos] = this.add.bitmapText(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(1 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.LEVELS.TEXT.NAMEBLACK,pagePos + 1, CONSTANTS.SCENE.LEVELS.BUTTONS.TEXTSIZE).setOrigin(0.5,0.5);
                }
                else{
                    this.buttons[arrayPos] = this.add.sprite(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(1 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.LEVELS.BUTTONS.NAMEDISABLED);
                }
            }
        }
        this.createTween()
    }
    createTween(){
        this.fadedElements = [];
        this.fadedElements.push.apply(this.fadedElements, this.buttons);
        this.fadedElements.push.apply(this.fadedElements, this.text);
        this.fadeIn = this.tweens.add({
            targets: this.fadedElements,
            alpha: { from: 0, to: 1 },
            ease: 'Cubic',// 'Cubic', 'Elastic', 'Bounce', 'Back'
            paused: true,
            duration: 500,
            repeat: 0,            // -1: infinity
            yoyo: false

        });
        this.fadeOut = this.tweens.add({
            targets: this.fadedElements,
            alpha: { from: 1, to: 0 },
            ease: 'Cubic',
            paused: true,// 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 500,
            repeat: 0,            // -1: infinity
            yoyo: false,
            onComplete: () =>{
                console.log("here");
                this.makePage(this.cookies.ships);
            }
        });
    }
}