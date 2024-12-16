import * as CONFIG from '../../../utils/config'


export class Lives extends Phaser.GameObjects.Container{
    #lives;
    #eventBusComponent;

    constructor(scene, eventBusComponent){
        super(scene, 5, scene.scale.height - 30, []);
        this.#eventBusComponent = eventBusComponent;
        this.#lives = CONFIG.PLAYER_LIVES;
        this.scene.add.existing(this)

        for(let i=0; i < this.#lives; i += 1){
            const ship = scene.add.image(i*20, 0, 'player_shippp').setScale(0.6).setOrigin(0)
            this.add(ship)
        }

        this.#eventBusComponent.on(CONFIG.CUSTOM_EVENTS.PLAYER_DESTROYED, ()=>{
            this.#lives -= 1;
            this.getAt(this.#lives).destroy();

            if(this.#lives > 0){
                scene.time.delayedCall(1500, ()=>{
                    this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.PLAYER_SPAWN);
                })
                return;
            }
            this.scene.add
            .text(this.scene.scale.width/2, 
                this.scene.scale.height /2,
                'GAME OVER',
                {fontSize: '24px'}
             ).setOrigin(0.5);
             this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.GAME_OVER);
        });
        this.#eventBusComponent.emit(CONFIG.CUSTOM_EVENTS.PLAYER_SPAWN);

    }
}