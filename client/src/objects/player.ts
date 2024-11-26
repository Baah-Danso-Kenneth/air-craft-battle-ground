import * as CONFIG from '../../../shared/config.ts'


import { KeyboardInputComponent } from "../components/input/keyboard-input-container";
import { VerticalMovementComponent } from "../components/movements/vertical-movement";

export default class Player extends Phaser.GameObjects.Container {
    #shipSprite;
    #shipEngineSprite
    #keyboardInputComponent
    #verticalMovementComponent

    constructor(scene: any) {
        super(scene, scene.scale.width / 7, scene.scale.height - 300, []);
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        const body = this.body as Phaser.Physics.Arcade.Body;
        body.setSize(24,24)
        body.setOffset(-12,-12)
        body.setCollideWorldBounds(true)
        this.setDepth(2)

        this.#shipSprite = scene.add.image(0, 0, 'plane1').setScale(0.2);
        this.#shipEngineSprite = scene.add.sprite(-100, 20, 'ship-flame').setScale(0.3);

        this.#shipEngineSprite.play('ship-flame')
        this.add([this.#shipEngineSprite, this.#shipSprite])

        this.#keyboardInputComponent = new KeyboardInputComponent(this.scene)
        this.#verticalMovementComponent = new VerticalMovementComponent(this, this.#keyboardInputComponent, CONFIG.PLAYER_MOVEMENT_VERTICAL_VELOCITY)

        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
        this.once(Phaser.GameObjects.Events.DESTROY, ()=>{
            this.scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
        }, this)
    }


    update() {
        if (!this.active) {
            return;
        }
        this.#keyboardInputComponent.update();
        console.log(this.#keyboardInputComponent); 
        this.#verticalMovementComponent.update();
    }
    
}
