
import { ColliderComponent } from "../../components/collider/collider-component.js";
import { CUSTOM_EVENTS } from "../../components/events/event-bus-component.js";
import { HealthComponent } from "../../components/health/health.js";
import { BotFightScoutInputComponent } from "../../components/input/bot-fighter-scout-input-container.js";
import { VerticalMovementComponent } from "../../components/movement/vertical-movement-component";
import { WeaponComponent } from "../../components/weapon/weapon-component.js";
import * as CONFIG from '../../config.js';


export class FigtherEnemy extends Phaser.GameObjects.Container{
    #weaponComponent;
    #isInitialized;
    #inputComponent;
    #shipSprite
    #shipEngineSprite
    #verticalMovementComponent
    #healthComponent
    #colliderComponent;
    #eventBusComponent

    constructor(scene, x, y){
        super(scene,x,y, []);
        this.#isInitialized=false
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        this.body.setSize(24,24)
        this.body.setOffset(-12,-12)
   
   

        this.#shipSprite = scene.add.sprite(0,0,'fighter',0);
        this.#shipEngineSprite = scene.add.sprite(0,0,'fighter_engine').setFlipY(true);
        this.#shipEngineSprite.play('scout_engine')
        this.add([ this.#shipEngineSprite, this.#shipSprite]);



        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.once(Phaser.GameObjects.Events.DESTROY, ()=>{
            this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        }, this)
    }
    
    get weaponGameObjectGroup(){
        return this.#weaponComponent.bulletGroup
    }

    get WeaponComponent(){
        return this.#weaponComponent;
    }

    get colliderComponent(){
        return this.#colliderComponent;
    }


    get healthComponent(){
        return this.#healthComponent;
    }

    get shipAssetKey(){
        return 'fighter'
    }

    get shipDestroyedAnimationKey(){
        return 'fighter_destroy'
    }

    init(eventBusComponent){
        this.#eventBusComponent = eventBusComponent
        this.#inputComponent = new BotFightScoutInputComponent()
        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#inputComponent, CONFIG.FIGHT_MOVEMENT_VERTICAL_VELOCITY)

        this.#weaponComponent = new WeaponComponent(this, this.#inputComponent,{
            speed: CONFIG.ENEMY_FIGHTER_BULLET_SPEED,
            interval: CONFIG.ENEMY_FIGHTER_BULLET_INTERVAL,
            lifespan: CONFIG.ENEMY_FIGHTER_BULLET_LIFESPAN,
            maxCount: CONFIG.ENEMY_FIGHTER_BULLET_MAX_COUNT,
            yOffset: 10,
            flipY: false,
        }, this.#eventBusComponent)

        this.#healthComponent = new HealthComponent(CONFIG.PLAYER_HEALTH)
        this.#colliderComponent = new ColliderComponent(this.#healthComponent, this.#eventBusComponent)
        this.#eventBusComponent.emit(CUSTOM_EVENTS.ENEMY_INIT, this)
        this.#isInitialized=true;
    }


    reset(){
        this.setActive(true)
        this.setVisible(true) 
        this.#healthComponent.reset()
        this.#verticalMovementComponent.reset()
    }

    update(ts,dt){
        if(!this.#isInitialized){
            return
        }
        if(!this.active){
            return
        }
        if(this.#healthComponent.isDead){
            this.setActive(false)
            this.setVisible(false)
            this.#eventBusComponent.emit(CUSTOM_EVENTS.ENEMY_DESTROYED, this)
        }

        this.#inputComponent.update();
        this.#verticalMovementComponent.update()
        this.#weaponComponent.update(dt)
   
    }
}