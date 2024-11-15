import { Scene } from "phaser";
import PlayerDTO  from "../DTOs/PlayerDTO";

export default class PlayerView 
extends Phaser.GameObjects.Container 
{
    public scene: Phaser.Scene;
    public playerData: PlayerDTO;
    private player: Phaser.Physics.Arcade.Image; 

    constructor(scene: Phaser.Scene, playerData: PlayerDTO) {
        super(scene);
        this.playerData = playerData;
        this.scene.add.existing(this); 
        this.createPlayer();
    }

    createPlayer() {
        this.player = this.scene.physics.add.image(
            this.playerData.positionX,
            this.playerData.positionY,
            this.playerData.texture
        )
        .setDisplaySize(this.playerData.width, this.playerData.height)
        .setOrigin(0.5, 0.5)
        .setPosition(this.playerData.positionX,this.playerData.positionY)
        .setBounce(this.playerData.bounce)
        this.add(this.player);
    }


}
