
    export default class PlayGameScene extends Phaser.Scene {
        constructor() {
            super("PlayGameScene");
        }
    
        preload() {
            this.load.image("button_start", "assets/Images/button_start.png");
        }
    
        create() {
            this.add.text(160, 380, 'Help the farmer catch the apples.', { fontSize: '25px Arial', color: 'black' });
            this.add.text(170, 420, 'Move your pointer to the left and right and he will follow.', { fontSize: '15px Arial', color: 'black' });
    
            let buttonStart = this.add.image(350, 300, 'button_start')
                .setDisplaySize(120, 120)
                .setOrigin(0.5, 0.5)
                .setInteractive(); 
    
            buttonStart.on('pointerdown', () => {
                console.log("Start button clicked");
                this.scene.launch('UIScene');
                this.scene.get('LevelScene').events.emit('enablePlayerMove');
                this.scene.stop('PlayGameScene');
            });
        }
    
        update() {}
    
    

}