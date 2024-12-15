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
        new ScoutEnemy(this, this.scale.width / 2, 0)
        new FightEnemy(this, this.scale.width / 2, 0)
        // const scoutSpawner = new EnemySpawnerComponent(
        //     this,
        //     ScoutEnemy,
        //     {
        //         interval: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_INTERVAL,
        //         spawnAt: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_START,
        //     },
        //     eventBusComponent
        // );

        // const fightherSpawer = new EnemySpawnerComponent(
        //     this,
        //     FightEnemy,
        //     {
        //         interval: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_INTERVAL,
        //         spawnAt: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_START,
        //     },
        //     eventBusComponent
        //  );

    //      this.physics.add.overlap(player, scoutSpawner.phaserGroup,(playerGameObject, enemyGameObject)=>{
    //         if(!playerGameObject.active || !enemyGameObject.active){
    //            return
    //      }
    
    //         playerGameObject.colliderComponent.collideWithEnemyShip();
    //         enemyGameObject.colliderComponent.collideWithEnemyShip();
    
    //      })
    
    //      this.physics.add.overlap(player, fightherSpawer.phaserGroup,(playerGameObject, enemyGameObject)=>{
    //         if(!playerGameObject.active || !enemyGameObject.active){
    //            return
    //          }
             
    //          playerGameObject.colliderComponent.collideWithEnemyShip();
    //          enemyGameObject.colliderComponent.collideWithEnemyShip();
             
    //       })
          
          
    //       eventBusComponent.on(CONFIG.CUSTOM_EVENTS.ENEMY_INIT, (gameObject)=>{
    //          if(gameObject.constructor.name !== 'FightEnemy'){
    //             return;
    //          }
             
    //          this.physics.add.overlap(player, gameObject.weaponGameObjectGroup,(playerGameObject, projectGameTileObject)=>{
    //             if(!playerGameObject.active || !projectGameTileObject.active){
    //             return
    //         }
    
    //          gameObject.weaponComponent.destroyBullet(projectGameTileObject)
    //          playerGameObject.colliderComponent.collideWithEnemyProjectile();
             
    //       })
    //    })
       
        //  this.physics.add.overlap(scoutSpawner.phaserGroup, player.weaponGameObjectGroup,(enemyGameObject, projectGameTileObject)=>{
        //   if(!enemyGameObject.active || !projectGameTileObject.active){
        //      return
        //   }
        //     player.weaponComponent.destroyBullet(projectGameTileObject)
        //     enemyGameObject.colliderComponent.collideWithEnemyProjectile();
        //  })

    
        //  this.physics.add.overlap(fightherSpawer.phaserGroup, player.weaponGameObjectGroup,(enemyGameObject, projectGameTileObject)=>{
        //   if(!enemyGameObject.active || !projectGameTileObject.active){
        //      return
        //  }
        //     player.weaponComponent.destroyBullet(projectGameTileObject)
        //     enemyGameObject.colliderComponent.collideWithEnemyProjectile();
        //  })  

        new Score(this, eventBusComponent)
        
    }



    update(){
        this.#background.tilePositionY -= 1;
      }
}