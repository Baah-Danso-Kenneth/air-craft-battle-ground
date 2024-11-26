import Player from "../objects/player";
import { GAME_SCENE_KEYS } from "../utils/scene-keys";

export class GameScene extends Phaser.Scene{
    #background: any
    constructor(){
        super({key:GAME_SCENE_KEYS.GAME_SCENE})
    }



    create(){
     this.#background = this.add.tileSprite(0,0, 1024, 576, 'purple-bg').setOrigin(0,0)
     new Player(this);

    }
    update(){
        this.#background.tilePositionX +=1;
    }

};


