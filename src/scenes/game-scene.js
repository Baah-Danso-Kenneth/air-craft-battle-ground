export class GameScene extends Phaser.Scene{
    #background
    constructor(){
        super({key:'GameScene'})
    }
    
    create(){
        this.add.text(0,0,'Game Scene')
    }
}