import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
	CharacterData,
	CharacterDataKeys,
	CharacterDataType
} from "../../../../shared/CharacterCreator/CharacterDataType";
import {SetDataItemActionPayload} from "./types";
import {Gender} from "../../../../shared/CharacterCreator/types";
import {act} from "react-dom/test-utils";

type CreateCharState = {
	isOpen: boolean
	gender: Gender
	data: CharacterData
	categoryId: CharacterDataType
}

const initialData: CharacterData = {
	[CharacterDataType.Dna]: {
		[CharacterDataKeys.shapeFirstId]: 0, // 0..45
		[CharacterDataKeys.shapeSecondId]: 0, // 0..45
		[CharacterDataKeys.skinFirstId]: 0, // 0..45
		[CharacterDataKeys.skinSecondId]: 0, // 0..45
		[CharacterDataKeys.shapeMix]: 0, // -1..1
		[CharacterDataKeys.skinMix]: 0, // -1..1
	},
	[CharacterDataType.Hair]: {
		[CharacterDataKeys.hairStyle]: 0, // male: 1, 15, 70 | female: 1, 14, 36
		[CharacterDataKeys.hairColor]: 0,	// 0, 5, 14, 61, 62
		[CharacterDataKeys.browsStyle]: 0, // 0, 6, 9
		[CharacterDataKeys.browsColor]: 0, // 0, 5, 14, 61, 62
		[CharacterDataKeys.chestStyle]: 0, // male: 0, 1, 2 | female: 0
		[CharacterDataKeys.chestColor]: 0, // 0, 5, 14, 61, 62
	},
	[CharacterDataType.Face]: {
		[CharacterDataKeys.noseWidth]: 0, // -1..1
		[CharacterDataKeys.noseHeight]: 0, // -1..1 invert
		[CharacterDataKeys.noseLength]: 0, // -1..1 invert
		[CharacterDataKeys.noseBridge]: 0, // -1..1
		[CharacterDataKeys.noseTip]: 0, // -1..1 invert
		[CharacterDataKeys.noseBridgeShift]: 0, // -1..1 invert
		[CharacterDataKeys.browHeight]: 0, // -1..1 invert
		[CharacterDataKeys.browWidth]: 0, // -1..1
		[CharacterDataKeys.jawWidth]: 0, // -1..1
		[CharacterDataKeys.jawHeight]: 0, // -1..1 invert
		[CharacterDataKeys.chinLength]: 0, // -1..1
		[CharacterDataKeys.chinPosition]: 0, // -1..1
		[CharacterDataKeys.chinWidth]: 0, // -1..1
		[CharacterDataKeys.chinShape]: 0, // -1..1
		[CharacterDataKeys.lips]: 0, // -1..1 invert
		[CharacterDataKeys.cheeksWidth]: 0, // -1..1 invert
		[CharacterDataKeys.cheekboneHeight]: 0, // -1..1 invert
		[CharacterDataKeys.cheekboneWidth]: 0, // -1..1
		[CharacterDataKeys.eyes]: 0, // -1..1 invert
	},
	[CharacterDataType.Body]: {
		[CharacterDataKeys.ageing]: {
			value: 0,
			saturation: 0,
		},
		[CharacterDataKeys.blemishes]: {
			value: 0,
			saturation: 0,
		},
		[CharacterDataKeys.bodyBlemishes]: {
			value: 0,
			saturation: 0,
		},
		[CharacterDataKeys.sunDamage]: {
			value: 0,
			saturation: 0,
		},
		[CharacterDataKeys.moles]: {
			value: 0,
			saturation: 0,
		},
	},
	[CharacterDataType.Clothes]: {
		[CharacterDataKeys.topData]: {
			top: 0, // male: 14, 9, 17 | female: 23, 395, 5
			torso: 0, // male: 1, 0, 2 | female: 0, 0, 4
		},
		[CharacterDataKeys.legs]: 0, // male: 14, 7, 0 | female: 1, 4, 8
		[CharacterDataKeys.shoes]: 0, // male: 1, 5, 6 | female: 3, 5, 0
	},
}

const initialState: CreateCharState = {
	isOpen: false,
	gender: Gender.Male,
	data: initialData,
	categoryId: CharacterDataType.Clothes,
}

export const createCharSlice = createSlice({
	name: 'createChar',
	initialState,
	reducers: {
		show(state) {
			state.gender = Gender.Male
			state.data = { ...initialData }
			state.isOpen = true
		},
		hide(state) {
			state.isOpen = false
		},
		setGender(state, action: PayloadAction<Gender>) {
			state.gender = action.payload
		},
		setCategoryId(state, action: PayloadAction<CharacterDataType>) {
			state.categoryId = action.payload
		},
		setDataItem(state, action: PayloadAction<SetDataItemActionPayload>) {
			const {category, key, value} = action.payload
			// @ts-ignore
			state.data[category][key] = value
		},
		resetData(state) {
			state.data = { ...initialData }
			// state.categoryId = CharacterDataType.Dna
		}
	},
})

export const createCharReducer = createCharSlice.reducer
export const createCharActions = createCharSlice.actions
