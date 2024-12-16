import * as WebFontLoader from '../lib/webfontloader';
import { KENNEY_FUTURE_NARROW, POLTWASKI_FONT } from '../utils/config';
export class PreloadScene extends Phaser.Scene{

    constructor(){
        super({key:'PreloadScene'})
    }
    
    preload() {
        this.load.image('player_ship', '/assets/images/player_ship.png');
        this.load.image('star_bg_s3', '/assets/images/star-bg-s3.png');
        this.load.image('global', '/assets/images/global.png');
        this.load.image('cursor_white', '/assets/images/cursor_white.png');
        this.load.image('glassPanel', '/assets/images/glassPanel_green.png');
        this.load.image('purple_bg', '/assets/images/default_purple_bg.png');
        this.load.image('green_bg', '/assets/images/green_bg.png');
        this.load.image('attacker_1', '/assets/images/attacker_1.png');
        this.load.image('attack_ship2', '/assets/images/attack_ship2.png');
        
    
        this.load.spritesheet('scout_engine', '/assets/images/scout_engine.png',{
          frameWidth: 64, 
          frameHeight: 64,
        });
    
        this.load.spritesheet('bullet', '/assets/images/bullet.png',{
          frameWidth: 32, 
          frameHeight: 32,
        });
        
        this.load.spritesheet('flames_fire', '/assets/images/flames_fire.png', {
          frameWidth: 64, 
          frameHeight: 64, 
        });
    
        this.load.spritesheet('fighter_destroy', '/assets/images/fighter_destroy.png', {
          frameWidth: 64, 
          frameHeight: 64, 
        });
    
        this.load.spritesheet('player_shippp', '/assets/images/ship_sprite_fly.png', {
          frameWidth: 64, 
          frameHeight: 64, 
        });
    
        this.load.spritesheet('scout_destroy', '/assets/images/scout_destroy.png', {
          frameWidth: 32, 
          frameHeight: 32, 
        });

    
        this.load.audio('bg', '/assets/audio/bgMusic.wav');
        this.load.audio('shot1', '/assets/audio/shot_1.wav');
        this.load.audio('explosion', '/assets/audio/explosion.wav');
        this.load.audio('hit', '/assets/audio/hit.wav');


    WebFontLoader.default.load({
        custom: {
            families: [KENNEY_FUTURE_NARROW, POLTWASKI_FONT]
        },
        active: ()=>{
            console.log('font-ready')
        }
    })
    

      }
    
      create() {
        this.scene.start('WelcomeScene');
      }
}