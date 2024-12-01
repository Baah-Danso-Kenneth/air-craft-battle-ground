export class InputComponent {
    /** @protected @type {boolean} */
    _up;
    /** @protected @type {boolean} */
    _down;
    /** @protected @type {boolean} */
    _left;
    /** @protected @type {boolean} */
    _right;
    /** @protected @type {boolean} */
    _shoot;
  
    constructor() {
      this.reset();
    }
  
    /** @type {boolean} */
    get leftIsDown() {
      return this._left;
    }
  
    /** @type {boolean} */
    get rightIsDown() {
      return this._right;
    }
  
    /** @type {boolean} */
    get downIsDown() {
      return this._down;
    }
  
    /** @type {boolean} */
    get upIsDown() {
      return this._up;
    }
  
    /** @type {boolean} */
    get shootIsDown() {
      return this._shoot;
    }
  
    /**
     * Resets all of the inputs back to their default values `false`.
     * @returns {void}
     */
    reset() {
      this._up = false;
      this._down = false;
      this._right = false;
      this._left = false;
      this._shoot = false;
    }
  }