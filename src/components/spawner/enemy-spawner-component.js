export class EnemySpawnerComponent {
    /** @type {Phaser.Scene} */
    #scene;
    /** @type {number} */
    #spawnInterval;
    /** @type {number} */
    #spawnAt;
    /** @type {Phaser.GameObjects.Group} */
    #group;
    /** @type {boolean} */
    #disableSpawning;
    #eventBusComponent
  
    /**
     * @param {Phaser.Scene} scene
     * @param {Function} enemyClass
     * @param {object} spawnConfig
     * @param {number} spawnConfig.interval
     * @param {number} spawnConfig.spawnAt
     * @param {EventBusComponent} eventBusComponent
     */
    constructor(scene, enemyClass, spawnConfig, eventBusComponent) {
      this.#scene = scene;
      this.#eventBusComponent = eventBusComponent
      // create group
      this.#group = this.#scene.add.group({
        name: `${this.constructor.name}-${Phaser.Math.RND.uuid()}`,
        classType: enemyClass,
        runChildUpdate: true,
        createCallback: (enemy)=>{
            enemy.init(eventBusComponent);
        }

      });
  
      this.#spawnInterval = spawnConfig.interval;
      this.#spawnAt = spawnConfig.spawnAt;
      this.#disableSpawning = false;
  
      // handle automatic call to update
      this.#scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
      this.#scene.physics.world.on(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
      this.#scene.events.once(
        Phaser.Scenes.Events.DESTROY,
        () => {
          this.#scene.events.off(Phaser.Scenes.Events.UPDATE, this.update, this);
          this.#scene.physics.world.off(Phaser.Physics.Arcade.Events.WORLD_STEP, this.worldStep, this);
        },
        this
      );
    }
  
    /** @type {Phaser.GameObjects.Group} */
    get phaserGroup() {
      return this.#group;
    }
  
    /**
     * @param {DOMHighResTimeStamp} ts
     * @param {number} dt
     * @returns {void}
     */
    update(ts, dt) {
      if (this.#disableSpawning) {
        return;
      }
  
      this.#spawnAt -= dt;
      if (this.#spawnAt > 0) {
        return;
      }
  
      const x = Phaser.Math.RND.between(30, this.#scene.scale.width - 30);
      const enemy = this.#group.get(x, -20);
      enemy.reset();
      this.#spawnAt = this.#spawnInterval;
    }
  
    /**
     * @returns {void}
     */
    worldStep(delta) {
      /** @type {import('../../types/typedef.js').Enemy[]} */
      (this.#group.getChildren()).forEach((enemy) => {
        if (!enemy.active) {
          return;
        }
  
        if (enemy.y > this.#scene.scale.height + 50) {
          enemy.setActive(false);
          enemy.setVisible(false);
        }
      });
    }
  }