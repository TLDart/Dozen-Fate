class IntroScene extends Phaser.Scene {
    constructor(){
        super("IntroScene");
        this.background = null;
        this.banner = null
        this.text = null;
    }
    preload(){
        console.log("preload intro")
        // Load from Assets
        this.load.image("background","assets/Sprites/Others/background.png");
        this.load.image("logo","assets/Logo/Logo.png");
        this.load.bitmapFont("joystix","assets/Fonts/joystix/joystix_white.png","assets/Fonts/joystix/joystix_white.fnt");
    }

    create(){
        console.log("introscene");
        // Add to this scene
        this.background = this.add.tileSprite(0,0,1080,1920,"background").setOrigin(0,0);
        this.banner = this.add.sprite(0,0,"logo");
        this.text = this.add.bitmapText(0,0,"joystix","PRESS HERE TO CONTINUE",20).setOrigin();
        // Resize and placements
        var resizeLogoFactor = 0.5;
        this.banner.scaleX = resizeLogoFactor;
        this.banner.scaleY = resizeLogoFactor;
        this.banner.setPosition(250,200);
        this.text.setPosition(250,400);
        // Listeners
        this.text.setInteractive();
        this.text.on("pointerdown", () => {
            if (this.scene.isSleeping("MenuScene")){
                this.scene.wake("MenuScene");
                console.log("resume menu")
            } else {
                this.scene.launch("MenuScene");
                console.log("launch");
            }
            this.scene.sleep();
        });
    }
    update(){
        this.background.tilePositionY += 0.2;
    }

}
