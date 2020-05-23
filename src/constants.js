const CONSTANTS = {
    //Relative to the Canvas
    GENERAL:{
        COINS:0,
    },

    CANVAS: {
        WIDTH: 500,
        HEIGHT: 600
    },
    MUSIC:{
        REF: undefined,
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
            TEXTURE: "soundOnOff",
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
                VAR: "",
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
            TEXT:{
                NAME : "txtHighScore",
                FONTSIZE: 20
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
            TEXTIMG: "txtImg",
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
            SPRITESIZE: 64,
            ROWS: 2,
            COLS: 3,
            TEXT: {
                NAMEBLACK: "blackfont",
                NAMEWHITE: "whitefont",
                NAMEPINK: "pinkfont",
                NAME: "btmenu",
                MESSAGE: "back to menu",
                FONTSIZE: 7
            },

            BUTTONS: {
                NAME:"levelNormal",
                NAMESELECTED:"levelSelect",
                NAMEDISABLED:"levelDisable",
                BTNSIZE: 64,
                TOPSPACE: 150,
                TEXTSIZE: 20,
                PADDING: 10, // Padding in the middle
                SPACING: 74, // Padding in the bottom
                NEXT: {
                    NAME: "nextLevel",
                    NAMESELECTED: "nextSelectedLevel",
                    NAMEMAXPAGES: "maxPagesLevel"
                },
                BACK: {
                    NAME: "backLevel",
                    NAMESELECTED: "backSelectedLevel"
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
            COINSIZE: 15,
            TEXT:{
                MESSAGE: "BACK TO MENU",
                NAME: "btmstore",
                NAMEBLACK: "btmstoreblack",
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
        SETTINGS:{
            NAME : "SettingsScene",
            SLIDERWIDTH : 200,
            BUTTON: {
                SPACING: 90,
                BACK: {
                    NAME: "Settings_backbtn",
                    NAMESELECTED: "Settings_backbtnSelected",
                    PADDING: 10,
                    BTNSIZE: 64
                },
            },
            TEXT:{
                MESSAGE: "volume"
            }
        },
        CUT : {
            NAME: "CutScene",
            FONT: "joystix",
            FONTSIZE: 16,
            TEXT: "  It's the year 2331, the Emperor of" +
                "\n   Andromeda has been assassinated" +
                "\n during a public speech by a suicide" +
                "\n bomber that belonged to a terrorist" +
                "\n            organization." +
                "\n\n\n As panic spreads and riots break out " +
                "\n    all around the galaxy, Sirius," +
                "\n the most powerful galactic alliance " +
                "\n  to date, are taking this chance to" +
                "\n  invade and conquer Andromeda once" +
                "\n             and for all." +
                "\n\n\n However, it won't be as easy as they " +
                "\n  think, as desperate times call for " +
                "\n   heroes, 12 of Andromeda's most " +
                "\n capable pilots are ready to protect " +
                "\n            what's theirs... " +
                "\n\n\n       They go by the name of..." +
                "\n\n\n           The Dozen Fate",
        },
        INGAME: {
            NAME: "GameScene",
            GAMEOVER: {
                MESSAGE: "GAME OVER",
                UNDER: {
                    MESSAGE: "Press Space to continue",
                    Y: 0.52,
                },
                FONTSIZE: 50,
                FONT: "joystix",
                DEPTH: 200,
                Y: 0.45,
                TIMER: 700,
            },
            MENU: {
                NAME: "levelWin",

            },
            HERO: {
                NAME: ["trash","hero1","hero2","hero3","hero4","hero5","hero6","hero7","hero8","hero9","hero10","hero11","hero12"],
                SPEED: 325,                 // Speed of the Hero ship
                LIFEPOINTS: 10,              // Lifepoints of the Hero ship
                SHIPANGLE: Math.PI / 9,     // == (20 degrees) : radians of the angle that the ship makes when moving sideways
                SHIPDEGREES: 20,
                VULNERABILITY: 0
            },
            ENEMY: {
                NAMES: [["redEnemy", "red66", "red33"], ["blueEnemy", "blue66", "blue33"], ["greenEnemy", "green66", "green33"]],
                SCALE: 0.8,
                ACTIONTIME: 200,        // timer for action time of the enemy ships (move and shoot)
                SPAWNSPEED: 1500,       // Every {SPAWNSPEED} seconds, an enemy ship is spawned
                MOVEPERCENTAGE: 0.2,    // Every {ACTIONTIME} seconds, {MOVEPERCENTAGE} of the enemy ships move
                FIREPERCENTAGE: 0.04,    // Every {ACTIONTIME} seconds, {FIREPERCENTAGE} of the enemy ships shoot
                SPEED: {
                    X: 150,
                    Y: 40,
                },
                LIFEPOINTS: 5,          // Life points of each individual ship
                DAMAGEBOTTOM: 1,        // Damage that the ship deals when it transposes canvas.height
                DAMAGEHEROCOLLISION: 1   // Damage that the ship deals when it collides with the player

            },
            WEAPON: {
                NAMES: {
                    NORMAL: ["redWeapon", "blueWeapon", "greenWeapon"],
                    SELECTED: ["redWeaponSelected", "blueWeaponSelected", "greenWeaponSelected"],
                },
                DEPTH: 100,
                SCALE: 0.8,
                Y: 0.97,
                X: [0.74, 0.84, 0.94]
            },
            BULLET: {
                AMMO: "ammo",
                START: 50,
                NAMES: ["regularBullet", "redBullet", "blueBullet", "greenBullet"],
                SPEED: 500,             // Bullet Speed
                DAMAGE: 2,              // Bullet Regular Damage
                CRITICAL: 15,           // Bullet Critical Damage (same color)
                SCALE: 0.5,
                FONT: "joystix_black",
                RENEG: 10000,
                AMOUNT: 10
            },
            HEALTHBAR: {
                NAME: "healthBar",
                ANIMATION: "hurt",
                WIDTH: 192,
                HEIGHT: 64,
                SCALE: 0.75,
                DEPTH: 90,
                STARTCOLOR: 0x00ff00,
                XPERCENTAGE: 0.01,      // 0.01
                YPERCENTAGE: 0.93,      // 0.93
                PADDING: {
                    X: 40,
                    Y: 16,
                },
                RECTANGLE: {
                    WIDTH: 148,
                    HEIGHT: 26
                }
            },
            COGWHEEL: {
                NAME: "cogWheel",
                SCALE: 0.6,
            },
            SOUNDS :{
                AK : "ak47Sound",
                BZ : "bazookaSound",
                PISTOL : "pistolSound",
                WIN : "winSound",
                AMMOOUT : "outOfAmmoSound",
                SHIPDYING : "explosionSound",
                DAMAGE : "damageSound",
            },
        },
        QUIT: {
            NAME: "QuitScene",
            TEXT: {
                FONTSIZE: 16,
                FONT: "joystix",
                pY: 0.35,
            },
            SHEET: {
                YES: {
                    NAME: "yesSheet",
                    pX: 0.25,
                    pY: 0.65,
                },
                NO: {
                    NAME: "noSheet",
                    pX: 0.75,
                    pY: 0.65,
                },
                SOUND: {
                    pX: 0.90,
                    pY: 0.12,
                    SCALE: 0.8
                }
            }
        },
    },
};