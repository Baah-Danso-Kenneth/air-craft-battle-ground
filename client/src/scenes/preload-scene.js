import * as WebFontLoader from '../../lib/webfontloader.js'
import { KENNEY_FUTURE_NARROW, POLTWASKI_FONT } from '../objects/content/font-keys.js';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.pack('asset_pack', 'assets/data/assets.json');

    WebFontLoader.default.load({
      custom: {
          families: [KENNEY_FUTURE_NARROW, POLTWASKI_FONT]
      },
      active: ()=>{
          console.log('font ready')
      }
  })

  }

  create() {
    this.#createAnimations();
    this.scene.start('WelcomeScene');
  }

  #createAnimations() {
    const data = this.cache.json.get('animations_json');
    data.forEach((animation) => {
      const frames = animation.frames
        ? this.anims.generateFrameNumbers(animation.assetKey, { frames: animation.frames })
        : this.anims.generateFrameNumbers(animation.assetKey);
      this.anims.create({
        key: animation.key,
        frames: frames,
        frameRate: animation.frameRate,
        repeat: animation.repeat,
      });
    });
  }
}