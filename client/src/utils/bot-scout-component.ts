
import * as CONFIG from '../../../shared/config.js'
import { InputComponent } from '../components/input/input-component.js';


export class BotScoutInputComponent extends InputComponent {

    #gameObject;
    #startX
    #maxXMovement;
    constructor(gameObject: any){
        super();
        this.#gameObject = gameObject
        this.#startX = this.#gameObject.x
        this.#maxXMovement = CONFIG.ENEMY_MOVEMENT_MAX_X
        this._down=true
        this._left=false
        this._right=true
    }


    set startX(val:any){
        this.#startX = val;
    }

    update(){
        if(this.#gameObject.x > this.#startX + this.#maxXMovement){
            this._left = true;
            this._right =false
        }else if(this.#gameObject.x < this.#startX - this.#maxXMovement){
            this._left = false;
            this._right = true;
        }
    }

}