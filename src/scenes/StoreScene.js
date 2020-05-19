class StoreScene extends Phaser.Scene {
    logo;
    background;
    test;
    buttons = new Array(CONSTANTS.SCENE.STORE.COLS * CONSTANTS.SCENE.STORE.ROWS);
    sprites = new Array(CONSTANTS.SCENE.STORE.SPRITES.SPRITENUMBER);
    text = new Array(CONSTANTS.SCENE.STORE.COLS * CONSTANTS.SCENE.STORE.ROWS);
    menuText;
    fadedElements = [];
    pageNr = 0;
    constructor() {
        super(CONSTANTS.SCENE.STORE.NAME); // DO NOT FORGET TO ADD SCENE TO MAIN
    }

    init(data){
        this.cookies = data;
    }

    preload() {
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.BACK.NAME, "assets/Sprites/UI/backArrowBlue.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.BACK.NAMESELECTED, "assets/Sprites/UI/backArrowPink.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.NEXT.NAME, "assets/Sprites/UI/farrowblue.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.NEXT.NAMESELECTED, "assets/Sprites/UI/farrowpink.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.NEXT.NAMEMAXPAGES, "assets/Sprites/UI/farrowgrey.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.COIN.NAME,"assets/Sprites/Others/coin.png");

        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.NAMES[0], "assets/Sprites/UI/buy.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.NAMES[1], "assets/Sprites/UI/bought.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.NAMES[2], "assets/Sprites/UI/using.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.NAMESSELECTED[0], "assets/Sprites/UI/buySelected.png");
        this.load.image(CONSTANTS.SCENE.STORE.BUTTONS.NAMESSELECTED[1], "assets/Sprites/UI/boughtSelected.png");
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
        this.load.bitmapFont(CONSTANTS.SCENE.STORE.TEXT.NAME, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt");
        this.load.bitmapFont(CONSTANTS.SCENE.STORE.TEXT.NAMEBLACK, "assets/Fonts/joystix/joystix_black.png", "assets/Fonts/joystix/joystix_white.fnt");

        //Ships
        for(let i = 0; i < CONSTANTS.SCENE.STORE.SPRITES.SPRITENUMBER; i++){
            this.load.image(CONSTANTS.SCENE.STORE.SPRITES.NAMES[i], `assets/Sprites/Ally/heroi_${i + 1}.png`)
       }
    }

    create() {
        let data = [2,0,0,1,0,1,0,0,1,1,0,0];
        let coins = 10000;
        //Logo and Background
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LOGO.SCALE);
        // Next and prev buttons
        this.back = this.add.sprite(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING + CONSTANTS.SCENE.STORE.SPRITESIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.STORE.SPRITESIZE / 2, CONSTANTS.SCENE.STORE.BUTTONS.BACK.NAME).setInteractive();
        this.next = this.add.sprite(CONSTANTS.CANVAS.WIDTH -CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.SCENE.STORE.BUTTONS.NEXT.NAME).setInteractive();
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);

        // back to Menu Text
        this.menuText = this.add.bitmapText(CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING + CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE / 2, CONSTANTS.CANVAS.HEIGHT - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.PADDING - CONSTANTS.SCENE.MENUPLAY.BUTTON.BACK.BTNSIZE - 15,CONSTANTS.SCENE.STORE.TEXT.NAME ,CONSTANTS.SCENE.STORE.TEXT.MESSAGE, CONSTANTS.SCENE.STORE.TEXT.FONTSIZE).setOrigin().setVisible(false);


        //Coins on the top left
        this.coinage = this.add.bitmapText(CONSTANTS.SCENE.STORE.BUTTONS.PADDING * 3, CONSTANTS.SCENE.STORE.BUTTONS.PADDING,CONSTANTS.SCENE.STORE.TEXT.NAME, coins, CONSTANTS.SCENE.STORE.COINSIZE).setOrigin(0.5,0.5);
        this.coin = this.add.sprite(CONSTANTS.SCENE.STORE.BUTTONS.PADDING, CONSTANTS.SCENE.STORE.BUTTONS.PADDING, CONSTANTS.SCENE.STORE.BUTTONS.COIN.NAME).setScale(CONSTANTS.SCENE.STORE.BUTTONS.COIN.SCALE);

        //Main Menus
        this.makePage(data, coins);
        //Auxiliary functions
        this.activenext = function () {
            if(this.pageNr === CONSTANTS.SCENE.STORE.MAXPAGES){
                this.activate(this.next, 0,CONSTANTS.SCENE.STORE.BUTTONS.NEXT.NAMEMAXPAGES);
            }
            else
                this.activate(this.next, 0,CONSTANTS.SCENE.STORE.BUTTONS.NEXT.NAMESELECTED);
        }
        this.inactivatenext = function (){this.deactivate(this.next, 0,CONSTANTS.SCENE.STORE.BUTTONS.NEXT.NAME);}
        this.activeback = function () {
            if(this.pageNr === 0)
                this.menuText.setVisible(true);
            this.activate(this.back, 0,CONSTANTS.SCENE.STORE.BUTTONS.BACK.NAMESELECTED);
        }

        this.inactivateback = function (){this.deactivate(this.back, 0,CONSTANTS.SCENE.STORE.BUTTONS.BACK.NAME); this.menuText.setVisible(false)}

    // Listeners
        this.back.on('pointerover',this.activeback,this);
        this.back.on('pointerout',this.inactivateback,this);
        this.next.on('pointerover',this.activenext,this);
        this.next.on('pointerout',this.inactivatenext,this);
        this.back.on('pointerdown',this.handleback,this);
        this.next.on('pointerdown',this.handlenext,this);
    }
    handleback(){
        if(this.pageNr === 0)
            this.changelevel(CONSTANTS.SCENE.MENU.NAME)
        else{
            this.pageNr--;
            this.fadeOut.play();
            //animate
        }
    }
    handlenext(){
        if(this.pageNr !== CONSTANTS.SCENE.STORE.MAXPAGES){
            this.pageNr++;
            this.fadeOut.play();
        }

        //animate
    }
    activate(button, key,name){
        if(key === 0)
            button.setTexture(name);
        else
            button.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[key]);
        this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG);
    }
    deactivate(button, key,name){
        if(key === 0)
            button.setTexture(name);
        else
            button.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[key]);
    }

    changelevel(levelName) {
        CONSTANTS.GENERAL.COINS++;
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

    makePage(data, coins){
        for(let i = 0; i < CONSTANTS.SCENE.STORE.ROWS; i++){
            for(let j = 0; j < CONSTANTS.SCENE.STORE.COLS; j++){
                let arrayPos = i*(CONSTANTS.SCENE.STORE.COLS) +j;
                let pagePos = this.pageNr * (CONSTANTS.SCENE.STORE.COLS * CONSTANTS.SCENE.STORE.ROWS) + i*(CONSTANTS.SCENE.STORE.COLS) +j;
                //Buttons
                this.buttons[arrayPos] = this.add.sprite(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(2 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.STORE.BUTTONS.NAMES[data[pagePos]]).setInteractive();
                this.buttons[arrayPos].key = pagePos;
                console.log(this.buttons[arrayPos].key);
                this.buttons[arrayPos].on('pointerover',() =>{
                    //console.log(data[this.buttons[i*(CONSTANTS.SCENE.STORE.COLS + 1) +j].key], this.buttons[i*(CONSTANTS.SCENE.STORE.COLS + 1) +j].key)
                    if(data[this.buttons[arrayPos].key] !== 2){
                        this.buttons[arrayPos].setTexture(CONSTANTS.SCENE.STORE.BUTTONS.NAMESSELECTED[data[this.buttons[arrayPos].key]])
                        this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG)
                    }
                });
                this.buttons[arrayPos].on('pointerout', () =>{
                    if(data[this.buttons[arrayPos].key] !== 2){
                        this.buttons[arrayPos].setTexture(CONSTANTS.SCENE.STORE.BUTTONS.NAMES[data[this.buttons[arrayPos].key]]);
                    }
                });
                this.buttons[arrayPos].on('pointerdown', () =>{
                    console.log(data[this.buttons[arrayPos].key] === 0,coins >= CONSTANTS.SCENE.STORE.SPRITES.COST[this.buttons[arrayPos].key])
                    if(data[this.buttons[arrayPos].key] === 0 && coins >= CONSTANTS.SCENE.STORE.SPRITES.COST[this.buttons[arrayPos].key]){
                        console.log(CONSTANTS.SCENE.STORE.SPRITES.COST[this.buttons[arrayPos].key]);
                        console.log(this.buttons[arrayPos].key)
                        coins -= CONSTANTS.SCENE.STORE.SPRITES.COST[this.buttons[arrayPos].key];
                        this.coinage.setText(coins);
                        console.log(coins);
                        data[this.buttons[arrayPos].key] = 1;
                        this.text[this.buttons[arrayPos].key % CONSTANTS.SCENE.STORE.ITEMS].setVisible(false);
                        this.buttons[arrayPos].setTexture(CONSTANTS.SCENE.STORE.BUTTONS.NAMESSELECTED[data[this.buttons[arrayPos].key]])

                        //this.btnSound.play(CONSTANTS.SCENE.BTNSOUND.CONFIG) //TODO:Set up a buy sound
                    }
                    if(data[this.buttons[arrayPos].key] === CONSTANTS.SCENE.STORE.CODES.BOUGHT){
                        for(let i = 0; i < data.length; i++){
                            if(data[i] === CONSTANTS.SCENE.STORE.CODES.USING)
                                var index = i;
                        }
                        console.log("index -> ",index);
                        data[index] = CONSTANTS.SCENE.STORE.CODES.BOUGHT;
                        data[this.buttons[arrayPos].key] = CONSTANTS.SCENE.STORE.CODES.USING;
                        this.buttons[arrayPos].setTexture(CONSTANTS.SCENE.STORE.BUTTONS.NAMES[CONSTANTS.SCENE.STORE.CODES.USING]);
                        if(index >= this.pageNr * (CONSTANTS.SCENE.STORE.COLS * CONSTANTS.SCENE.STORE.ROWS) && index < (this.pageNr + 1) * (CONSTANTS.SCENE.STORE.COLS * CONSTANTS.SCENE.STORE.ROWS))
                            this.buttons[index % (CONSTANTS.SCENE.STORE.COLS * CONSTANTS.SCENE.STORE.ROWS)].setTexture(CONSTANTS.SCENE.STORE.BUTTONS.NAMES[CONSTANTS.SCENE.STORE.CODES.BOUGHT]);
                    }
                });
                //Text
                if(data[pagePos] === 0){
                    this.text[arrayPos] = this.add.bitmapText(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(2 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.STORE.TEXT.NAMEBLACK,CONSTANTS.SCENE.STORE.SPRITES.COST[pagePos], CONSTANTS.SCENE.STORE.COINSIZE).setOrigin(0.5,0.5);
                    //this.text[arrayPos].style.fill = "#000000";
                    this.text[arrayPos].key = i*j +j;
                }
                //Sprites
                this.sprites[arrayPos] = this.add.sprite(CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH / 2 + CONSTANTS.SCENE.STORE.BUTTONS.BTNWIDTH * j  + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (j + 1) , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.STORE.SPRITESIZE *(1 + i) + CONSTANTS.SCENE.STORE.BUTTONS.PADDING * (2 + 4 *i), CONSTANTS.SCENE.STORE.SPRITES.NAMES[pagePos]);
                this.sprites[arrayPos].key = i*j +j;

            }
        }
        this.fadedElements = [];
        this.fadedElements.push.apply(this.fadedElements, this.buttons);
        this.fadedElements.push.apply(this.fadedElements, this.text);
        this.fadedElements.push.apply(this.fadedElements, this.sprites);
        this.fadeIn = this.tweens.add({
            targets: this.fadedElements,
            alpha: { from: 0, to: 1 },
            ease: 'Cubic',// 'Cubic', 'Elastic', 'Bounce', 'Back'
            paused: true,
            duration: 1000,
            repeat: 0,            // -1: infinity
            yoyo: false

        });
        this.fadeOut = this.tweens.add({
            targets: this.fadedElements,
            alpha: { from: 1, to: 0 },
            ease: 'Cubic',
            paused: true,// 'Cubic', 'Elastic', 'Bounce', 'Back'
            duration: 1000,
            repeat: 0,            // -1: infinity
            yoyo: false,
            onComplete: () =>{
                console.log("here");
                this.makePage(data, coins);
            }
        });
    }

}