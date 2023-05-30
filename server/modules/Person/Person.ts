import { PersonData } from "./PersonData";

export class Person {
    private readonly _id: number;
    private readonly _player: PlayerMp;
    private _data: PersonData;

    get id(): number {
        return this._id;
    }

    get player(): PlayerMp {
        return this._player;
    }

    get data(): PersonData {
        return this._data;
    }

    constructor(id: number, player: PlayerMp, data: PersonData) {
        this._id = id;
        this._player = player;
        this._data = data;
    }
}