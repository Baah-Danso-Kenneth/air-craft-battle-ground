import { KENNEY_FUTURE_NARROW, POLTWASKI_FONT } from "./font-keys";


export const  WELCOME_TEXT_STYLE= Object.freeze({

    fontFamily:POLTWASKI_FONT,
    fontSize:'40px',
    fill: '#ffffff',
    align: 'center',
    shadow: {
      offsetX: 3,
      offsetY: 3,
      color: '#000000',
      blur: 2,

      stroke: true,
      fill: true
    }
});

export const  OPTION_TEXT_STYLE= Object.freeze({

  fontFamily:KENNEY_FUTURE_NARROW,
  fontSize:'28px',
  fill: '#ffffff',
  align: 'center',
  shadow: {
    offsetX: 3,
    offsetY: 3,
    color: '#000000',
    blur: 2,

    stroke: true,
    fill: true
  }
});


export const  START_GAME_STYLE= Object.freeze({
  fontFamily:KENNEY_FUTURE_NARROW,
  fontSize:'20px',
  fill: '#ffffff',
  align: 'center',
  shadow: {
    offsetX: 3,
    offsetY: 3,
    color: '#000000',
    blur: 2,

    stroke: true,
    fill: true
  }
});