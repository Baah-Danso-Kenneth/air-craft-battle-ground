import * as CONFIG from '../utils/config';

export class AudioManager{
    #scene;
    #eventComponent;

    constructor(scene, eventBusComponent){
        this.#scene = scene
        this.#eventComponent = eventBusComponent

        this.#scene.sound.play('bg',{
            volume:0.3,
            loop:true
        })

        this.#eventComponent.on(CONFIG.CUSTOM_EVENTS.ENEMY_DESTROYED,()=>{
            this.#scene.sound.play('explosion',{
                volume: 0.3,
            })
        });

        this.#eventComponent.on(CONFIG.CUSTOM_EVENTS.PLAYER_DESTROYED,()=>{
            this.#scene.sound.play('explosion',{
                volume: 0.3,
            })
        });

        this.#eventComponent.on(CONFIG.CUSTOM_EVENTS.SHIP_HIT,()=>{
            this.#scene.sound.play('hit',{
                volume: 0.3,
            })
        });

        this.#eventComponent.on(CONFIG.CUSTOM_EVENTS.SHIP_SHOOT,()=>{
            this.#scene.sound.play('shot1',{
                volume: 0.3,
            })
        });
    }
}