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
    
  }


  update(time: number): void {
      if(this.background){
        this.background.moveBackground(time=0.5);
      }
  }
}
