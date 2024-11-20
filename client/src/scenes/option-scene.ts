import { SCENE_KEYS } from "../components/keys/scene-keys";



export class OPtionScene extends Phaser.Scene {


  constructor() {
    super({ key: SCENE_KEYS.OPTION_SCENE });
  }


  create(): void {
    this.add.text(100,100, 'Option Scene');
    
  }

}
