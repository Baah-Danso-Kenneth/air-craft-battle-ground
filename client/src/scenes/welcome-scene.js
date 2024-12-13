import { OPTION_TEXT_STYLE, WELCOME_TEXT_STYLE } from "../objects/content/text-font-style";
import { NineSlice } from "../objects/ui/nine-slice";

const PLAYER_INPUT_CURSOR_POSITION = Object.freeze({
    x:40,
    y:41
});


const MAIN_MENU_OPTIONS = Object.freeze({
    NEW_GAME:'NEW_GAME',
    CONTINUE:'CONTINUE',
    OPTIONS: 'OPTIONS'
})

export class WelcomeScene extends Phaser.Scene {
    #background
    #welcomeMenu
    #cursorKeys
    #controls
    #mainMenuCursorPhaserImageGameObject
    #selectedMenuOptions
    #isContinueButtonEnabled
    /**@type {NineSlice} */
    #nineSliceMenu
    constructor() {
        super({ key: 'WelcomeScene' });
    }

    init(){
        this.#nineSliceMenu = new NineSlice({
            cornerCutSize:32,
            textureManager: this.sys.textures,
            assetKey: 'glassPanel'
        })
    }
    create() {
       

        // this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME;
        // this.#isContinueButtonEnabled = false;
        this.#background = this.add.tileSprite(0,0, 1024, 576, 'star_bg_s3').setOrigin(0,0)
        // this.add.image(0,0,'star_bg_s3').setAlpha(1);
        const renderedText = "Spacecraft war".toUpperCase();
        const bannerText = this.add.text(0, 10, renderedText, WELCOME_TEXT_STYLE);
        bannerText.setOrigin(0.5, 0);
        bannerText.setX(this.game.config.width / 2);
    


        const globeImage = this.add.image(this.game.config.width / 2, 180,'global');
        globeImage.setOrigin(0.5, 0.5);
        globeImage.setScale(1);

        this.tweens.add({
        targets: globeImage,
          angle: -360,  
         duration: 5000,  
        repeat: -1,  
        ease: 'Linear',
            });

    
        const menuBgWidth = 300;
    
        
        const menuBgContainer = this.#nineSliceMenu.createNineSliceContainer(this, menuBgWidth, 200);
    
        const newGameText = this.add.text(menuBgWidth / 2, 40, 'New Game', OPTION_TEXT_STYLE).setOrigin(0.5);
        const continueGameText = this.add.text(menuBgWidth / 2, 90, 'Continue', OPTION_TEXT_STYLE).setOrigin(0.5);
        if (!this.#isContinueButtonEnabled) {
            continueGameText.setAlpha(0.5);
        }
        const optionGameText = this.add.text(menuBgWidth / 2, 140, 'Options', OPTION_TEXT_STYLE).setOrigin(0.5);
    
        const menuContainer = this.add.container(0, 0, [menuBgContainer, newGameText, continueGameText, optionGameText]);
        menuContainer.setPosition(this.scale.width / 2 - menuBgWidth / 2, 300);
    
        this.#mainMenuCursorPhaserImageGameObject = this.add.image(PLAYER_INPUT_CURSOR_POSITION.x, PLAYER_INPUT_CURSOR_POSITION.y, 'cursor_white')
            .setOrigin(0.5)
            .setScale(2.5);
        menuContainer.add(this.#mainMenuCursorPhaserImageGameObject);
    
        this.tweens.add({
            delay: 0,
            duration: 500,
            repeat: -1,
            x: {
                from: PLAYER_INPUT_CURSOR_POSITION.x,
                start: PLAYER_INPUT_CURSOR_POSITION.x,
                to: PLAYER_INPUT_CURSOR_POSITION.x + 3,
            },
            targets: this.#mainMenuCursorPhaserImageGameObject,
        });
    
        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.NEW_GAME) {
                this.scene.start(SCENE_KEYS.FIRST_STAGE_SCENE);
                return;
            }
    
            if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.OPTIONS) {
                this.scene.start(SCENE_KEYS.OPTION_SCENE);
                return;
            }
        });
    
        // this.#controls = new Controls(this);
    }
    


    // update(){
    //     if(this.#controls.isInputLocked){
    //         return;
    //     }

    //     const wasSpaceKeyPressed = this.#controls.wasSpaceKeyPressed();

    //     if(wasSpaceKeyPressed){
    //         this.cameras.main.fadeOut(500, 0,0,0);
    //         this.#controls.lockInput=true;
    //         return;
    //     }

    //     const selectedDirection = this.#controls.getDirectionKeyJustPressed();
    //     if(selectedDirection !== DIRECTION.NONE){
    //         this.#moveMenuSelectCursor(selectedDirection)
    //     }
    // }


    // #moveMenuSelectCursor(direction){
    //     this.#updateSelectedMenuOptionInput(direction)
    //     switch(this.#selectedMenuOptions){
    //         case MAIN_MENU_OPTIONS.NEW_GAME:
    //             this.#mainMenuCursorPhaserImageGameObject.setY(PLAYER_INPUT_CURSOR_POSITION.y)
    //             break;
    //         case MAIN_MENU_OPTIONS.CONTINUE:
    //             this.#mainMenuCursorPhaserImageGameObject.setY(91)
    //             break;
    //         case MAIN_MENU_OPTIONS.OPTIONS:
    //             this.#mainMenuCursorPhaserImageGameObject.setY(141)
    //             break;
    //             default:
    //                 this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME
    //                 break;
    //     }
    // }

    // #updateSelectedMenuOptionInput(direction) {
    //     switch(direction) {
    //         case DIRECTION.UP:
    //             if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.NEW_GAME) {
    //                 return;
    //             }
    //             if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.CONTINUE) {
    //                 this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME;
    //                 return;
    //             }
    //             if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.OPTIONS && !this.#isContinueButtonEnabled) {
    //                 this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME;
    //                 return;
    //             }
    //             this.#selectedMenuOptions = MAIN_MENU_OPTIONS.CONTINUE;
    //             return;
    //         case DIRECTION.DOWN:
    //             if(this.#selectedMenuOptions === MAIN_MENU_OPTIONS.OPTIONS){
    //                 return;
    //             }
    //             if(this.#selectedMenuOptions === MAIN_MENU_OPTIONS.CONTINUE){
    //                 this.#selectedMenuOptions = MAIN_MENU_OPTIONS.OPTIONS
    //                 return;
    //             }
    //             if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.NEW_GAME && !this.#isContinueButtonEnabled) {
    //                 this.#selectedMenuOptions = MAIN_MENU_OPTIONS.OPTIONS;
    //                 return;
    //             }
    //             this.#selectedMenuOptions = MAIN_MENU_OPTIONS.CONTINUE
    //             return;

    //         case DIRECTION.LEFT:
    //         case DIRECTION.RIGHT:
    //         case DIRECTION.NONE:
    //             return;
    //         default:
    //             this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME
    //             break;
    //     }
    // }
    

}
