export class NftScene extends Phaser.Scene {
    constructor() {
        super({ key: 'NftScene' });
    }

    create() {
        const rows = 3; 
        const cols = 3; 
        const cellWidth = 100;
        const cellHeight = 100; 
        const cellPadding = 20; 

        const gridWidth = cols * (cellWidth + cellPadding) - cellPadding;
        const gridHeight = rows * (cellHeight + cellPadding) - cellPadding;

        const startX = (this.cameras.main.width - gridWidth) / 2;
        const startY = (this.cameras.main.height - gridHeight) / 2;

        const shipKeys = ['player_ship', 'player_ship1', 'player_ship2', 'player_ship3', 'player_ship4', 'player_ship5', 'player_ship6'];

        // Loop to create a 3x3 grid (but stop at 7 ships)
        let index = 0;
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (index >= shipKeys.length) {
                    break;
                }

                const x = startX + col * (cellWidth + cellPadding) + cellWidth / 2;
                const y = startY + row * (cellHeight + cellPadding) + cellHeight / 2;

                const cellBackground = this.add.rectangle(x, y, cellWidth, cellHeight, 0x0000ff); 
                cellBackground.setStrokeStyle(2, 0xffffff); 
                this.add.sprite(x, y, shipKeys[index]).setScale(0.2);

                index++; // Move to the next ship
            }
        }
    }
}
