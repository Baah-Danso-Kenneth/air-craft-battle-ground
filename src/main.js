import Phaser from "phaser";
import { PreloadScene } from "./scenes/preload";
import { NftScene } from "./scenes/nft-scene";
import { GameScene } from "./scenes/game-scene";
import { WelcomeScene } from "./scenes/welcome";



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
  

  game.scene.add('NftScene', NftScene)
  game.scene.add('GameScene', GameScene)
  game.scene.add('PreloadScene', PreloadScene)
  game.scene.add('WelcomeScene', WelcomeScene)
  game.scene.start('PreloadScene')