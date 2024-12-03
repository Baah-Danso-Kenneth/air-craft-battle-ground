import { KeyboardInputComponent } from "../../components/inputs/keyboard-component.js";
import * as CONFIG from '../../../../shared/config.js'
import { BotScoutInputComponent } from "../../components/inputs/bot-scout-input-components.js";
import { VerticalMovementComponent } from "../../components/movements/vertical-component.js";
import { BotFighterInputComponent } from "../../components/inputs/bot-fighter-scout-input-component.js";



export class FightEnemy extends Phaser.GameObjects.Container{
  #enemyShip
  #shipEngine
  #inputComponent
  #verticalMovementComponent


  constructor(scene,x,y) {
    super(scene, x,y, []);
    this.scene.add.existing(this)
    this.scene.physics.add.existing(this)
    this.body.setSize(24,24)
    this.body.setOffset(-12,-12)


    this.#enemyShip = scene.add.image(0,0, 'attack_ship2').setScale(0.3).setFlipY(true)
    this.#shipEngine = scene.add.sprite(0,-55, 'scout_engine').setScale(2)
    this.#shipEngine.play('scout_engine')
    this.add([this.#shipEngine,this.#enemyShip])

    this.#inputComponent = new BotFighterInputComponent();

    this.#verticalMovementComponent = new VerticalMovementComponent(
      this,
       this.#inputComponent, CONFIG.ENEMY_FIGHTER_MOVEMENT_VERTICAL_VELOCITY)


    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.once(Phaser.GameObjects.Events.DESTROY, ()=>{
        this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
    }, this)
  }



  update(ts,dt){
    this.#inputComponent.update();
    this.#verticalMovementComponent.update()
  }

}