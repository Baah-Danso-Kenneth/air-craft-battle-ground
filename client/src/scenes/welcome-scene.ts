import { SCENE_KEYS } from "../components/keys/scene-keys";
import { GAME_IMAGES } from "../components/keys/image-keys";
import { MENU_TEXT_STYLE, WELCOME_TEXT_STYLE } from "../components/shared/font-style";
import { NineSlice } from "../lib/nine-slice";
import { DIRECTION, MAIN_MENU_OPTIONS, PLAYER_INPUT_CURSOR_POSITION } from "../components/shared/exported-content";
import { Controls } from "../lib/controls";

export class WelcomeScene extends Phaser.Scene{
   #nineSliceMenu:any
   #controls: any
   #mainMaenuCursorPhaserImageGameObject: any
   #selectedMenuOptions: any
   #isContinueButtonEnabled :any

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
      this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME
      this.#isContinueButtonEnabled = false;
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
      if(!this.#isContinueButtonEnabled){
         continueGameText.setAlpha(0.5);
      }

      const optionGameText = this.add.text(menuBgWidth / 2, 140, 'Options', MENU_TEXT_STYLE).setOrigin(0.5);
  
      const menuContainer = this.add.container(0, 0, [menuBgContainer, newGameText, continueGameText, optionGameText]);
      menuContainer.setPosition(this.scale.width / 2 - menuBgWidth / 2, 350);

     this.#mainMaenuCursorPhaserImageGameObject =  this.add.image(PLAYER_INPUT_CURSOR_POSITION.x,PLAYER_INPUT_CURSOR_POSITION.y, GAME_IMAGES.CURSOR_IMAGES).setOrigin(0.5).setScale(2.5);
     menuContainer.add(this.#mainMaenuCursorPhaserImageGameObject);


     this.tweens.add({
      delay: 0,
      duration: 500,
      repeat: -1,
      x: {
          from: PLAYER_INPUT_CURSOR_POSITION.x,
          start: PLAYER_INPUT_CURSOR_POSITION.x,
          to: PLAYER_INPUT_CURSOR_POSITION.x + 3,
      },
      targets: this.#mainMaenuCursorPhaserImageGameObject,
  });


  this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
   if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.NEW_GAME) {
       this.scene.start(SCENE_KEYS.FIRST_STAGE);
       return;
   }

   if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.OPTIONS) {
       this.scene.start(SCENE_KEYS.OPTION_SCENE);
       return;
   }
});


  this.#controls = new Controls(this);

   }

   update(){
      if(this.#controls.isInputLocked){
          return;
      }

      const wasSpaceKeyPressed = this.#controls.wasSpaceKeyPressed();

      if(wasSpaceKeyPressed){
          this.cameras.main.fadeOut(500, 0,0,0);
          this.#controls.lockInput=true;
          return;
      }

      const selectedDirection = this.#controls.getDirectionKeyJustPressed();
      if(selectedDirection !== DIRECTION.NONE){
          this.#moveMenuSelectCursor(selectedDirection)
      }
  }



   #moveMenuSelectCursor(direction: DIRECTION){
      this.#updateSelectedMenuOptionInput(direction)
      switch(this.#selectedMenuOptions){
          case MAIN_MENU_OPTIONS.NEW_GAME:
              this.#mainMaenuCursorPhaserImageGameObject.setY(PLAYER_INPUT_CURSOR_POSITION.y)
              break;
          case MAIN_MENU_OPTIONS.CONTINUE:
              this.#mainMaenuCursorPhaserImageGameObject.setY(91)
              break;
          case MAIN_MENU_OPTIONS.OPTIONS:
              this.#mainMaenuCursorPhaserImageGameObject.setY(141)
              break;
              default:
                  this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME
                  break;
      }
  }



   #updateSelectedMenuOptionInput(direction:DIRECTION) {
      switch(direction) {
          case DIRECTION.UP:
              if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.NEW_GAME) {
                  return;
              }
              if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.CONTINUE) {
                  this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME;
                  return;
              }
              if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.OPTIONS && !this.#isContinueButtonEnabled) {
                  this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME;
                  return;
              }
              this.#selectedMenuOptions = MAIN_MENU_OPTIONS.CONTINUE;
              return;
          case DIRECTION.DOWN:
              if(this.#selectedMenuOptions === MAIN_MENU_OPTIONS.OPTIONS){
                  return;
              }
              if(this.#selectedMenuOptions === MAIN_MENU_OPTIONS.CONTINUE){
                  this.#selectedMenuOptions = MAIN_MENU_OPTIONS.OPTIONS
                  return;
              }
              if (this.#selectedMenuOptions === MAIN_MENU_OPTIONS.NEW_GAME && !this.#isContinueButtonEnabled) {
                  this.#selectedMenuOptions = MAIN_MENU_OPTIONS.OPTIONS;
                  return;
              }
              this.#selectedMenuOptions = MAIN_MENU_OPTIONS.CONTINUE
              return;

          case DIRECTION.LEFT:
          case DIRECTION.RIGHT:
          case DIRECTION.NONE:
              return;
          default:
              this.#selectedMenuOptions = MAIN_MENU_OPTIONS.NEW_GAME
              break;
      }
   }

}