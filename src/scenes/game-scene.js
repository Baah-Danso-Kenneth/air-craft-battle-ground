import { EventBusComponent } from "../components/events/event-component";
import { Player } from "../components/objects/player";
import { Score } from "../components/objects/ui/score";
import { WeaponComponent } from "../components/weapon/weapon-component";

export class GameScene extends Phaser.Scene{
    #background
    constructor(){
        super({key:'GameScene'})
    }
    
    create(){
        this.#background = this.add.tileSprite(0,0, 1024, 576, 'green_bg').setOrigin(0,0)
        const eventBusComponent = new EventBusComponent()

        const player = new Player(this, eventBusComponent)

        new Score(this, eventBusComponent)
        
    }



    update(){
        this.#background.tilePositionY -= 1;
      }
}