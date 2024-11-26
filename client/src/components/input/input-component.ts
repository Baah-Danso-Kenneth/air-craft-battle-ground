export class InputComponent {
    _up?: boolean;
    _down?: boolean;
    _left?: boolean;
    _right?: boolean;
    _shoot?: boolean;

    constructor() {
        this.reset();
    }

    get leftIsDown() {
        return this._left ?? false;
    }

    get rightIsDown() {
        return this._right ?? false;
    }

    get upIsDown() {
        return this._up ?? false;
    }

    get downIsDown() {
        return this._down ?? false;
    }

    get shootIsDown(){
        return this._shoot ?? false
    }

    reset() {
        this._up = false;
        this._down = false;
        this._right = false;
        this._left = false;
        this._shoot = false;
    }
}
