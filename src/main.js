(function () {
    window.onload = main;
})();

function main() {
    var config = {
        type: Phaser.CANVAS,
        width: CONSTANTS.CANVAS.WIDTH,
        height: CONSTANTS.CANVAS.HEIGHT,
        scene: [IntroScene, MenuScene, PlayScene, HelpScene, LevelsScene, StoreScene, SettingsScene, CutScene, GameScene, QuitScene],
        //scene: [CutScene],
        physics: {
            default: "arcade",
            arcade: {
                debug: false,
            }
        },
        pixelArt: false
    };
    var game = new Phaser.Game(config);
}