import { CUSTOM_EVENTS } from "../components/events/event-bus-component";

export class AudioManager{
    #scene;
    #eventComponent;

    constructor(scene, eventBusComponent){
        this.#scene = scene
        this.#eventComponent = eventBusComponent

        this.#scene.sound.play('bg',{
            volume:0.6,
            loop:true
        })

        this.#eventComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED,()=>{
            this.#scene.sound.play('explosion',{
                volume: 0.6,
            })
        });

        this.#eventComponent.on(CUSTOM_EVENTS.PLAYER_DESTROYED,()=>{
            this.#scene.sound.play('explosion',{
                volume: 0.6,
            })
        });

        this.#eventComponent.on(CUSTOM_EVENTS.SHIP_HIT,()=>{
            this.#scene.sound.play('hit',{
                volume: 0.6,
            })
        });

        this.#eventComponent.on(CUSTOM_EVENTS.SHIP_SHOOT,()=>{
            this.#scene.sound.play('shot1',{
                volume: 0.6,
            })
        });
    }
}