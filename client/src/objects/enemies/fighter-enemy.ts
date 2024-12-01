import { VerticalMovementComponent } from "../../components/movements/vertical-movement";
import { BotFightScoutInputComponent } from "../../utils/bot-fighter-component";
import * as CONFIG from '../../../../shared/config'
import { HealthComponent } from "../../components/health/health";
import { ColliderComponent } from "../../components/collider/collider-component";
import { CUSTOM_EVENTS } from "../../../../shared/config";


export class FigtherEnemy extends Phaser.GameObjects.Container{
    #weaponComponent: any;
    #isInitialized;
    #inputComponent: any;
    #shipSprite
    #shipEngineSprite
    #verticalMovementComponent: any
    #healthComponent: any
    #colliderComponent: any;
    #eventBusComponent: any

    constructor(scene:any, x:any, y:any){
        super(scene,x,y, []);
        this.#isInitialized=false
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(24,24)
        body.setOffset(-12,-12)
   
   

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

    init(eventBusComponent:any){
        this.#eventBusComponent = eventBusComponent
        this.#inputComponent = new BotFightScoutInputComponent()
        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#inputComponent, CONFIG.FIGHT_MOVEMENT_VERTICAL_VELOCITY)

        this.#weaponComponent = new this.WeaponComponent(this, this.#inputComponent,{
            speed: CONFIG.ENEMY_FIGHTER_BULLET_SPEED,
            interval: CONFIG.ENEMY_FIGHTER_BULLET_INTERVAL,
            lifespan: CONFIG.ENEMY_FIGHTER_BULLET_LIFESPAN,
            maxCount: CONFIG.ENEMY_FIGHTER_BULLET_MAX_COUNT,
            yOffset: 10,
            flipY: false,
        }, this.#eventBusComponent)

        this.#healthComponent = new HealthComponent(CONFIG.ENEMY_SCOUT_HEALTH)
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

    update(dt:any){
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