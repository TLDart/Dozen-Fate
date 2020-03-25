
(function () {
    window.onload = main
})();

function main() {
    var game = new Phaser.Game({
        type: Phaser.CANVAS,
        width: 500,
        height: 600,
        scene: [IntroScene,MenuScene ]
    });
}
