import FruitDTO from "../DTOs/FruitDTO";
import FruitTypeDTO from "../DTOs/FruitTypeDTO";

export default class FruitView extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;
    public fruitData: FruitDTO;
    private fruitType: FruitTypeDTO;

    private fruit: Phaser.Physics.Arcade.Image;

    constructor(scene: Phaser.Scene, fruitData: FruitDTO, fruitType: FruitTypeDTO) {
        super(scene);
        this.fruitData = fruitData;
        this.scene.add.existing(this);
        this.createFruit(fruitType);
    }

    createFruit(fruitType: FruitTypeDTO) {
        this.fruit = this.scene.physics.add.image(
            this.fruitData.positionX,
            this.fruitData.positionY,
            fruitType.texture  
        )
        .setDisplaySize(this.fruitData.width, this.fruitData.height)
        .setOrigin(0.5, 0.5)
        // .setGravityY(300);  

        this.add(this.fruit);
    }
}
