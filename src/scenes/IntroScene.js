class IntroScene extends Phaser.Scene {
    constructor(){
        super("IntroScene");
        this.background = null;
        this.banner = null;
    }
    preload(){
        this.load.image("logo","assets/Logo/Logo.png");
        this.load.image("background","assets/Sprites/Others/background.png")
    }
    create(){
        this.background = this.add.tileSprite(0,0,500,600,"background").setOrigin(0,0);
        this.banner = this.add.sprite(0,0,"logo");
        this.banner.scaleX = 0.5;
        this.banner.scaleY = 0.5;
        this.banner.setPosition(250,200);
    }
    update(){
        this.background.tilePositionY += 0.2;
    }
}
