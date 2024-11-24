import { SCENE_KEYS } from "../../components/keys/scene-keys";
import { GAME_IMAGES } from "../../components/keys/image-keys";
import { Background } from "../../utils/background";

export class FirstStage extends Phaser.Scene {
  private background: Background | null = null;

  constructor() {
    super({ key: SCENE_KEYS.FIRST_STAGE });
  }


  create(): void {
    console.log(`${FirstStage.name} initialized`)
    this.background = new Background(this);
    this.background.showBackground(GAME_IMAGES.STAGE_ONE);

    const ship1 = this.add.image(120, Number(this.game.config.height) / 2, GAME_IMAGES.PLAYER_SHIP).setScale(0.1)
    
  }


  update(_time: number): void {
      if(this.background){
        this.background.moveBackground(_time=1);
      }
  }
}
