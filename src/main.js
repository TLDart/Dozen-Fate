(function () {
    window.onload = main;
})();

function main() {
    var config = {
        type: Phaser.CANVAS,
        width: CONSTANTS.CANVAS.WIDTH,
        height: CONSTANTS.CANVAS.HEIGHT,
        scene: [IntroScene, MenuScene]
    };
    var game = new Phaser.Game(config);
}
