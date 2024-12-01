import { CUSTOM_EVENTS } from "../../../../shared/config";


export class EnemyDestroyedComponent{
    #scene
    #group
    #eventBusComponent
    constructor(scene: Phaser.Scene, eventBusComponent:any){
        this.#scene = scene
        this.#eventBusComponent = eventBusComponent;

        this.#group = this.#scene.add.group({
            name: `${this.constructor.name}-${Phaser.Math.RND.uuid()}`,
        });

        this.#eventBusComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED, (enemy:any)=>{
            const gameObject = this.#group.get(enemy.x, enemy.y, enemy.shipAssetKey, 0)
            gameObject.play({
                key: enemy.shipDestroyedAnimationKey,

            })
        })
    }
}