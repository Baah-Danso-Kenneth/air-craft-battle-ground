import { GAME_SCENE_KEYS } from "../utils/scene-keys";

export class PreloadScene extends Phaser.Scene{
    constructor(){
        super({key: GAME_SCENE_KEYS.PRELOAD_SCENE})
    }

}