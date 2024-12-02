import { HealthComponent } from "../components/health/health.js";
import { KeyboardInputComponent } from "../components/input/keyboard-input-container.js";
import { HorizontalMovementComponent } from "../components/movement/horizontal-movement-componet";
import { VerticalMovementComponent } from "../components/movement/vertical-movement-component.js";
import { WeaponComponent } from "../components/weapon/weapon-component.js";
import * as CONFIG from '../config.js'
import { ColliderComponent } from "../components/collider/collider-component.js";
import { CUSTOM_EVENTS } from "../components/events/event-bus-component.js";


export class Player extends Phaser.GameObjects.Container{
    #horizontalMovementComponent;
    #weaponComponent
    #healthComponent
    #colliderComponent;
    #eventBusComponent

    #keyboardInputComponent;
    #shipSprite
    #shipEngineThrusterSprite
    #shipEngineSprite
    // #spawn

    constructor(scene, eventBusComponent){
        super(scene, scene.scale.width / 2, scene.scale.height - 32, []);
        this.#eventBusComponent = eventBusComponent
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this)
        this.body.setSize(200,200)
        this.body.setOffset(-100,-30)
        this.body.setCollideWorldBounds(true)
        this.setDepth(2)

        this.#shipSprite = scene.add.image(0, 0,'fire-ship')
        this.#shipEngineThrusterSprite = scene.add.sprite(scene.scale.width / 2, 540,'flamey').setScale(0.4);
        this.#shipEngineThrusterSprite.play('flameEffect')
        this.add([this.#shipEngineSprite,this.#shipSprite]);

        this.#keyboardInputComponent = new KeyboardInputComponent(this.scene);
        this.#horizontalMovementComponent = new HorizontalMovementComponent(this, this.#keyboardInputComponent, CONFIG.PLAYER_MOVEMENT_HORIZONTAL_VELOCITY)

        this.#weaponComponent = new WeaponComponent(this, this.#keyboardInputComponent,{
            speed: CONFIG.PLAYER_BULLET_SPEED,
            interval: CONFIG.PLAYER_BULLET_INTERVAL,
            lifespan: CONFIG.BULLET_LIFE_SPAN,
            maxCount: 2,
            yOffset: -20,
            flipY: false,
        }, this.#eventBusComponent)
        
        this.#healthComponent = new HealthComponent(CONFIG.PLAYER_HEALTH)
        this.#colliderComponent = new ColliderComponent(this.#healthComponent, this.#eventBusComponent)
        this.#hide()
        this.#eventBusComponent.on(CUSTOM_EVENTS.PLAYER_SPAWN, this.#spawn, this)

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


    update(ts,dt){
        if(!this.active){
            return
        }
        if(this.#healthComponent.isDead){
            this.#hide();
            this.setVisible(true)
            this.#shipSprite.play({
                key: 'explosion'
            });
            this.#eventBusComponent.emit(CUSTOM_EVENTS.PLAYER_DESTROYED)
            return;
        }

        this.#shipSprite.setFrame((CONFIG.PLAYER_HEALTH - this.#healthComponent.life).toString(10))

        this.#keyboardInputComponent.update();
        this.#horizontalMovementComponent.update()
        this.#weaponComponent.update(dt)
        // this.#verticalMovementComponent.update()
    }

    #hide(){
        this.setActive(false)
        this.setVisible(false)
        this.#shipEngineSprite.setVisible(false)
        this.#shipEngineThrusterSprite.setVisible(false)
        this.#keyboardInputComponent.lockInput = true

    }

    #spawn(){
        this.setActive(true)
        this.setVisible(true)
        this.#shipEngineSprite.setVisible(true)
        this.#shipEngineThrusterSprite.setVisible(true)
        this.#shipSprite.setTexture('ship', 0);
        this.#healthComponent.reset();
        this.setPosition(this.scene.scale.width / 2, this.scene.scale.height - 32)
        this.#keyboardInputComponent.lockInput = false
    }
}