import Phaser from "phaser";
import { SCENE_KEYS } from "../components/keys/scene-keys";
import { GAME_IMAGES } from "../components/keys/image-keys";

// Path Tp Images
import DefaultImages from '/assets/images/background/default-purple-bg.png'
import GlobalImage from '/assets/images/other/global.png';




export class PreloadScene extends Phaser.Scene{
   constructor(){
    super({key: SCENE_KEYS.PRE_LOAD_SCENE})
   }

   preload(){
      this.load.image(GAME_IMAGES.DEFAULT_IMAGES, DefaultImages);
      this.load.image(GAME_IMAGES.GLOBE_IMAGES, GlobalImage)
   } 
   
   create(){
      this.scene.start(SCENE_KEYS.WELCOME_SCENE)
   }
}