import { OPTION_TEXT_STYLE, WELCOME_TEXT_STYLE } from "../lib/text-style"
import { NineSlice } from "../components/objects/nine-slice"
import { MAIN_MENU_OPTIONS, PLAYER_INPUT_CURSOR_POSITION } from "../utils/config"
import { Controls } from "../utils/controls"
import { DIRECTION } from "../utils/direction"

export class WelcomeScene extends Phaser.Scene{
    #background
    #controls
    #mainMenuCursorPhaserImageGameObject
    #nineSliceMenu
    #selectedMenuOptions
    constructor(){
        super({key:'WelcomeScene'})
    }
    

    init(){
        this.#nineSliceMenu = new NineSlice({
            cornerCutSize:32,
            textureManager: this.sys.textures,
            assetKey: 'glassPanel'
        });

        this.#selectedMenuOptions = MAIN_MENU_OPTIONS.LOGIN
    }

    create(){
        this.#background = this.add.tileSprite(0,0, 1024, 576, 'star_bg_s3').setOrigin(0,0)
        const renderedText = "Spacecraft war".toUpperCase();
        const bannerText = this.add.text(0, 50, renderedText, WELCOME_TEXT_STYLE);
        bannerText.setOrigin(0.5, 0);
        bannerText.setX(this.game.config.width / 2);

        const globeImage = this.add.image(this.game.config.width / 2, 250,'global');
        globeImage.setOrigin(0.5, 0.5);
        globeImage.setScale(2);

        this.tweens.add({
        targets: globeImage,
          angle: -360,  
         duration: 5000,  
        repeat: -1,  
        ease: 'Linear',
            });

        
            const menuBgWidth = 300;
    
        
            const menuBgContainer = this.#nineSliceMenu.createNineSliceContainer(this, menuBgWidth, 100);
        
            const newGameText = this.add.text(menuBgWidth / 2, 40, 'Log In', OPTION_TEXT_STYLE).setOrigin(0.5);
    
        
            const menuContainer = this.add.container(0, 0, [menuBgContainer, newGameText]);
            menuContainer.setPosition(this.scale.width / 2 - menuBgWidth / 2, 410);
        
            this.#mainMenuCursorPhaserImageGameObject = this.add.image(PLAYER_INPUT_CURSOR_POSITION .x, PLAYER_INPUT_CURSOR_POSITION.y, 'cursor_white')
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

            this.#controls = new Controls(this)
    
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
                if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.LOGIN) {
                    this.scene.start('NftScene');
                    return;
                }
            });
    }

    update(){
        if(this.#controls.isInputLocked){
            return;
        }

        const wasSpaceKeyPressed = this.#controls.wasSpaceKeyPressed();

        if(wasSpaceKeyPressed){
            this.cameras.main.fadeOut(500, 0,0,0);
            this.#controls.lockInput=true;
            return;
        }

        const selectedDirection = this.#controls.getDirectionKeyJustPressed();
        if(selectedDirection !== DIRECTION.NONE){
            this.#moveMenuSelectCursor(selectedDirection)
        }
    }

    #moveMenuSelectCursor(direction){
        this.#updateSelectedMenuOptionInput(direction)
        switch(this.#selectedMenuOptions){
            case MAIN_MENU_OPTIONS.NEW_GAME:
                this.#mainMenuCursorPhaserImageGameObject.setY(PLAYER_INPUT_CURSOR_POSITION.y)
                break;
            case MAIN_MENU_OPTIONS.CONTINUE:
                this.#mainMenuCursorPhaserImageGameObject.setY(91)
                break;
            case MAIN_MENU_OPTIONS.OPTIONS:
                this.#mainMenuCursorPhaserImageGameObject.setY(141)
                break;
                default:
                    this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME
                    break;
        }
    }

    #updateSelectedMenuOptionInput(direction) {
        switch(direction) {
            case DIRECTION.UP:
                if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.NEWGAME) {
                    return;
                }
                if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.CONTINUE) {
                    this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME;
                    return;
                }
                this.#selectedMenuOptions = MAIN_MENU_OPTIONS.CONTINUE;
                return;
            case DIRECTION.DOWN:
                if(this.#selectedMenuOptions === MAIN_MENU_OPTIONS.OPTIONS){
                    return;
                }
                if(this.#selectedMenuOptions === MAIN_MENU_OPTIONS.CONTINUE){
                    this.#selectedMenuOptions = MAIN_MENU_OPTIONS.OPTIONS
                    return;
                }
                this.#selectedMenuOptions = MAIN_MENU_OPTIONS.CONTINUE
                return;

            case DIRECTION.LEFT:
            case DIRECTION.RIGHT:
            case DIRECTION.NONE:
                return;
            default:
                this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME
                break;
        }
    }

}