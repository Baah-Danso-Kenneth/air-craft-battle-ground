import * as CONFIG from '../../../../shared/config.js';
import { HealthComponent } from "../../components/health/health.js";
import { ColliderComponent } from "../../components/collider/collider-component.js";
import { BotScoutInputComponent } from '../../utils/bot-scout-component.js';
import { VerticalMovementComponent } from '../../components/movements/vertical-movement.js';
import { CUSTOM_EVENTS } from '../../../../shared/config.js';



export class ScoutEnemy extends Phaser.GameObjects.Container{
    #horizontalMovementComponent: any;
    #isInitialized;
    #inputComponent: any;
    #shipSprite
    #shipEngineSprite
    #healthComponent: any
    #colliderComponent: any;
    #eventBusComponent: any
    #verticalMovementComponent: any

    constructor(scene: any, x: any, y: any){
        super(scene,x,y, []);

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(24,24)
        body.setOffset(-12,-12)
   
   
        this.#isInitialized=false
        this.#shipSprite = scene.add.sprite(0,0,'scout',0);
        this.#shipEngineSprite = scene.add.sprite(0,0,'scout_engine').setFlipY(true);
        this.#shipEngineSprite.play('scout_engine')
        this.add([ this.#shipEngineSprite, this.#shipSprite]);




        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.once(Phaser.GameObjects.Events.DESTROY, ()=>{
            this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        }, this)

    }

    get colliderComponent(){
        return this.#colliderComponent;
    }

    get healthComponent(){
        return this.#healthComponent;
    }

    init(eventBusComponent: any){
        this.#eventBusComponent = eventBusComponent
        this.#inputComponent = new BotScoutInputComponent(this)
        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#inputComponent, CONFIG.FIGHT_MOVEMENT_VERTICAL_VELOCITY)
        // this.#horizontalMovementComponent = new VerticalMovementComponent(this, this.#inputComponent, CONFIG.SCOUT_MOVEMENT_HORIZONTAL_VELOCITY)

        this.#healthComponent = new HealthComponent(CONFIG.ENEMY_SCOUT_HEALTH)
        this.#colliderComponent = new ColliderComponent(this.#healthComponent, this.#eventBusComponent)
        this.#eventBusComponent.emit(CUSTOM_EVENTS.ENEMY_INIT, this)
        this.#isInitialized=true
    }

    get shipAssetKey(){
        return 'scout'
    }

    get shipDestroyedAnimationKey(){
        return 'scout_destroy'
    }

    reset(){
        this.setActive(true)
        this.setVisible(true) 
        this.#healthComponent.reset()
        this.#inputComponent.startX = this.x;
        this.#verticalMovementComponent.reset()
        this.#horizontalMovementComponent.reset()
    }


    update(ts: any,dt: any){
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
        this.#horizontalMovementComponent.update()
   
    }
}