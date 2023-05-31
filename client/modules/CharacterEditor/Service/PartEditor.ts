import { Gender } from "../../../../shared/CharacterCreator/types";

export abstract class PartEditor<T> {
    protected _data: T;
    private defaultMale: T;
    private defaultFamele: T;
    protected gender: Gender;
    protected player: PlayerMp;

    get data(): T {
        return this._data;
    }

    constructor(defaultMale: T, defaultFamele: T) {
        this.gender = Gender.Male;
        this.defaultMale = defaultMale;
        this.defaultFamele = defaultFamele;
        this._data = defaultMale;
        this.player = mp.players.local;
    }

    update(data: T) {
        this._data = {
            ...this._data,
            ...data
        }

        this.apply();
    }

    reset(): void {
        if(this.gender === Gender.Male) {
            this._data = this.defaultMale;
        } else {
            this._data = this.defaultFamele;
        }

        this.apply();
    }

    changeGender(gender: Gender) {
        if(this.gender === gender) {
            return
        }

        this.gender = gender;
        this.reset();
    }

    abstract apply(): void;
}