import FruitService from "../Service/FruitService";
import PlayerService from "../Service/PlayerService";

export default class LevelScene extends Phaser.Scene {
    private playerService: PlayerService | null;
    private fruitService: FruitService | null;
    private levelId: number;
    private fruitId: number;
    private playerView: any;
    private fruitView: any;
    private canMovePlayer: boolean; 

    constructor() {
        super("LevelScene");
        this.levelId = 1;
        this.fruitId = 3
        this.canMovePlayer = false;  


    }
    preload() {
        this.load.image("player", "assets/Images/player.png");
        this.load.image("apple","assets/Images/apple.png")
        this.load.image("cherry","assets/Images/cherry.png")
        this.load.image("kiwi","assets/Images/kiwi.png")
        this.load.image("lemon","assets/Images/lemon.png")
        this.load.image("lime","assets/Images/lime.png")
        this.load.image("mango","assets/Images/mango.png")
        this.load.image("orrange","assets/Images/orrange.png")
        this.load.image("peache","assets/Images/peache.png")
        this.load.image("pear","assets/Images/pear.png")

    }

    async create() {
       

        this.fruitService = new FruitService(this, "assets/Data/fruit.json");
        await this.fruitService.initialize(this.levelId);

        // const fruitDTO = this.fruitService.getFruitDTOById(this.fruitId);
        // console.log(fruitDTO)
        // if (fruitDTO) {
        //     this.fruitView = this.fruitService.getFruitViewById(this.fruitId);
        //     console.log(this.fruitView)
        //     this.fruitView.setPosition(0,0);
        // }

        this.playerService = new PlayerService(this, "assets/Data/player.json");
        await this.playerService.initialize(this.levelId);

        const playerDTO = this.playerService.getPlayerDTOById(this.levelId);
        if (playerDTO) {
            this.playerView = this.playerService.getPlayerViewById(this.levelId);
            this.playerView.setPosition(350,520)
        }

        this.events.on('enablePlayerMove', () => {
            this.canMovePlayer = true;
        });

        if (this.playerView) {
            this.input.on('pointermove', (pointer: any) => { 
                if (this.canMovePlayer) {
                    this.playerView.x = pointer.worldX;
                        this.playerView.y = 520;
                }
            });
        } 
;


    }

    
    update() {}
}


   
        