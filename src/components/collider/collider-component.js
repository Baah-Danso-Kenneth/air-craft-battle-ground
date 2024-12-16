export class ColliderComponent{
    #healthComponent


    constructor(healthComponent){
        this.#healthComponent = healthComponent
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
    }
}