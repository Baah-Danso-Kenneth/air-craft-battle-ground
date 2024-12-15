import { EventBusComponent } from "../components/events/event-component";
import { FightEnemy } from "../components/objects/enemies/fight-enemy";
import { ScoutEnemy } from "../components/objects/enemies/scout-enemy";
import { Player } from "../components/objects/player";
import { Score } from "../components/objects/ui/score";
import { EnemySpawnerComponent } from "../components/spawner/enemy-spawner-component";
import { createEnemyFlamesAnimation } from "../lib/animations/animation";
import * as CONFIG from '../utils/config';


export class GameScene extends Phaser.Scene{
    #background
    constructor(){
        super({key:'GameScene'})
    }
    
    create(){
        this.#background = this.add.tileSprite(0,0, 1024, 576, 'green_bg').setOrigin(0,0)
        const eventBusComponent = new EventBusComponent()



        const player = new Player(this, eventBusComponent)
        const enemySpawner = new ScoutEnemy(this, this.scale.width / 2, 0)
        const enemyFighter = new FightEnemy(this, this.scale.width / 2, 0)

        this.physics.add.overlap(player, enemyFighter, (playerGameObject, enemyGameObject)=>{
            playerGameObject.colliderComponent.collideWithEnemyShip();
            enemyGameObject.colliderComponent.collideWithEnemyShip();

        });

        this.physics.add.overlap(player, enemyFighter.weaponGameObjectGroup, (enemyGameObject, projectileGameObject)=>{
            console.log(enemyGameObject, projectileGameObject)
        });

        this.physics.add.overlap(enemyFighter, player.weaponGameObjectGroup, (enemyGameObject, projectileGameObject)=>{
            console.log(enemyGameObject, projectileGameObject)
        });



        new Score(this, eventBusComponent)
        
    }



    update(){
        this.#background.tilePositionY -= 1;
      }
}