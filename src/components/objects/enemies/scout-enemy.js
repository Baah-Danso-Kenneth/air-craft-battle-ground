import { KeyboardInputComponent } from "../../input/keyboard-component.js";
import * as CONFIG from '../../../utils/config.js'
import { VerticalMovementComponent } from "../../movements/vertical-movement.js";
import { HorizontalMovementComponent } from "../../movements/horizontal-movement.js";
import { BotScoutInputComponent } from "../../input/bot-scout-input-comonents.js";
import { HealthComponent } from "../../health/health-component.js";
import { ColliderComponent } from "../../collider/collider-component.js";


export class ScoutEnemy extends Phaser.GameObjects.Container{
  #enemyShip
  #shipEngine
  #inputComponent
  #verticalMovementComponent
  #horizontalMovementComponent
  #healthComponent
  #colliderComponent
  #eventBusComponent
  #isInitialized


  constructor(scene,x,y) {
    super(scene, x,y, []);
    this.#isInitialized=false
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setSize(24,24)
    this.body.setOffset(-12,-12)


    this.#enemyShip = scene.add.image(0,0, 'attacker_1').setScale(0.3).setFlipY(true)
    this.#shipEngine = scene.add.sprite(0, -55, 'scout_engine').setScale(2)

    scene.anims.create({
        key: 'enemyFlames',
        frames: scene.anims.generateFrameNumbers('scout_engine', {
          start: 0, 
          end: 3,   
        }),
        frameRate: 10,
        repeat: -1,    
      });

    this.#shipEngine.play('enemyFlames')

    this.add([this.#shipEngine,this.#enemyShip])

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(Phaser.GameObjects.Events.DESTROY, ()=>{
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    }, this)
  }

    /** @type {ColliderComponent} */
    get colliderComponent() {
        return this.#colliderComponent;
      }
    
      /** @type {HealthComponent} */
      get healthComponent() {
        return this.#healthComponent;
      }
    
      /** @type {string} */
      get shipAssetKey() {
        return 'scout';
      }
    
      /** @type {string} */
      get shipDestroyedAnimationKey() {
        return 'scout_destroy';
      }

  init(eventBusComponent){
    this.#eventBusComponent = eventBusComponent;

    this.#inputComponent = new BotScoutInputComponent(this);

    this.#verticalMovementComponent = new VerticalMovementComponent(
        this,
         this.#inputComponent,
         CONFIG.ENEMY_SCOUT_MOVEMENT_VERTICAL_VELOCITY
        )


        this.#horizontalMovementComponent = new HorizontalMovementComponent(
            this,
             this.#inputComponent,
             CONFIG.ENEMY_SCOUT_MOVEMENT_HORIZONTAL_VELOCITY
            );
            
            this.#healthComponent = new HealthComponent(CONFIG.ENEMY_SCOUT_HEALTH)
            this.#colliderComponent = new ColliderComponent(this.#healthComponent);

            this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.ENEMY_INIT, this)
            this.#isInitialized = true
  }


  reset(){
    this.setActive(true)
    this.setVisible(true)
    this.#healthComponent.reset()
    this.#inputComponent.startX = this.x;
    this.#verticalMovementComponent.reset()
    this.#horizontalMovementComponent.reset()
  }


  update(ts,dt){

    if(!this.#isInitialized){
        return
    }
    if(!this.active){
        return;
      }
      
    this.#inputComponent.update();
    this.#verticalMovementComponent.update()
    this.#horizontalMovementComponent.update()
  }

}