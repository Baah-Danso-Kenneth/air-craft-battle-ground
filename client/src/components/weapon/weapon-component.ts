export class WeaponComponent{
    #gameObject;
    #inputComponent;
    #bulletGroup
    #bulletConfig
    #fireInterval

    constructor(gameObject: any, inputComponent: any, bulletConfig: any){
        this.#gameObject = gameObject
        this.#inputComponent = inputComponent
        this.#bulletConfig = bulletConfig
        this.#fireInterval=0

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

    update(dt:any) {
        this.#fireInterval -= dt;

        if(this.#fireInterval > 0){
            return 
        }
        if (this.#inputComponent.shootIsDown) {
            const bullet = this.#bulletGroup.getFirstDead();
            if (bullet === undefined || bullet === null) {
                return; 
            }
    
      
            const y = this.#gameObject.y + this.#bulletConfig.yOffset;
            const x = this.#gameObject.x + this.#bulletConfig.xOffset;
            bullet.enableBody(true, x, y, true, true);
            bullet.body.velocity.x -= this.#bulletConfig.speed;
            bullet.setState(this.#bulletConfig.lifespan);
            bullet.play('bullet')
            
            bullet.setRotation(Phaser.Math.DegToRad(90)); 
            const body = bullet.body as Phaser.Physics.Arcade.Body;
            body.setVelocityX(300); 
            body.setVelocityY(0); 
            this.#fireInterval = this.#bulletConfig.interval;  
            bullet.setFlipX(this.#bulletConfig.flipX);
        }
    }


    
    worldStep(delta:any) {
      this.#bulletGroup.getChildren().forEach((bullet:any) => {
        if (!bullet.active) {
          return;
        }
  
        bullet.state -= delta;
        if (bullet.state <= 0) {
          bullet.disableBody(true, true);
        }
      });
    }
  



}

