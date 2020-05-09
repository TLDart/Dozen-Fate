const CONSTANTS = {
    //Relative to the Canvas
    GENERAL:{
        COINS:0,
    },

    CANVAS: {
        WIDTH: 500,
        HEIGHT: 600
    },
    //Relative to the Scenes
    SCENE: {
        SPEED: {
            TILE: 0.2,
            TEXT: 1000,
            TRANSITION: 3000,
            MENUTRANSITION: 0,
        },
        BACKGROUND: {
            NAME: "background"
        },
        LOGO: {
            NAME: "logo",
            SCALE: 0.5
        },
        BTNSOUND: {
            NAME: "buttonSound",
            CONFIG: {
                mute: false,
                volume: 0.1,
                detune: 0,
                seek: 0,
                loop: false,
                delay: 0
            },
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
                SOUND: "textSound"
            },
            LOGO: {
                Y: 200
            },
            BACKGROUND_MUSIC: {
                NAME: "backGroundMusic",
                CONFIG: {
                    mute: false,
                    volume: 0.3,
                    detune: 0,
                    seek: 0,
                    loop: true,
                    delay: 0
                },
            },

        },
        // Relative to the MenuScene
        MENU: {
            NAME: "MenuScene",
            LOGO: {
                Y: 100,
            },
            BUTTON: {
                SPACING: 90,
                PLAY: {
                    NAME: "playButton",
                },
                PLAYSELECTED: {
                    NAME: "playButtonSelected",
                },
                HELP: {
                    NAME: "helpButton",
                },
                HELPSELECTED: {
                    NAME: "helpButtonSelected",
                },
                STORE: {
                    NAME: "storeButton",
                },
                STORESELECTED: {
                    NAME: "storeButtonSelected",
                },
                SETTINGS: {
                    NAME: "settingsButton",
                },
                SETTINGSSELECTED: {
                    NAME: "settingsButtonSelected",
                },
            },
            BACKGROUND_MUSIC: {
                NAME: "backGroundMusic2",
                CONFIG: {
                    mute: false,
                    volume: 0.5,
                    detune: 0,
                    seek: 0,
                    loop: true,
                    delay: 0
                },
            },
        },
        MENUPLAY: {
            NAME: "PlayScene",
            SPACING: 90,
            LOGO: {
                Y: 100,
            },
            BUTTON: {
                SPACING: 90,
                HISTORY: {
                    NAME: "HistoryButton",
                    NAMESELECTED: "HistoryButtonSelected",
                },
                ARCADE: {
                    NAME: "ArcadeButton",
                    NAMESELECTED: "ArcadeButtonSelected",
                },
                BACK: {
                    NAME: "backbtn",
                    NAMESELECTED: "backbtnSelected",
                    PADDING: 10,
                    BTNSIZE: 64
                },
            },
        },
        HELP: {
            NAME: "HelpScene",
            SPACING: 90,
            LOGO: {
                Y: 100,
                SCALE: 0.25,
            },
            BUTTON: {
                SPACING: 90,
                BACK: {
                    NAME: "backbtn",
                    NAMESELECTED: "backbtnSelected",
                    PADDING: 10,
                    BTNSIZE: 64
                },
            },
        },
        LEVELS: {
            NAME: "LevelScene",
            MAXPAGES: 1,
            CHANGEPAGESPEED: 10,
            LOGO: {
                Y: 100,
                SCALING: 0.5
            },
            TEXT: {
                NAME: "btm",
                MESSAGE: "back to menu",
                FONTSIZE: 10
            },
            BUTTONS: {
                NAMES: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"],
                NAMESSELECTED: ["1s", "2s", "3s", "4s", "5s", "6s", "7s", "8s", "9s", "10s", "11s", "12s", "13s"],
                BTNSIZE: 64,
                TOPSPACE: 150,
                PADDING: 10, // Padding in the middle
                SPACING: 74, // Padding in the bottom
                NEXT: {
                    NAME: "next",
                    NAMESELECTED: "nextSelected",
                    NAMEMAXPAGES: "maxPages"
                },
                BACK: {
                    NAME: "back",
                    NAMESELECTED: "backSelected"
                }
            }
        },
        STORE:{
            NAME: "StoreScene",
            MAXPAGES: 1,
            SPRITESIZE: 64, // size of the sprite images
            ROWS: 2,
            COLS: 3,
            ITEMS: 2* 3,
            TEXT:{
                MESSAGE: "BACK TO MENU",
                NAME: "btmstore",
                FONTSIZE: 8,
            },
            CODES:{
                BUY : 0,
                BOUGHT : 1,
                USING: 2
            },
            SPRITES:{
                SPRITENUMBER: 12,
                COST: [1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000],
                NAMES:  ["ship1","ship2","ship3","ship4","ship5","ship6","ship7","ship8","ship9","ship10","ship11","ship12"]
            },
            BUTTONS: {
                NAMES: ["1shop", "2shop", "3shop"],
                NAMESSELECTED: ["1ss", "2ss", "3ss"],
                BTNWIDTH: 128,
                BTNHEIGHT: 32,
                TOPSPACE: 150,
                PADDING: 25, // Padding in the middle
                SPACING: 74, // Padding in the bottom
                NEXT: {
                    NAME: "next",
                    NAMESELECTED: "nextSelected",
                    NAMEMAXPAGES: "maxPages"
                },
                BACK: {
                    NAME: "back",
                    NAMESELECTED: "backSelected"
                },
                COIN:{
                    NAME: "coin",
                    SCALE: 0.5
                }
            }
        },
        INGAME: {
            NAME:"GameScene",
            HERO : {
                STOP:"hero",
                LEFT:"heroLeft",
                RIGHT:"heroRight",
                SPEED: 325,
                LIFEPOINTS:3
            },
            ENEMY : {
                NAMES:["redEnemy","blueEnemy","greenEnemy"],
                SCALE: 0.8,
                SPAWNSPEED: 2000,
                SPEED: 10,
                LIFEPOINTS:5
            },
            BULLET:{
                NAME:"bullet",
                SPEED:500,
                DAMAGE:1,
                CRITICAL:15,
                SCALE:0.02
            }
        }
    },
};