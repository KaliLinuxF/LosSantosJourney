import {CharacterDataKeys, CharacterDataType} from "../../../../shared/CharacterCreator/CharacterDataType";

export enum ButtonType {
	Light,
	Dark
}

export enum ButtonIcon {
	Arrow,
	Random,
}

export type SetDataItemActionPayload = {
	category: CharacterDataType
	key: CharacterDataKeys
	value: any
}
