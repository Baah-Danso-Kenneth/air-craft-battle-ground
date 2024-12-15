export class NftScene extends Phaser.Scene{
    #background
    constructor(){
        super({key:'NftScene'})
    }
    

    create(){
        this.add.text(0,0,'Nftscene')
    }
}