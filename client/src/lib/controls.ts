import { DIRECTION } from "../components/shared/exported-content";

export class Controls {
  #scene: Phaser.Scene;

  #cursorKeys: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
  #lockPlayerInput: boolean;
  #enterKey: Phaser.Input.Keyboard.Key | undefined;

  constructor(scene: Phaser.Scene) {
    this.#scene = scene;
    this.#cursorKeys = this.#scene.input.keyboard?.createCursorKeys();
    this.#enterKey = this.#scene.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.#lockPlayerInput = false;
  }

  get isInputLocked(): boolean {
    return this.#lockPlayerInput;
  }

  set lockInput(val: boolean) {
    this.#lockPlayerInput = val;
  }

  wasEnterKeyPressed(): boolean {
    if (this.#enterKey === undefined) {
      return false;
    }
    return Phaser.Input.Keyboard.JustDown(this.#enterKey);
  }

  wasSpaceKeyPressed(): boolean {
    if (this.#cursorKeys === undefined) {
      return false;
    }
    return Phaser.Input.Keyboard.JustDown(this.#cursorKeys.space);
  }

  wasBackKeyPressed(): boolean {
    if (this.#cursorKeys === undefined) {
      return false;
    }
    return Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift);
  }

  getDirectionKeyJustPressed(): DIRECTION {
    if (this.#cursorKeys === undefined) {
      return DIRECTION.NONE;
    }

    let selectedDirection: DIRECTION = DIRECTION.NONE;
    if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.left)) {
      selectedDirection = DIRECTION.LEFT;
    } else if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.right)) {
      selectedDirection = DIRECTION.RIGHT;
    } else if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.up)) {
      selectedDirection = DIRECTION.UP;
    } else if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.down)) {
      selectedDirection = DIRECTION.DOWN;
    }

    return selectedDirection;
  }

  getDirectionKeyPressedDown(): DIRECTION {
    if (this.#cursorKeys === undefined) {
      return DIRECTION.NONE;
    }

    let selectedDirection: DIRECTION = DIRECTION.NONE;
    if (this.#cursorKeys.left?.isDown) {
      selectedDirection = DIRECTION.LEFT;
    } else if (this.#cursorKeys.right?.isDown) {
      selectedDirection = DIRECTION.RIGHT;
    } else if (this.#cursorKeys.up?.isDown) {
      selectedDirection = DIRECTION.UP;
    } else if (this.#cursorKeys.down?.isDown) {
      selectedDirection = DIRECTION.DOWN;
    }

    return selectedDirection;
  }
}
