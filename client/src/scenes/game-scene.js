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
    
     const player = new Player(this)
    //  const fighter_enemy = new ScoutEnemy(this, this.scale.width / 2, 60)
     const fighter_enemy = new FightEnemy(this, this.scale.width / 2, 60)

     this.physics.add.overlap(player, fighter_enemy,(playerGameObject, enemyGameObject)=>{
        playerGameObject.colliderComponent.collideWithEnemyShip();
        enemyGameObject.colliderComponent.collideWithEnemyShip();

     })

     this.physics.add.overlap(player, fighter_enemy.weaponGameObjectGroup,(playerGameObject, projectGameTileObject)=>{
       fighter_enemy.weaponComponent.destroyBullet(projectGameTileObject)
        playerGameObject.colliderComponent.collideWithEnemyProjectile();

     })

     this.physics.add.overlap(fighter_enemy, player.weaponGameObjectGroup,(enemyGameObject, projectGameTileObject)=>{
        player.weaponComponent.destroyBullet(projectGameTileObject)

        fighter_enemy.colliderComponent.collideWithEnemyProjectile();
     })

    }


    update(){
        this.#background.tilePositionY -=1;
    }

};


