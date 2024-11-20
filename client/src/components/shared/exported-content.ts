export const ASSET_CUT_FRAMES = Object.freeze({
    TL: 'TL',
    TM: 'TM',
    TR: 'TR',
    ML: 'ML',
    MM: 'MM',
    MR: 'MR',
    BL: 'BL',
    BM: 'BM',
    BR: 'BR',
  });




export const DIRECTION = Object.freeze({
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
  DOWN: 'DOWN',
  UP: 'UP',
  NONE: 'NONE'
} as const);  

export type DIRECTION = keyof typeof DIRECTION;  


export const PLAYER_INPUT_CURSOR_POSITION = Object.freeze({
  x:50,
  y:41
});

export const MAIN_MENU_OPTIONS = Object.freeze({
  NEW_GAME:'NEW_GAME',
  CONTINUE:'CONTINUE',
  OPTIONS: 'OPTIONS'
})

