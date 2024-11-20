import Phaser from "phaser";
import { SCENE_KEYS } from "../components/keys/scene-keys";
import { GAME_IMAGES } from "../components/keys/image-keys";

// Path Tp Images
import DefaultImages from '/assets/images/background/default-purple-bg.png'
import GlobalImage from '/assets/images/other/global.png';
import TransparentGlassImage from '/assets/images/other/glassPanel_green.png';
import CursorImage from '/assets/images/other/cursor_white.png';

import StageOneImage from '/assets/images/background/green-fusion.png';

import * as WebFontLoader from '../lib/webfontLoader.ts';
import { KENNEY_FUTURE_NARROW, POLTWASKI_FONT } from "../components/shared/font-style";





export class PreloadScene extends Phaser.Scene{
   constructor(){
    super({key: SCENE_KEYS.PRE_LOAD_SCENE})
   }

   preload(){
      this.load.image(GAME_IMAGES.DEFAULT_IMAGES, DefaultImages);
      this.load.image(GAME_IMAGES.GLOBE_IMAGES, GlobalImage)
      this.load.image(GAME_IMAGES.TRANSPARENT_GLASS_CONTAINER_IMAGE, TransparentGlassImage)
      this.load.image(GAME_IMAGES.CURSOR_IMAGES, CursorImage)
      this.load.image(GAME_IMAGES.STAGE_ONE,  StageOneImage)
      console.log(`${PreloadScene.name} : preloaded`)


      WebFontLoader.default.load({
         custom: {
             families: [KENNEY_FUTURE_NARROW, POLTWASKI_FONT]
         },
         active: ()=>{
             console.log('font ready')
         }
     })

   } 
   
   create(){
      this.scene.start(SCENE_KEYS.WELCOME_SCENE)
   }
}