import { CUSTOM_EVENTS } from "../../../../shared/config";

export class Score extends Phaser.GameObjects.Text {
    #score: number;
    #eventBusComponent: any;

    constructor(scene: any, eventBusComponent: any) {
        super(scene, scene.scale.width / 2, 20, '0', {
            fontSize: '24px',
            color: '#ff2f66',
        });

        this.scene.add.existing(this);
        this.#eventBusComponent = eventBusComponent;
        this.#score = 0;

        this.setOrigin(0.5);

        const ENEMY_SCORES: { [key in 'ScoutEnemy' | 'FighterEnemy']: number } = {
            ScoutEnemy: 100,
            FighterEnemy: 200,
        };

        this.#eventBusComponent.on(CUSTOM_EVENTS.ENEMY_DESTROYED, (enemy: any) => {
            const enemyType = enemy.constructor.name as keyof typeof ENEMY_SCORES;
            if (enemyType in ENEMY_SCORES) {
                this.#score += ENEMY_SCORES[enemyType];
                this.setText(this.#score.toString(10));
            }
        });
    }
}
