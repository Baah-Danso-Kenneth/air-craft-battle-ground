export class ColliderComponent{
    #healthComponent
    #eventBusComponent

    constructor(healthComponent, eventBusComponent){
        this.#healthComponent = healthComponent
        this.#eventBusComponent = eventBusComponent
    }

    collideWithEnemyShip(){
        if(this.#healthComponent.isDead){
            return
        }
        this.#healthComponent.dead()
    }

    collideWithEnemyProjectile(){
        if(this.#healthComponent.isDead){
            return
        }
        this.#healthComponent.hit()
        // this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.SHIP_HIT)
    }
}