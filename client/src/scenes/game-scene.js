import { FightEnemy } from "../objects/enemies/fight-enemy";
import { ScoutEnemy } from "../objects/enemies/scout-enemy";
import { Player } from "../objects/player";

export class GameScene extends Phaser.Scene{
    #background
    constructor(){
        super({key:'GameScene'})
    }



    create(){
     this.#background = this.add.tileSprite(0,0, 1024, 576, 'green_bg').setOrigin(0,0)
    
     new Player(this)
     new ScoutEnemy(this, this.scale.width / 2, 60)
     new FightEnemy(this, this.scale.width / 2, 60)
    }


    update(){
        this.#background.tilePositionY -=1;
    }

};


