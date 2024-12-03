import { KeyboardInputComponent } from "../components/inputs/keyboard-component";
import * as CONFIG from '../../../shared/config.js'
import { VerticalMovementComponent } from "../components/movements/vertical-component.js";
import { HorizontalMovementComponent } from "../components/movements/horizontal-movement.js";
import { WeaponComponent } from "../components/weapon/weapon-component.js";


export class Player extends Phaser.GameObjects.Container {
  #playerShip
  #shipEngine
  #keyboardInputComponent
  #horizontalMovementComponent
  #verticalMovementComponent
  #weaponComponent;

  constructor(scene) {
    super(scene, scene.scale.width / 2, scene.scale.height - 95, []);
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setSize(24,24)
    this.body.setOffset(-12,-12)
    this.body.setCollideWorldBounds(true)
    this.setDepth(2)



    this.#playerShip = scene.add.image(0,0, 'player_ship').setScale(0.5)
    this.#shipEngine = scene.add.sprite(0,65, 'flames_fire').setScale(0.8)
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

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(Phaser.GameObjects.Events.DESTROY, ()=>{
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    }, this)
  }



  update(ts,dt){
    this.#keyboardInputComponent.update();
    this.#horizontalMovementComponent.update()
    this.#weaponComponent.update(dt)
  }

}