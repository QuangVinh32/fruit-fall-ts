import QuestionDTO from "../DTOs/QuestionDTO";

export default class QuestionController {
    private questions: QuestionDTO[]; 

    constructor() {
        this.questions = [];
    }

    addPlayers(dto: QuestionDTO): void {
        this.questions.push(dto);
    }

    getAllPlayers(): QuestionDTO[] {
        return this.questions;
    }

    getPlayerById(levelId: number): QuestionDTO | undefined {
        return this.questions.find(question => question.levelId === levelId);
    }
}