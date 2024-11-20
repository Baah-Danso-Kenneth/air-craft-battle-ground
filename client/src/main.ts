import Phaser from "phaser";
import { SCENE_KEYS } from "./components/keys/scene-keys";
import { WelcomeScene } from "./scenes/welcome-scene";
import { PreloadScene } from "./scenes/preload-scene";
import "./style.css";
import { FirstStage } from "./scenes/stages/first-stage";
import { OPtionScene } from "./scenes/option-scene";

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  scale:{
      parent:'game-container',
      width: 1024,
      height: 576,
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
  },
  pixelArt: false,
  backgroundColor: '#000000',
  physics:{
    default: 'arcade',
    arcade: {
      gravity: {y:0, x: 0},
      debug: false
    }

},
});

game.scene.add(SCENE_KEYS.WELCOME_SCENE, WelcomeScene)
game.scene.add(SCENE_KEYS.PRE_LOAD_SCENE, PreloadScene)
game.scene.add(SCENE_KEYS.FIRST_STAGE, FirstStage)
game.scene.add(SCENE_KEYS.OPTION_SCENE, OPtionScene)
game.scene.start(SCENE_KEYS.PRE_LOAD_SCENE)

