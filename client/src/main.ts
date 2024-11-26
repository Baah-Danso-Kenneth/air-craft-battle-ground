import Phaser from "phaser";
import { GAME_SCENE_KEYS } from "./utils/scene-keys";
import { BootScene } from "./scenes/boot-scene";
import { PreloadScene } from "./scenes/preload-scene";
import { GameScene } from "./scenes/game-scene";
import { OptionScene } from "./scenes/option-scene";
import { WelcomeScene } from "./scenes/welcome-scene";

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
      debug: true
    }

},
});


game.scene.add(GAME_SCENE_KEYS.BOOT_SCENE, BootScene)
game.scene.add(GAME_SCENE_KEYS.PRELOAD_SCENE, PreloadScene)
game.scene.add(GAME_SCENE_KEYS.GAME_SCENE, GameScene)
game.scene.add(GAME_SCENE_KEYS.OPTION_SCENE, OptionScene)
game.scene.add(GAME_SCENE_KEYS.WELCOME_SCENE, WelcomeScene)
game.scene.start(GAME_SCENE_KEYS.BOOT_SCENE)



