import { KeyboardInputComponent } from "../../input/keyboard-component.js";
import * as CONFIG from '../../../utils/config.js'
import { VerticalMovementComponent } from "../../movements/vertical-movement.js";
import { HorizontalMovementComponent } from "../../movements/horizontal-movement.js";
import { BotFighterInputComponent } from "../../input/bot-fighter-scout-input.js";
import { WeaponComponent } from "../../weapon/weapon-component.js";
import { HealthComponent } from "../../health/health-component.js";
import { ColliderComponent } from "../../collider/collider-component.js";


// import { VerticalMovementComponent } from "../../components/movements/vertical-component.js";
// import { HorizontalMovementComponent } from "../../components/movements/horizontal-movement.js";
// import { ColliderComponent } from "../../components/collider/collider-component.js";
// import { HealthComponent } from "../../components/health/health-component.js";



export class FightEnemy extends Phaser.GameObjects.Container{
  #enemyShip
  #shipEngine
  #inputComponent
  #verticalMovementComponent
  #horizontalMovementComponent
  #healthComponent
  #colliderComponent
  #eventBusComponent
  #isInitialized
  #weaponComponent


  constructor(scene,x,y) {
    super(scene, x,y, []);
    this.#isInitialized=false
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setSize(24,24)
    this.body.setOffset(-12,-12)


    this.#enemyShip = scene.add.image(0,0, 'attack_ship2').setScale(0.3).setFlipY(true)
    this.#shipEngine = scene.add.sprite(0, -75, 'scout_engine').setScale(2)

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

    this.#inputComponent = new BotFighterInputComponent();
    this.#verticalMovementComponent = new VerticalMovementComponent(
        this,
         this.#inputComponent,
         CONFIG.ENEMY_FIGHTER_MOVEMENT_VERTICAL_VELOCITY
        )

        
    this.#weaponComponent = new WeaponComponent(this, this.#inputComponent, {
        maxCount: CONFIG.ENEMY_FIGHTER_BULLET_MAX_COUNT,
        yOffset: 70,
        speed:CONFIG.ENEMY_FIGHTER_BULLET_SPEED,
        flipY: true,
        lifeSpan:CONFIG.ENEMY_FIGHTER_BULLET_LIFESPAN,
        interval: CONFIG.ENEMY_FIGHTER_BULLET_INTERVAL,
    })

    this.#healthComponent = new HealthComponent(CONFIG.ENEMY_FIGHTER_HEALTH)
    this.#colliderComponent = new ColliderComponent(this.#healthComponent)

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(Phaser.GameObjects.Events.DESTROY, ()=>{
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    }, this)
  }


  get colliderComponent() {
    return this.#colliderComponent;
  }

  get healthComponent() {
    return this.#healthComponent;
  }

  get weaponGameObjectGroup() {
    return this.#weaponComponent.bulletGroup;
  }

  get weaponComponent() {
    return this.#weaponComponent;
  }

  get shipAssetKey() {
    return 'fighter';
  }

  get shipDestroyedAnimationKey() {
    return 'fighter_destroy';
  }


  update(ts,dt){
    if(!this.active){
        return;
      }

    if(this.#healthComponent.isDead){
        this.setActive(false);
        this.setVisible(false)
    }

    this.#inputComponent.update();
    this.#verticalMovementComponent.update()
    this.#weaponComponent.update(dt)
  }

}