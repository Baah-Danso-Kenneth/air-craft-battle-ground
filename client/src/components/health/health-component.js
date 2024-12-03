export class HealthComponent{
    #startLife
    #currentLife
    #isDead

    constructor(life){
        this.#startLife = life
        this.#currentLife = life
        this.#isDead = false
    }


    get life(){
        return this.#currentLife
    }

    get isDead(){
        return this.#isDead
    }

    reset(){
        this.#currentLife = this.#startLife
        this.#isDead = false
    }

    hit(){
        if(this.#isDead){
            return;
        }
        this.#currentLife -=1;
        if(this.#currentLife <=0){
            this.#isDead = true
        }
    }

    dead(){
        this.#currentLife = 0
        this.#isDead = true
    }
}