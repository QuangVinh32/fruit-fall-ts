export default class UIScene extends Phaser.Scene{    
    constructor() {
        super("UIScene");
    }

    preload(){

    }
    inti(){

    }
    create(){
        const score = this.add.text(10, 10, 'Score: 20', { fontSize: '15px Arial', color: 'black' });

    }
    update(){

    }


}