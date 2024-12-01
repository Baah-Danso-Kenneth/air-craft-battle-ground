export class PreloadScene extends Phaser.Scene{
    constructor(){
        super({key: 'PreloadScene'})
    }


    preload(){
        this.load.pack('assets_pack', 'assets/data/assets.json')
    }

    create(){
        this.#createAnimation();
        this.scene.start('GameScene')
    }

    #createAnimation(){
        const data = this.cache.json.get('animations_json')
        data.forEach((animations)=>{
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