const CONSTANTS = {
    //Relative to the Canvas
    CANVAS: {
        WIDTH: 500,
        HEIGHT: 600
    },
    //Relative to the Scenes
    SCENE: {
        SPEED: {
            TILE: 0.2,
            TEXT: 1000,
            TRANSITION: 2000
        },
        BACKGROUND: {
            NAME: "background"
        },
        LOGO: {
            NAME: "logo",
            SCALE: 0.5
        },
        // Relative to the IntroScene
        INTRO: {
            NAME: "IntroScene",
            CONTINUE: "keydown-SPACE",
            TEXT: {
                NAME: "joystix",
                Y: 400,
                MESSAGE: "Press space to continue",
                FONTSIZE: 20,
            },
            LOGO: {
                Y: 200
            }
        },
        // Relative to the MenuScene
        MENU: {
            NAME: "MenuScene",
            LOGO: {
                Y: 100,
            },
            BUTTON: {
                SPACING : 90,
                PLAY: {
                    NAME: "playButton",
                },
                HELP: {
                    NAME: "helpButton",
                },
                STORE: {
                    NAME: "storeButton",
                },
                SETTINGS: {
                    NAME: "settingsButton",
                },
            },
        },
    },
};