import Phaser from "phaser";
import { GAME_IMAGES } from "../components/keys/image-keys";

export class Background {
  #scene: Phaser.Scene;
  #backgroundTileSprite: Phaser.GameObjects.TileSprite;

  constructor(scene: Phaser.Scene, initialKey: string = GAME_IMAGES.CURSOR_IMAGES) {
    this.#scene = scene;

    this.#backgroundTileSprite = this.#scene.add
      .tileSprite(
        0,
        0,
        this.#scene.scale.width,
        this.#scene.scale.height,
        initialKey
      )
      .setOrigin(0)
  }

  showBackground(key: string): void {
    this.#backgroundTileSprite.setTexture(key).setAlpha(1); // Make visible
  }

  hideBackground(): void {
    this.#backgroundTileSprite.setAlpha(0); // Make invisible
  }

  moveBackground(speedX: number = 0): void {
    if (this.#backgroundTileSprite) {
      this.#backgroundTileSprite.tilePositionX += speedX;
    }
  }
}
