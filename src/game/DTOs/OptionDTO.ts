export default class OpitionDTO{
    private _optionId: number;
    private _isAnswer: boolean;
    private _value: number;
    private _questionId: number;

	constructor(optionId: number, isAnswer: boolean, value: number, questionId: number) {
		this._optionId = optionId;
		this._isAnswer = isAnswer;
		this._value = value;
	}

    /**
     * Getter questionId
     * @return {number}
     */
	public get questionId(): number {
		return this._questionId;
	}

    /**
     * Setter questionId
     * @param {number} value
     */
	public set questionId(value: number) {
		this._questionId = value;
	}


    /**
     * Getter optionId
     * @return {number}
     */
	public get optionId(): number {
		return this._optionId;
	}

    /**
     * Getter isAnswer
     * @return {boolean}
     */
	public get isAnswer(): boolean {
		return this._isAnswer;
	}

    /**
     * Getter value
     * @return {number}
     */
	public get value(): number {
		return this._value;
	}

    /**
     * Setter optionId
     * @param {number} value
     */
	public set optionId(value: number) {
		this._optionId = value;
	}

    /**
     * Setter isAnswer
     * @param {boolean} value
     */
	public set isAnswer(value: boolean) {
		this._isAnswer = value;
	}

    /**
     * Setter value
     * @param {number} value
     */
	public set value(value: number) {
		this._value = value;
	}
    

}