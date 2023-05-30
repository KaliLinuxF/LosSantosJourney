import {CharacterDataKeys, CharacterDataType} from "./CharacterDataType";
import {Gender} from "./types";

export enum CreateCharApiEventNames {
	UpdateCategory = 'createChar::updateCategory',
	UpdateData = 'createChar::updateData',
	UpdateGender = 'createChar::updateGender',
	Save = 'createChar::save',
}

export type CreateCharApiUpdateCategory = {
	categoryId: CharacterDataType
}

export type CreateCharApiUpdateData = {
	type: CharacterDataType
	data: {
		[key: string]: any
	}
}

export type CreateCharApiUpdateGender = {
	gender: Gender
}

export type CreateCharApiSave = {
	firstName: string
	lastName: string
}

export default {
	show: () => ({ type: "createChar/show" }),
	hide: () => ({ type: "createChar/hide" }),
};
