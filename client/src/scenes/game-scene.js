import { EnemySpawnerComponent } from "../components/spawner/enemy-spawner-component";
import { FigtherEnemy } from "../objects/enemies/fighter-enemy";
import { ScoutEnemy } from "../objects/enemies/scout-enemy";
import { Player } from "../objects/player"
import * as CONFIG from '../config.js';
import { CUSTOM_EVENTS, EventBusComponent } from "../components/events/event-bus-component.js";
import { EnemyDestroyedComponent } from "../components/spawner/enemy-destroy-component.js";
import { Score } from "../objects/ui/score.js";
import { Lives } from "../objects/ui/lives.js";
import { AudioManager } from "../objects/audio-manager.js";


export class GameScene extends Phaser.Scene{
    #background
    constructor(){
        super({key: 'GameScene'})
    }

    preload(){
        this.load.pack('asset_pack', 'assets/data/assets.json');


    }

    create(){

        this.#background = this.add.tileSprite(0,0, 1024, 576, 'green_bg').setOrigin(0,0) 
        const eventBusComponents = new EventBusComponent();
        const player = new Player(this, eventBusComponents);
        const score = new Score(this, eventBusComponents)
        const lives = new Lives(this, eventBusComponents)

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

        new EnemyDestroyedComponent(this, eventBusComponents);
        new AudioManager(this, eventBusComponents)


        this.physics.add.overlap(player, scoutSpawner.phaserGroup, (playerGameObject, enemyObject)=>{
            if(!playerGameObject.active || !enemyObject.active){
                return
            }
           playerGameObject.colliderComponent.collideWithEnemyShip()
           enemyObject.colliderComponent.collideWithEnemyShip()
        });

        this.physics.add.overlap(player, figtherSpawner.phaserGroup, (playerGameObject, enemyObject)=>{
            if(!playerGameObject.active || !enemyObject.active){
                return
            }
            playerGameObject.colliderComponent.collideWithEnemyShip()
            enemyObject.colliderComponent.collideWithEnemyShip()
         });

         eventBusComponents.on(CUSTOM_EVENTS.ENEMY_INIT,(gameObject)=>{
            if(gameObject.constructor.name !== 'FigtherEnemy'){
                return;
            }
             this.physics.add.overlap(player, gameObject.weaponGameObjectGroup,(playerGameObject, projectTileGameObject)=>{
            gameObject.WeaponComponent.destroyBullet(projectTileGameObject)
            playerGameObject.colliderComponent.collideWithEnemyProjectile();
        });

        })



        this.physics.add.overlap(scoutSpawner.phaserGroup, player.weaponGameObjectGroup,(enemyGameObject, projectTileGameObject)=>{
            if(!enemyGameObject.active || !projectTileGameObject.active){
                return
            }
            player.WeaponComponent.destroyBullet(projectTileGameObject)
            enemyGameObject.colliderComponent.collideWithEnemyProjectile();

        });
    

        this.physics.add.overlap(figtherSpawner.phaserGroup, player.weaponGameObjectGroup,(enemyGameObject, projectTileGameObject)=>{
            if(!enemyGameObject.active || !projectTileGameObject.active){
                return
            }
            player.WeaponComponent.destroyBullet(projectTileGameObject)
            enemyGameObject.colliderComponent.collideWithEnemyProjectile();

        });
    }


    update(){
        this.#background.tilePositionY -=1;
    }
}