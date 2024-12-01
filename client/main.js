import Phaser from "phaser";
import { GameScene } from "./src/scenes/game-scene";
import { PreloadScene } from "./src/scenes/preload-scene";
import { BootScene } from "./src/scenes/boot-scene";



const game = new Phaser.Game({
    type: Phaser.CANVAS,
    roundPixels: true,
    pixelArt: true,
    scale: {
      parent: 'game-container',
      width: 450,
      height: 640,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      mode: Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
    },
    backgroundColor: '#000000',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0, x: 0 },
        debug: false,
      },
    },
  });
  
  game.scene.add('BootScene', BootScene);
  game.scene.add('PreloadScene', PreloadScene);
  game.scene.add('GameScene', GameScene);
  game.scene.start('BootScene');


