import { KeyboardInputComponent } from "../../components/inputs/keyboard-component.js";
import * as CONFIG from '../../../../shared/config.js'
import { BotScoutInputComponent } from "../../components/inputs/bot-scout-input-components.js";
import { VerticalMovementComponent } from "../../components/movements/vertical-component.js";
import { BotFighterInputComponent } from "../../components/inputs/bot-fighter-scout-input-component.js";
import { WeaponComponent } from "../../components/weapon/weapon-component.js";
import { HealthComponent } from "../../components/health/health-component.js";
import { ColliderComponent } from "../../components/collider/collider-component.js";



export class FightEnemy extends Phaser.GameObjects.Container{
  #enemyShip
  #shipEngine
  #inputComponent
  #verticalMovementComponent
  #weaponComponent
  #healthComponent
  #colliderComponent
  #eventBusComponent
  #isInitialized


  constructor(scene,x,y) {
    super(scene, x,y, []);
    this.#isInitialized = false
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setSize(24,24)
    this.body.setOffset(-12,-12)


    this.#enemyShip = scene.add.image(0,0, 'attack_ship2').setScale(0.3).setFlipY(true)
    this.#shipEngine = scene.add.sprite(0,-75, 'scout_engine').setScale(2)
    this.#shipEngine.play('scout_engine')
    this.add([this.#shipEngine,this.#enemyShip])


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

  init(eventBusComponent){
    this.#eventBusComponent = eventBusComponent
    this.#inputComponent = new BotFighterInputComponent();
    this.#weaponComponent = new WeaponComponent(this,this.#inputComponent,{
        maxCount: CONFIG.ENEMY_FIGHTER_BULLET_MAX_COUNT,
        yOffset: 70,
        speed:CONFIG.ENEMY_FIGHTER_BULLET_SPEED,
        flipY: true,
        lifeSpan:CONFIG.ENEMY_FIGHTER_BULLET_LIFESPAN,
        interval: CONFIG.PLAYER_BULLET_INTERVAL,
    }, this.#eventBusComponent)

    this.#verticalMovementComponent = new VerticalMovementComponent(
      this,
       this.#inputComponent, CONFIG.ENEMY_FIGHTER_MOVEMENT_VERTICAL_VELOCITY)
       this.#healthComponent = new HealthComponent(CONFIG.ENEMY_FIGHTER_HEALTH)
       this.#colliderComponent = new ColliderComponent(this.#healthComponent, this.#eventBusComponent)
       this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.ENEMY_INIT, this)
       this.#isInitialized = true
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
        return;
    }
    if(this.#healthComponent.isDead){
        this.setActive(false)
        this.setVisible(false)
        this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.ENEMY_DESTROYED, this)
    }
    this.#inputComponent.update();
    this.#verticalMovementComponent.update()
    this.#weaponComponent.update(dt)
  }

}