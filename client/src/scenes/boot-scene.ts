import { GAME_SCENE_KEYS } from "../utils/scene-keys";

export class BootScene extends Phaser.Scene{
    constructor(){
        super({key:GAME_SCENE_KEYS.BOOT_SCENE})
    }

    preload(){
        this.load.json('animations_json', 'assets/data/animations.json')
    }

    create(){
        this.scene.start(GAME_SCENE_KEYS.PRELOAD_SCENE)
        console.log(`${BootScene.name}`)
    }

}