class LevelsScene extends Phaser.Scene{
    button1;
    button2;
    button3;
    button4;
    next;
    back;
    pageNr;
    changePage;
    leftOut;
    leftMid;
    rightOut;
    rightMid;
    maxPages = CONSTANTS.SCENE.LEVELS.MAXPAGES;
    constructor() {
        super(CONSTANTS.SCENE.LEVELS.NAME); // DO NOT FORGET TO ADD SCENE TO MAIN
    }
    preload() {
        this.load.audio(CONSTANTS.SCENE.BTNSOUND.NAME, "assets/Sounds/Buttons/sfx_sounds_button3.wav");
        this.load.image(CONSTANTS.SCENE.LOGO.NAME, "assets/Logo/Logo.png");
        this.load.image(CONSTANTS.SCENE.BACKGROUND.NAME, "assets/Sprites/Others/background.png");
        this.load.bitmapFont(CONSTANTS.SCENE.LEVELS.TEXT.NAME, "assets/Fonts/joystix/joystix_white.png", "assets/Fonts/joystix/joystix_white.fnt");


        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAME, "assets/Sprites/UI/backArrowBlue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAMESELECTED, "assets/Sprites/UI/backArrowPink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAME, "assets/Sprites/UI/farrowblue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAMESELECTED, "assets/Sprites/UI/farrowpink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAMEMAXPAGES, "assets/Sprites/UI/farrowgrey.png");

        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[1], "assets/Sprites/UI/b1blue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[1], "assets/Sprites/UI/b1pink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[2], "assets/Sprites/UI/b2blue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[2], "assets/Sprites/UI/b2pink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[3], "assets/Sprites/UI/b3blue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[3], "assets/Sprites/UI/b3pink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[4], "assets/Sprites/UI/b4blue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[4], "assets/Sprites/UI/b4pink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[5], "assets/Sprites/UI/b5blue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[5], "assets/Sprites/UI/b5pink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[6], "assets/Sprites/UI/b6blue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[6], "assets/Sprites/UI/b6pink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[7], "assets/Sprites/UI/b7blue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[7], "assets/Sprites/UI/b7pink.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[8], "assets/Sprites/UI/b8blue.png");
        this.load.image(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMESSELECTED[8], "assets/Sprites/UI/b8pink.png");
    }

        create(){
        this.background = this.add.tileSprite(0, 0, CONSTANTS.CANVAS.WIDTH, CONSTANTS.CANVAS.HEIGHT, CONSTANTS.SCENE.BACKGROUND.NAME).setOrigin(0, 0);
        this.logo = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.LEVELS.LOGO.Y, CONSTANTS.SCENE.LOGO.NAME).setScale(CONSTANTS.SCENE.LEVELS.LOGO.SCALING);
        this.btnSound = this.sound.add(CONSTANTS.SCENE.BTNSOUND.NAME);
        this.text = this.add.bitmapText(CONSTANTS.CANVAS.WIDTH / 2, CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.LEVELS.BUTTONS.TOPSPACE + CONSTANTS.SCENE.LEVELS.BUTTONS.SPACING * 3, CONSTANTS.SCENE.LEVELS.TEXT.NAME, CONSTANTS.SCENE.LEVELS.TEXT.MESSAGE, CONSTANTS.SCENE.LEVELS.TEXT.FONTSIZE).setOrigin();
        this.text.setVisible(false);
        this.button1 = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2 , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.LEVELS.BUTTONS.TOPSPACE, CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[1]).setInteractive();
        this.button1.key = 1;
        this.button3 = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2 , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.LEVELS.BUTTONS.TOPSPACE, CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[3]).setInteractive();
        this.button3.key = 3;
        this.button2 = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2 , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.LEVELS.BUTTONS.TOPSPACE + CONSTANTS.SCENE.LEVELS.BUTTONS.SPACING, CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[2]).setInteractive();
        this.button2.key = 2;
        this.button4 = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2 , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.LEVELS.BUTTONS.TOPSPACE + CONSTANTS.SCENE.LEVELS.BUTTONS.SPACING, CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[4]).setInteractive();
        this.button4.key = 4;
        this.back = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2 , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.LEVELS.BUTTONS.TOPSPACE + CONSTANTS.SCENE.LEVELS.BUTTONS.SPACING * 2 , CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAME).setInteractive();
        this.next = this.add.sprite(CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2 , CONSTANTS.SCENE.MENU.LOGO.Y + CONSTANTS.SCENE.LEVELS.BUTTONS.TOPSPACE + CONSTANTS.SCENE.LEVELS.BUTTONS.SPACING * 2 , CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAME).setInteractive();
        this.pageNr = 0;
        this.leftOut = false ;
        this.leftMid = false ;
        this.rightMid = false ;
        this.rightOut = false ;


        //auxiliary functions
        this.activeButton1 = function () {this.activate(this.button1, this.button1.key);}
        this.inactivateButton1= function (){this.deactivate(this.button1, this.button1.key);}
        this.activeButton3 = function () {this.activate(this.button3, this.button3.key);}
        this.inactivateButton3 = function (){this.deactivate(this.button3, this.button3.key);}
        this.activeButton2 = function () {this.activate(this.button2, this.button2.key);}
        this.inactivateButton2= function (){this.deactivate(this.button2, this.button2.key);}
        this.activeButton4 = function () {this.activate(this.button4, this.button4.key);}
        this.inactivateButton4 = function (){this.deactivate(this.button4, this.button4.key);}
        this.activenext = function () {
            if(this.pageNr === this.maxPages){
                this.activate(this.next, 0,CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAMEMAXPAGES);
            }
            else
                this.activate(this.next, 0,CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAMESELECTED);
        }
        this.inactivatenext = function (){this.deactivate(this.next, 0,CONSTANTS.SCENE.LEVELS.BUTTONS.NEXT.NAME);}
        this.activeback = function () {
            if(this.pageNr === 0)
                this.text.setVisible(true);
            this.activate(this.back, 0,CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAMESELECTED);}

        this.inactivateback = function (){this.deactivate(this.back, 0,CONSTANTS.SCENE.LEVELS.BUTTONS.BACK.NAME);this.text.setVisible(false)}


        //listeners
        this.button1.on('pointerover',this.activeButton1,this);
        this.button1.on('pointerout',this.inactivateButton1,this);
        this.button3.on('pointerover',this.activeButton3,this);
        this.button3.on('pointerout',this.inactivateButton3,this);
        this.button2.on('pointerover',this.activeButton2,this);
        this.button2.on('pointerout',this.inactivateButton2,this);
        this.button4.on('pointerover',this.activeButton4,this);
        this.button4.on('pointerout',this.inactivateButton4,this);
        this.back.on('pointerover',this.activeback,this);
        this.back.on('pointerout',this.inactivateback,this);
        this.next.on('pointerover',this.activenext,this);
        this.next.on('pointerout',this.inactivatenext,this);

        this.back.on('pointerdown',this.handleback,this);
        this.next.on('pointerdown',this.handlenext,this);

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

    handleback(){
        console.log("testfdsas");
        if(this.pageNr === 0)
            this.changelevel(CONSTANTS.SCENE.MENUPLAY.NAME)
        else{
            this.rightOut = true;
            console.log("Handle back");
        }
    }
    handlenext(){
        if(this.pageNr !== this.maxPages)
            this.leftOut = true;
    }

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
        //console.log(this.leftOut, this.leftMid, this.rightOut, this.rightMid)
        if(this.leftOut){
            if (this.next.x + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 > 0) {
                this.move(-CONSTANTS.SCENE.LEVELS.CHANGEPAGESPEED);
                if (this.next.x + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.CHANGEPAGESPEED < 0) {
                    this.leftOut = false
                    this.loadPage(1)
                }
            }
        }
        else if(this.rightMid){
            if (this.next.x  > CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2) {
                this.move(-CONSTANTS.SCENE.LEVELS.CHANGEPAGESPEED);
                if (this.next.x - CONSTANTS.SCENE.LEVELS.CHANGEPAGESPEED < CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2) {
                    this.rightMid = false;
                }
            }
        }
        else if(this.rightOut){
            if (this.back.x - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 < CONSTANTS.CANVAS.WIDTH) {
                this.move(CONSTANTS.SCENE.LEVELS.CHANGEPAGESPEED);
                if (this.back.x - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2  + CONSTANTS.SCENE.LEVELS.CHANGEPAGESPEED > CONSTANTS.CANVAS.WIDTH) {
                    this.rightOut = false;
                    this.loadPage(-1)
                }
            }
        }
        else if(this.leftMid){
            if (this.next.x  < CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2) {
                this.move(CONSTANTS.SCENE.LEVELS.CHANGEPAGESPEED);
                if (this.next.x  - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE + CONSTANTS.SCENE.LEVELS.CHANGEPAGESPEED > CONSTANTS.CANVAS.WIDTH / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2) {
                    this.leftMid = false;
                }
            }
        }
    }

    move(amount){
        this.button1.x += amount;
        this.button2.x += amount;
        this.button3.x += amount;
        this.button4.x += amount;
        this.next.x += amount;
        this.back.x += amount;
    }

    loadPage(amount){
        this.changePage = false;
        this.pageNr += amount;

        this.button1.key = this.pageNr * 4 + 1;
        this.button2.key = this.pageNr * 4 + 2;
        this.button3.key = this.pageNr * 4 + 3;
        this.button4.key = this.pageNr * 4 + 4;

        this.button1.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[this.button1.key])
        this.button2.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[this.button2.key])
        this.button3.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[this.button3.key])
        this.button4.setTexture(CONSTANTS.SCENE.LEVELS.BUTTONS.NAMES[this.button4.key])

        if(amount > 0){
            this.button1.x = CONSTANTS.CANVAS.WIDTH  - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.button3.x = CONSTANTS.CANVAS.WIDTH  + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.button2.x = CONSTANTS.CANVAS.WIDTH - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.button4.x = CONSTANTS.CANVAS.WIDTH  + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.next.x = CONSTANTS.CANVAS.WIDTH + CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.back.x = CONSTANTS.CANVAS.WIDTH - CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.rightMid = true;
        }

        else{
            this.button1.x =  -CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.button3.x = CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.button2.x =  -CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.button4.x = CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.next.x = CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 + CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.back.x = -CONSTANTS.SCENE.LEVELS.BUTTONS.BTNSIZE / 2 - CONSTANTS.SCENE.LEVELS.BUTTONS.PADDING /2;
            this.leftMid = true;
        }
    }
}