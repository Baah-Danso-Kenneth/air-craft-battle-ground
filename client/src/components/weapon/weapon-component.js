import * as CONFIG from '../../../../shared/config';


export class WeaponComponent{
    #gameObject;
    #inputComponent;
    #bulletGroup
    #bulletConfig
    #fireBulletInterval
    #eventBusComponent
    constructor(gameObject, inputComponent, bulletConfig, eventBusComponent){
        this.#gameObject = gameObject
        this.#inputComponent = inputComponent
        this.#bulletConfig = bulletConfig
        this.#eventBusComponent = eventBusComponent
        this.#fireBulletInterval = 0;

        this.#bulletGroup = this.#gameObject.scene.physics.add.group({
            name: `bullets-${Phaser.Math.RND.uuid()}`,
            enable: false,
          });
          this.#bulletGroup.createMultiple({
            key: 'bullet',
            quantity: this.#bulletConfig.maxCount,
            active: false,
            visible: false,
          });


          this.#gameObject.scene.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
          this.#gameObject.once(
            Phaser.GameObjects.Events.DESTROY,
            () => {
              this.#gameObject.scene.physics.world.off(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
            },
            this
          );
         
      
    }

    get bulletGroup() {
        return this.#bulletGroup;
      }

    update(dt) {
        this.#fireBulletInterval -= dt;
        if (this.#fireBulletInterval > 0) {
          return;
        }
    
        if (this.#inputComponent.shootIsDown) {
          const bullet = this.#bulletGroup.getFirstDead();
          if (bullet === undefined || bullet === null) {
            return;
          }
    
          const x = this.#gameObject.x;
          const y = this.#gameObject.y + this.#bulletConfig.yOffset;
          bullet.enableBody(true, x, y, true, true);
          bullet.body.velocity.y -= this.#bulletConfig.speed
          bullet.setState(this.#bulletConfig.lifeSpan)
          bullet.setFlipY(this.#bulletConfig.flipY)
          bullet.play('bullet')

          this.#fireBulletInterval = this.#bulletConfig.interval
          this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.SHIP_SHOOT)
          
        }
      }


      worldStep(delta) {
        this.#bulletGroup.getChildren().forEach((bullet) => {
          if (!bullet.active) {
            return;
          }
    
          bullet.state -= delta;
          if (bullet.state <= 0) {
            bullet.disableBody(true, true);
          }
        });
      }
    
      destroyBullet(bullet) {
        bullet.setState(0);
      }
}