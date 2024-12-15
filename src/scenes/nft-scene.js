import { OPTION_TEXT_STYLE, START_GAME_STYLE } from "../lib/text-style";
import { NineSlice } from "../components/objects/nine-slice";
import { MAIN_MENU_OPTIONS } from "../utils/config";
import { Controls } from "../utils/controls";


export class NftScene extends Phaser.Scene{
    #background
    #nineSliceMenu
    #startGame
    #controls

    constructor(){
        super({key:'NftScene'})
    }
    


    init(){
        this.#nineSliceMenu = new NineSlice({
            cornerCutSize:32,
            textureManager: this.sys.textures,
            assetKey: 'glassPanel'
        });

        this.#startGame = MAIN_MENU_OPTIONS.START_GAME
    }

    create() {
        this.#background = this.add.tileSprite(0,0, 1024, 576, 'purple_bg').setOrigin(0,0)
        this.add.text(350, 30, 'nft ship collection', OPTION_TEXT_STYLE)

        const menuBgWidth = 200;
        const menuBgContainer = this.#nineSliceMenu.createNineSliceContainer(this, menuBgWidth, 70);

        const startGameText = this.add.text(menuBgWidth / 2, 40, 'start game', 
            START_GAME_STYLE
        ).setOrigin(0.5);
        const menuContainer = this.add.container(0,0, [menuBgContainer, startGameText]);
        menuContainer.setPosition(this.scale.width /2 - menuBgWidth / 2, 475);


        const rows = 3; 
        const cols = 3; 
        const cellWidth = 100;
        const cellHeight = 100; 
        const cellPadding = 20; 

        const gridWidth = cols * (cellWidth + cellPadding) - cellPadding;
        const gridHeight = rows * (cellHeight + cellPadding) - cellPadding;

        const startX = (this.cameras.main.width - gridWidth) / 2;
        const startY = (this.cameras.main.height - gridHeight) / 2;

        const shipKeys = ['player_ship', 'player_ship1', 'player_ship2', 'player_ship3', 'player_ship4', 'player_ship5', 'player_ship6','',''];

        // Loop to create a 3x3 grid (but stop at 7 ships)
        let index = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (index >= shipKeys.length) {
                    break;
                }

                const x = startX + col * (cellWidth + cellPadding) + cellWidth / 2;
                const y = startY + row * (cellHeight + cellPadding) + cellHeight / 2;

                const cellBackground = this.add.rectangle(x, y, cellWidth, cellHeight, 0x0000ff); 
                cellBackground.setStrokeStyle(2, 0xffffff); 
                this.add.sprite(x, y, shipKeys[index]).setScale(0.2);

                index++; // Move to the next ship
            }
        }

        this.#controls = new Controls(this)

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            if (this.#startGame === MAIN_MENU_OPTIONS.START_GAME) {
                this.scene.start('GameScene');
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

    }



}