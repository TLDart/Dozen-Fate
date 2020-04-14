(function () {
    window.onload = main;
})();

function main() {
    var config = {
        type: Phaser.CANVAS,
        width: CONSTANTS.CANVAS.WIDTH,
        height: CONSTANTS.CANVAS.HEIGHT,
        scene: [IntroScene, MenuScene, PlayScene, HelpScene]
    };
    var game = new Phaser.Game(config);
}