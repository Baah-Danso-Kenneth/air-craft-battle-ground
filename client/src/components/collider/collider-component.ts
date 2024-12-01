import { CUSTOM_EVENTS } from "../../../../shared/config";


export class ColliderComponent{
    #healthComponent
    #eventComponent

    constructor(lifeComponent:any, eventComponent:any){
        this.#healthComponent=lifeComponent
        this.#eventComponent=eventComponent
    }

    collideWithEnemyShip(){
        if(this.#healthComponent.isDead){
            return;
        }
        this.#healthComponent.die();
    }

    

    collideWithEnemyProjectile(){
        if(this.#healthComponent.isDead){
            return
        }
        this.#healthComponent.hit()
        this.#eventComponent.emit(CUSTOM_EVENTS.SHIP_HIT)
    }
}