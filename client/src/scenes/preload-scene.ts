import { GAME_SCENE_KEYS } from "../utils/scene-keys";

export class PreloadScene extends Phaser.Scene{
    constructor(){
        super({key: GAME_SCENE_KEYS.PRELOAD_SCENE})
    }

    preload(){
        this.load.pack('asset_pack', 'assets/data/assets.json');
    }

    create(){

        this.#createAnimation();
        this.scene.start(GAME_SCENE_KEYS.GAME_SCENE)
    }

    #createAnimation(){
        const data = this.cache.json.get('animations_json')
        data.forEach((animations:any)=>{
            const frames = animations.frames ? this.anims.generateFrameNames(animations.assetKey, {frames: animations.frames})
            : this.anims.generateFrameNames(animations.assetKey); 
               this.anims.create({
                key: animations.key,
                frames:frames,
                frameRate: animations.frameRate,
                repeat: animations.repeat,
            })
        })
       
    }

}