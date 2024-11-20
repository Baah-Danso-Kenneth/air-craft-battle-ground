import { SCENE_KEYS } from "../components/keys/scene-keys";
import { GAME_IMAGES } from "../components/keys/image-keys";
import { WELCOME_TEXT_STYLE } from "../components/shared/font-style";

export class WelcomeScene extends Phaser.Scene{
   constructor(){
    super({key: SCENE_KEYS.WELCOME_SCENE})
   }

   create(){
      this.add.image(0,0,GAME_IMAGES.DEFAULT_IMAGES).setOrigin(0,0)
      const title_msg= 'aircraft battle grounds'.toUpperCase();
      this.add.text(Number(220), 20, title_msg, WELCOME_TEXT_STYLE);

      const globeImage = this.add.image(Number(this.game.config.width) / 2, 200, GAME_IMAGES.GLOBE_IMAGES);
      globeImage.setScale(2,2)

      this.tweens.add({
         targets: globeImage,
         angle: -360,
         duration: 5000,
         repeat: -1,
         ease: 'Linear'
      });




      

   }

   update(){

   }
}