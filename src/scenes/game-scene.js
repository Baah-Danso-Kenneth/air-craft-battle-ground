import { EventBusComponent } from "../components/events/event-component";
import { FighterEnemy } from "../components/objects/enemies/fight-enemy";
import { ScoutEnemy } from "../components/objects/enemies/scout-enemy";
import { Player } from "../components/objects/player";
import { Lives } from "../components/objects/ui/lives";
import { Score } from "../components/objects/ui/score";
import { EnemyDestroyedComponent } from "../components/spawner/enemy-destroyed";
import { EnemySpawnerComponent } from "../components/spawner/enemy-spawner-component";
import * as CONFIG from '../utils/config';


export class GameScene extends Phaser.Scene{
    #background
    constructor(){
        super({key:'GameScene'})
    }
    
    create(){
        this.#background = this.add.tileSprite(0,0, 1024, 576, 'green_bg').setOrigin(0,0)
       const eventComponent = new  EventBusComponent()
   
        const player = new Player(this, eventComponent)
        const scoutSpawer = new EnemySpawnerComponent(
           this,
           ScoutEnemy,
           {
               interval: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_INTERVAL,
               spawnAt: CONFIG.ENEMY_SCOUT_GROUP_SPAWN_START,
           },
           eventComponent
        )
        const fightherSpawer = new EnemySpawnerComponent(
           this,
           FighterEnemy,
           {
               interval: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_INTERVAL,
               spawnAt: CONFIG.ENEMY_FIGHTER_GROUP_SPAWN_START,
           },
           eventComponent
        );

        new EnemyDestroyedComponent(this, eventComponent);
     
        this.physics.add.overlap(player, scoutSpawer.phaserGroup,(playerGameObject, enemyGameObject)=>{
           if(!playerGameObject.active || !enemyGameObject.active){
              return
        }
   
           playerGameObject.colliderComponent.collideWithEnemyShip();
           enemyGameObject.colliderComponent.collideWithEnemyShip();
   
        })
   
        this.physics.add.overlap(player, fightherSpawer.phaserGroup,(playerGameObject, enemyGameObject)=>{
           if(!playerGameObject.active || !enemyGameObject.active){
              return
            }
            
            playerGameObject.colliderComponent.collideWithEnemyShip();
            enemyGameObject.colliderComponent.collideWithEnemyShip();
            
         })
         
         
         eventComponent.on(CONFIG.CUSTOM_EVENTS.ENEMY_INIT, (gameObject)=>{
            if(gameObject.constructor.name !== 'FighterEnemy'){
               return;
            }
            
            this.physics.add.overlap(player, gameObject.weaponGameObjectGroup,(playerGameObject, projectGameTileObject)=>{
               if(!playerGameObject.active || !projectGameTileObject.active){
               return
           }
   
            gameObject.weaponComponent.destroyBullet(projectGameTileObject)
            playerGameObject.colliderComponent.collideWithEnemyProjectile();
            
         })
      })
      
      
    
        this.physics.add.overlap(scoutSpawer.phaserGroup, player.weaponGameObjectGroup,(enemyGameObject, projectGameTileObject)=>{
         if(!enemyGameObject.active || !projectGameTileObject.active){
            return
         }
           player.weaponComponent.destroyBullet(projectGameTileObject)
           enemyGameObject.colliderComponent.collideWithEnemyProjectile();
        })
   
        this.physics.add.overlap(fightherSpawer.phaserGroup, player.weaponGameObjectGroup,(enemyGameObject, projectGameTileObject)=>{
         if(!enemyGameObject.active || !projectGameTileObject.active){
            return
        }
           player.weaponComponent.destroyBullet(projectGameTileObject)
           enemyGameObject.colliderComponent.collideWithEnemyProjectile();
        })
   
        new Score(this, eventComponent)
        new Lives(this, eventComponent)

   
       }



    update(){
        this.#background.tilePositionY -= 1;
      }
}