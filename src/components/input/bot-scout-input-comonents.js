import { InputComponent } from "./input-component";
import * as CONFIG from '../../utils/config'


export class BotScoutInputComponent extends InputComponent {
    #gameObject;
    #startX;
    #maxMovement;


    constructor(gameObject){
        super();
        this.#gameObject = gameObject
        this.#startX = this.#gameObject.x;
        this.#maxMovement = CONFIG.ENEMY_SCOUT_MOVEMENT_MAX_X
        this._down=true
        this._left=false
        this._right=true
    }

    update(){
        if(this.#gameObject.x > this.#startX + this.#maxMovement){
            this._left = true;
            this._right = false;
        }else if(this.#gameObject.x < this.#startX - this.#maxMovement){
            this._left =false
            this._right = true
        }
    }

}