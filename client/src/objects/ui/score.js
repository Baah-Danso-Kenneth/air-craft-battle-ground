import * as CONFIG from '../../../../shared/config.js'


const ENEMY_SCORES = {
    ScoutEnemy: CONFIG.ENEMY_SCOUT_SCORE,
    FightEnemy: CONFIG.ENEMY_FIGHTER_SCORE
}

export class Score extends Phaser.GameObjects.Text{
    #score
    #eventBusComponent
    constructor(scene, eventBusComponent){
        super(scene, scene.scale.width/2, 20, '0',{
            fontSize:'24px',
            color: '#ff2f66'
        })

        this.scene.add.existing(this)
        this.#eventBusComponent = eventBusComponent;
        this.#score = 0;

        this.setOrigin(0.5);

        this.#eventBusComponent.on(CONFIG.CUSTOM_EVENTS.ENEMY_DESTROYED, (enemy)=>{
            this.#score += ENEMY_SCORES[enemy.constructor.name];
            this.setText(this.#score.toString(10))
        })
    }
}