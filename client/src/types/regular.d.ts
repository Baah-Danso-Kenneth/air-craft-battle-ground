import Phaser from "phaser";

export interface NineSliceTypes{
    cornerCutSize: number;
    assetKey: string;
    textureManager: Phaser.Textures.TextureManager
}

export interface TextureFrames {
    [key: string]: Phaser.Textures.Frame; 
    __BASE: Phaser.Textures.Frame;
  }