import { EventBusComponent } from "../components/events/event-bus-component";
import { EnemySpawnerComponent } from "../components/spawner/enemy-spawner-component";
import Player from "../objects/player";
import { GAME_SCENE_KEYS } from "../utils/scene-keys";
import * as CONFIG from '../../../shared/config'
import { FigtherEnemy } from "../objects/enemies/fighter-enemy";
import { ScoutEnemy } from "../objects/enemies/scout-enemy";

export class GameScene extends Phaser.Scene{
    #background: any
    constructor(){
        super({key:GAME_SCENE_KEYS.GAME_SCENE})
    }



    create(){
     this.#background = this.add.tileSprite(0,0, 1024, 576, 'purple-bg').setOrigin(0,0)
     const eventBusComponents = new EventBusComponent();
     const player = new Player(this);
     const scoutSpawner = new EnemySpawnerComponent(this, ScoutEnemy,
      {
          interval: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_INTERVAL,
          spawnAt: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_START
      },
      eventBusComponents);

  const figtherSpawner = new EnemySpawnerComponent(this, FigtherEnemy,
      {
          interval: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_INTERVAL,
          spawnAt: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_START
      },
      eventBusComponents
  );


    }


    update(){
        this.#background.tilePositionX +=1;
    }

};


