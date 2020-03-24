class MenuScene extends Phaser.Scene {
    constructor(){
        super("MenuScene");
        this.background = null;
        this.banner = null;
    }

    preload(){
        this.load.image("banner","assets/Logo/logo.png");
        this.load.image("background","assets/Sprites/Others/Background.png")
    }
    create(){
        this.background = this.add.tileSprite(0,0,500,600,"background").setOrigin(0,0);
        this.banner = this.add.sprite(0,0,"banner");
        this.banner.scaleX = 0.5;
        this.banner.scaleY = 0.5;
        this.banner.setPosition(250,200);


    }
    update(){
        this.background.tilePositionY += 0.2;
    }
}

var game = new Phaser.Game({
    type: Phaser.CANVAS,
    width: 500,
    height: 600,
        scene: [ new MenuScene ]
});
