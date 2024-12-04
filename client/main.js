import Phaser from "phaser";
import { BootScene } from "./src/scenes/boot-scene";
import { PreloadScene } from "./src/scenes/preload-scene";
import { GameScene } from "./src/scenes/game-scene";




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
  game.scene.add('BootScene', BootScene);
  game.scene.add('PreloadScene', PreloadScene);
  game.scene.add('GameScene', GameScene);
  game.scene.start('BootScene');


