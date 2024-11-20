import { SCENE_KEYS } from "../components/keys/scene-keys";
import { GAME_IMAGES } from "../components/keys/image-keys";
import { MENU_TEXT_STYLE, WELCOME_TEXT_STYLE } from "../components/shared/font-style";
import { NineSlice } from "../lib/nine-slice";

export class WelcomeScene extends Phaser.Scene{
   #nineSliceMenu: any
   constructor(){
    super({key: SCENE_KEYS.WELCOME_SCENE})
   }

   init(){
      this.#nineSliceMenu = new NineSlice({
         cornerCutSize: 32,
         textureManager: this.sys.textures,
         assetKey: GAME_IMAGES.TRANSPARENT_GLASS_CONTAINER_IMAGE
      })
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

      const menuBgWidth = 300;

      const menuBgContainer = this.#nineSliceMenu.createNineSliceContainer(this, menuBgWidth, 200)
      const newGameText = this.add.text(menuBgWidth / 2, 40, 'New Game', MENU_TEXT_STYLE).setOrigin(0.5);
      const continueGameText = this.add.text(menuBgWidth / 2, 90, 'Continue', MENU_TEXT_STYLE).setOrigin(0.5);

      const optionGameText = this.add.text(menuBgWidth / 2, 140, 'Options', MENU_TEXT_STYLE).setOrigin(0.5);
  
      const menuContainer = this.add.container(0, 0, [menuBgContainer, newGameText, continueGameText, optionGameText]);
      menuContainer.setPosition(this.scale.width / 2 - menuBgWidth / 2, 350);

   }

   update(){

   }
}