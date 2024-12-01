import { EventBusComponent } from "../components/events/event-bus-component";
import { EnemyDestroyedComponent } from "../components/spawner/enemy-destroy-component";
import { EnemySpawnerComponent } from "../components/spawner/enemy-spawner-component";
import { ScoutEnemy } from "../objects/enemies/scout-enemy";
import Player from "../objects/player";
import { GAME_SCENE_KEYS } from "../utils/scene-keys";

export class GameScene extends Phaser.Scene{
    #background: any
    constructor(){
        super({key:GAME_SCENE_KEYS.GAME_SCENE})
    }



    create(){
     this.#background = this.add.tileSprite(0,0, 1024, 576, 'purple-bg').setOrigin(0,0)
     new Player(this);
     const eventBusComponent = new EventBusComponent();

     const scoutSpawner = new EnemySpawnerComponent(this, ScoutEnemy,
        {

        },
      eventBusComponent);

     const figtherSpawner = new EnemySpawnerComponent(this, ScoutEnemy,
        {

        },
      eventBusComponent);

      new EnemyDestroyedComponent(this, eventBusComponent);

      





    }

    update(){
        this.#background.tilePositionX +=1;
    }

};


