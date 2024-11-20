
import Phaser from 'phaser';
import { NineSliceTypes } from '../types/regular';
import { ASSET_CUT_FRAMES } from '../components/shared/exported-content';



export class NineSlice {
  #cornerCutSize: number;
  #assetKey: string;

  constructor(config: NineSliceTypes) {
    this.#cornerCutSize = config.cornerCutSize;
    this.#assetKey = config.assetKey;
    this.#createNineSliceTextures(config.textureManager, config.assetKey);
  }

  #createNineSliceTextures(textureManager: Phaser.Textures.TextureManager, assetKey: string) {
    const methodName = 'createNineSliceTextures';

    const texture = textureManager.get(assetKey);
    if (texture.key === '__MISSING') {
      console.warn(`[${NineSlice.name}:${methodName}] the provided texture asset key was not found`);
      return;
    }

    if (!(texture.frames as Record<string, Phaser.Textures.Frame>)['__BASE']) {
      console.warn(`[${NineSlice.name}:${methodName}] the provided texture asset key does not have a base texture`);
      return;
    }
    
    

    if (texture.getFrameNames(false).length !== 0) {
      console.debug(`[${NineSlice.name}:${methodName}] the provided texture asset key already has additional frames`);
      return;
    }


    const baseFrame = (texture.frames as Record<string, Phaser.Textures.Frame>)['__BASE'];


    // Start cutting frames from the texture.
    texture.add(ASSET_CUT_FRAMES.TL, 0, 0, 0, this.#cornerCutSize, this.#cornerCutSize);

    texture.add(
      ASSET_CUT_FRAMES.TM,
      0,
      this.#cornerCutSize,
      0,
      baseFrame.width - this.#cornerCutSize * 2,
      this.#cornerCutSize
    );

    texture.add(
      ASSET_CUT_FRAMES.TR,
      0,
      baseFrame.width - this.#cornerCutSize,
      0,
      this.#cornerCutSize,
      this.#cornerCutSize
    );

    texture.add(
      ASSET_CUT_FRAMES.ML,
      0,
      0,
      this.#cornerCutSize,
      this.#cornerCutSize,
      baseFrame.height - this.#cornerCutSize * 2
    );

    texture.add(
      ASSET_CUT_FRAMES.MM,
      0,
      this.#cornerCutSize,
      this.#cornerCutSize,
      baseFrame.width - this.#cornerCutSize * 2,
      baseFrame.height - this.#cornerCutSize * 2
    );

    texture.add(
      ASSET_CUT_FRAMES.MR,
      0,
      baseFrame.width - this.#cornerCutSize,
      this.#cornerCutSize,
      this.#cornerCutSize,
      baseFrame.height - this.#cornerCutSize * 2
    );

    texture.add(
      ASSET_CUT_FRAMES.BL,
      0,
      0,
      baseFrame.height - this.#cornerCutSize,
      this.#cornerCutSize,
      this.#cornerCutSize
    );

    texture.add(
      ASSET_CUT_FRAMES.BM,
      0,
      this.#cornerCutSize,
      baseFrame.height - this.#cornerCutSize,
      baseFrame.width - this.#cornerCutSize * 2,
      this.#cornerCutSize
    );

    texture.add(
      ASSET_CUT_FRAMES.BR,
      0,
      baseFrame.width - this.#cornerCutSize,
      baseFrame.height - this.#cornerCutSize,
      this.#cornerCutSize,
      this.#cornerCutSize
    );
  }

  createNineSliceContainer(scene: Phaser.Scene, targetWidth: number, targetHeight: number) {
    const tl = scene.add.image(0, 0, this.#assetKey, ASSET_CUT_FRAMES.TL).setOrigin(0);
    const tm = scene.add.image(tl.displayWidth, 0, this.#assetKey, ASSET_CUT_FRAMES.TM).setOrigin(0);
    tm.displayWidth = targetWidth - this.#cornerCutSize * 2;
    const tr = scene.add.image(tl.displayWidth + tm.displayWidth, 0, this.#assetKey, ASSET_CUT_FRAMES.TR).setOrigin(0);

    const ml = scene.add.image(0, tl.displayHeight, this.#assetKey, ASSET_CUT_FRAMES.ML).setOrigin(0);
    ml.displayHeight = targetHeight - this.#cornerCutSize * 2;
    const mm = scene.add.image(ml.displayWidth, ml.y, this.#assetKey, ASSET_CUT_FRAMES.MM).setOrigin(0);
    mm.displayHeight = targetHeight - this.#cornerCutSize * 2;
    mm.displayWidth = targetWidth - this.#cornerCutSize * 2;
    const mr = scene.add.image(ml.displayWidth + mm.displayWidth, ml.y, this.#assetKey, ASSET_CUT_FRAMES.MR).setOrigin(0);
    mr.displayHeight = mm.displayHeight;

    const bl = scene.add.image(0, tl.displayHeight + ml.displayHeight, this.#assetKey, ASSET_CUT_FRAMES.BL).setOrigin(0);
    const bm = scene.add.image(bl.displayWidth, bl.y, this.#assetKey, ASSET_CUT_FRAMES.BM).setOrigin(0);
    bm.displayWidth = tm.displayWidth;
    const br = scene.add.image(bl.displayWidth + bm.displayWidth, bl.y, this.#assetKey, ASSET_CUT_FRAMES.BR).setOrigin(0);

    return scene.add.container(0, 0, [tl, tm, tr, ml, mm, mr, bl, bm, br]);
  }
}
