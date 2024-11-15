import FruitDTO from "../DTOs/FruitDTO";
import FruitTypeDTO from "../DTOs/FruitTypeDTO";
import FruitView from "../View/FruitView";
import FruitTypeController from "../Controllers/FruitTypeController";
import FruitController from "../Controllers/FruitController";

export default class FruitService {
    private scene: Phaser.Scene;
    private jsonPath: string;
    private fruitViews: FruitView[] = [];
    private fruitDTOs: FruitDTO[] = [];
    private fruitTypes: FruitTypeDTO[] = [];
    private fruitTypeController: FruitTypeController;
    private fruitController: FruitController;

    constructor(scene: Phaser.Scene, jsonPath: string) {
        this.scene = scene;
        this.jsonPath = jsonPath;
        this.fruitTypeController = new FruitTypeController();
        this.fruitController = new FruitController();
    }

    private async loadData(): Promise<any> {
        try {
            const response = await fetch(this.jsonPath);
            if (!response.ok) {
                throw new Error(`Failed to load data from ${this.jsonPath}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Error loading fruit data:", error);
            throw error;
        }
    }

    private mapFruitTypes(data: any): void {
        if (Array.isArray(data.fruitTypes)) {
            this.fruitTypes = data.fruitTypes.map((typeData: any) => new FruitTypeDTO(typeData.fruitTypeId, typeData.name, typeData.texture));
            this.fruitTypes.forEach(fruitType => this.fruitTypeController.addFruitTypes(fruitType));
        } else {
            console.error("Invalid or missing fruitTypes data:", data.fruitTypes);
        }
    }

    private mapFruits(data: any, levelId?: number): FruitDTO[] {
        const fruits = Array.isArray(data.fruits) ? data.fruits : [];
        if (!fruits.length) {
            console.error("Invalid or missing fruits data:", data.fruits);
        }

        return fruits
            .filter((fruit: any) => (levelId ? fruit.levelId === levelId : true))
            .map((fruit: any) => new FruitDTO(
                fruit.fruitId, 
                fruit.positionX, 
                fruit.positionY, 
                fruit.width, 
                fruit.height, 
                fruit.fruitTypeId, 
                fruit.levelId
            ));
    }

    async initialize(levelId?: number): Promise<void> {
        try {
            const data = await this.loadData();
            this.mapFruitTypes(data);
            const fruits = this.mapFruits(data, levelId);
            fruits.forEach(dto => this.fruitController.addFruits(dto));
            fruits.forEach(dto => this.createFruitView(dto));
        } catch (error) {
            console.error("Failed to initialize fruit service:", error);
        }
    }

    private createFruitView(fruitData: FruitDTO): void {
        const fruitType = this.fruitTypeController.findFruitTypeById(fruitData.fruitTypeId);
        if (fruitType) {
            const fruitView = new FruitView(this.scene, fruitData, fruitType);
            this.fruitViews.push(fruitView);
        } else {
            console.warn(`FruitType for fruitId ${fruitData.fruitId} not found`);
        }
    }

    getAllFruitViews(): FruitView[] {
        return this.fruitViews;
    }

    getAllFruits(): FruitDTO[] {
        return this.fruitDTOs;
    }

    getFruitViewById(levelId: number): FruitView | undefined {
        return this.fruitViews.find(fruitView => fruitView.fruitData.levelId === levelId);
    }

    getFruitDTOById(levelId: number): FruitDTO | undefined {
        return this.fruitDTOs.find(fruit => fruit.levelId === levelId);
    }
}
