import { AccountData } from "./AccountData";

export class Account {
    private readonly _id: number;
    private readonly _player: PlayerMp;
    private _data: AccountData;

    get id(): number {
        return this._id;
    }

    get player(): PlayerMp {
        return this._player;
    }

    get data(): AccountData {
        return this._data;
    }

    constructor(id: number, player: PlayerMp, data: AccountData) {
        this._id = id;
        this._player = player;
        this._data = data;
    }
}