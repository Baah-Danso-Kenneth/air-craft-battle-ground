import { KeyboardInputComponent } from "../components/inputs/keyboard-component";
import * as CONFIG from '../../../shared/config.js'
import { VerticalMovementComponent } from "../components/movements/vertical-component.js";
import { HorizontalMovementComponent } from "../components/movements/horizontal-movement.js";
import { WeaponComponent } from "../components/weapon/weapon-component.js";
import { HealthComponent } from "../components/health/health-component.js";
import { ColliderComponent } from "../components/collider/collider-component.js";


export class Player extends Phaser.GameObjects.Container {
  #playerShip
  #shipEngine
  #keyboardInputComponent
  #horizontalMovementComponent
  #verticalMovementComponent
  #eventBusComponent;
  #weaponComponent;
  #healthComponent
  #colliderComponent

  constructor(scene, eventBusComponent) {
    super(scene, scene.scale.width / 2, scene.scale.height - 95, []);
    this.#eventBusComponent = eventBusComponent
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setSize(24,24)
    this.body.setOffset(-12,-12)
    this.body.setCollideWorldBounds(true)
    this.setDepth(2)



    this.#playerShip = scene.add.sprite(0,0, 'player_ship').setScale(0.4)
    this.#shipEngine = scene.add.sprite(0,50, 'flames_fire').setScale(0.8)
    this.#shipEngine.play('flameEffect')

    this.add([this.#shipEngine,this.#playerShip])

    this.#keyboardInputComponent = new KeyboardInputComponent(this.scene)

    this.#horizontalMovementComponent = new HorizontalMovementComponent(
        this,
        this.#keyboardInputComponent,
        CONFIG.PLAYER_MOVEMENT_HORIZONTAL_VELOCITY
      );


      this.#weaponComponent = new WeaponComponent(this, this.#keyboardInputComponent,{
        maxCount: CONFIG.PLAYER_BULLET_MAX_COUNT,
        yOffset: -70,
        speed:CONFIG.PLAYER_BULLET_SPEED,
        flipY: false,
        lifeSpan:CONFIG.PLAYER_BULLET_LIFESPAN,
        interval: CONFIG.PLAYER_BULLET_INTERVAL,
      })

      this.#healthComponent = new HealthComponent(CONFIG.PLAYER_HEALTH)
      this.#colliderComponent = new ColliderComponent(this.#healthComponent)
      this.#hide()

      this.#eventBusComponent.on(CONFIG.CUSTOM_EVENTS.PLAYER_SPAWN, this.#spawn, this)

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(Phaser.GameObjects.Events.DESTROY, ()=>{
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    }, this)
  }

  get weaponGameObjectGroup() {
    return this.#weaponComponent.bulletGroup;
  }

  get weaponComponent() {
    return this.#weaponComponent;
  }

  get colliderComponent() {
    return this.#colliderComponent;
  }

  get healthComponent() {
    return this.#healthComponent;
  }


  update(ts,dt){
    if(!this.active){
      return;
  }

    if(this.#healthComponent.isDead){
      this.#hide()
      this.setVisible(true)
      this.#playerShip.play({
        key:'explosion'
      });
      this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.PLAYER_DESTROYED)
      return;
  }

    // this.#playerShip.setFrame((CONFIG.PLAYER_HEALTH - this.#healthComponent.life).toString(10))
    this.#keyboardInputComponent.update();
    this.#horizontalMovementComponent.update()
    this.#weaponComponent.update(dt)
  }

  #hide(){
    this.setActive(false)
    this.setVisible(false)
    this.#shipEngine.setVisible(false)
    this.#keyboardInputComponent.lockInput = true
  }

  #spawn(){
    this.setActive(true)
    this.setVisible(true)
    this.#shipEngine.setVisible(true)
    this.#playerShip.setTexture('player_ship', 0);
    this.#healthComponent.reset();
    this.setPosition(this.scene.scale.width / 2, this.scene.scale.height - 92)
    this.#keyboardInputComponent.lockInput = false
}

}