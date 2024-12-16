import * as CONFIG from '../../../utils/config';
import { ColliderComponent } from '../../collider/collider-component';
import { HealthComponent } from '../../health/health-component';
import { BotFighterInputComponent } from '../../input/bot-fighter-scout-input.js';
import { VerticalMovementComponent } from '../../movements/vertical-movement.js';
import { WeaponComponent } from '../../weapon/weapon-component.js';



export class FighterEnemy extends Phaser.GameObjects.Container{
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
    return 'scout_engine';
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