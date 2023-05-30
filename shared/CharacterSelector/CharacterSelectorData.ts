import { CharacterData } from "../CharacterCreator/CharacterDataType";
import { Gender } from "../CharacterCreator/types";

export type CharacterSelectorDataType = { 
    id: number;
    sex: Gender;
    name: string;
    static: string;
    bank: number;
    cash: number;
    lastLogin: string;
    characterData: CharacterData;
}