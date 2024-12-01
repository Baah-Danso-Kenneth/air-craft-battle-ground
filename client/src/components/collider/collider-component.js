import { CUSTOM_EVENTS } from "../events/event-bus-component";

export class ColliderComponent{
    #healthComponent
    #eventComponent

    constructor(lifeComponent, eventComponent){
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