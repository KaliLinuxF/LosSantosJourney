import { CharacterData } from "../../../shared/CharacterCreator/CharacterDataType"
import { Gender } from "../../../shared/CharacterCreator/types"

export type PersonData = {
    accountId: number,
    name: string,
    sex: Gender,
    static: string,
    characterData: CharacterData
}