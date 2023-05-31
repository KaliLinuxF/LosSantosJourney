import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {
	CharacterData,
	CharacterDataKeys,
	CharacterDataType
} from "../../../../shared/CharacterCreator/CharacterDataType";
import {SetDataItemActionPayload} from "./types";
import {Gender} from "../../../../shared/CharacterCreator/types";

import {
	CreateCharApiEventNames,
	CreateCharApiUpdateCategory,
	CreateCharApiUpdateData,
} from "../../../../shared/CharacterCreator/api";
import rpc from "../../../../shared/rpc";
import {getRandomInt} from "../../utils/getRandomInt";
import {getRandomFloat} from "../../utils/getRandomFloat";
import {Data} from "./data";

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
		[CharacterDataKeys.facialHair]: 0, // male: 0, 1, 2 | female: 0
		[CharacterDataKeys.facialColor]: 0, // 0, 5, 14, 61, 62
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
			value: -1,
			saturation: 1,
		},
		[CharacterDataKeys.blemishes]: {
			value: -1,
			saturation: 1,
		},
		[CharacterDataKeys.bodyBlemishes]: {
			value: -1,
			saturation: 1,
		},
		[CharacterDataKeys.sunDamage]: {
			value: -1,
			saturation: 1,
		},
		[CharacterDataKeys.moles]: {
			value: -1,
			saturation: 1,
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
	categoryId: CharacterDataType.Dna,
}

export const createCharSlice = createSlice({
	name: 'createChar',
	initialState,
	reducers: {
		show(state) {
			state.gender = Gender.Male
			state.data = {...initialData}
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
			const event = CreateCharApiEventNames.UpdateCategory
			const data: CreateCharApiUpdateCategory = {
				categoryId: action.payload
			}
			rpc.callClient(event, data)
		},
		setDataItem(state, action: PayloadAction<SetDataItemActionPayload>) {
			const {category, key, value} = action.payload
			// @ts-ignore
			state.data[category][key] = value
		},
		resetData(state) {
			state.data = {...initialData}
			state.categoryId = CharacterDataType.Dna
			const event = CreateCharApiEventNames.UpdateCategory
			const data: CreateCharApiUpdateCategory = {
				categoryId: state.categoryId
			}
			rpc.callClient(event, data)
		},

		randomDataCategory(state, action: PayloadAction<CharacterDataType>) {
			const categoryId = action.payload
			switch (categoryId) {
				case CharacterDataType.Dna: {
					const firstId = getRandomInt(0, 45)
					const secondId = getRandomInt(0, 45)
					state.data[CharacterDataType.Dna] = {
						[CharacterDataKeys.shapeFirstId]: firstId,
						[CharacterDataKeys.shapeSecondId]: secondId,
						[CharacterDataKeys.skinFirstId]: firstId,
						[CharacterDataKeys.skinSecondId]: secondId,
						[CharacterDataKeys.shapeMix]: getRandomFloat(-1, 1),
						[CharacterDataKeys.skinMix]: getRandomFloat(-1, 1),
					}
					const event = CreateCharApiEventNames.UpdateData
					const data: CreateCharApiUpdateData = {
						type: categoryId,
						data: state.data[categoryId],
					}
					rpc.callClient(event, data)
					break
				}

				case CharacterDataType.Hair: {
					state.data[categoryId] = {
						[CharacterDataKeys.hairStyle]: getRandomInt(0, 3),
						[CharacterDataKeys.hairColor]: getRandomInt(0, 4),
						[CharacterDataKeys.browsStyle]: getRandomInt(0, 3),
						[CharacterDataKeys.browsColor]: getRandomInt(0, 4),
						[CharacterDataKeys.facialHair]: state.gender === Gender.Male ? getRandomInt(-1, 2) : 0,
						[CharacterDataKeys.facialColor]: getRandomInt(0, 4),
					}

					const event = CreateCharApiEventNames.UpdateData
					const data: CreateCharApiUpdateData = {
						type: categoryId,
						data: {
							// @ts-ignore
							[CharacterDataKeys.hairStyle]: Data[CharacterDataKeys.hairStyle][state.gender][state.data[CharacterDataType.Hair][CharacterDataKeys.hairStyle]],
							// @ts-ignore
							[CharacterDataKeys.hairColor]: Data[CharacterDataKeys.hairColor][state.gender][state.data[CharacterDataType.Hair][CharacterDataKeys.hairColor]],
							// @ts-ignore
							[CharacterDataKeys.browsStyle]: Data[CharacterDataKeys.browsStyle][state.gender][state.data[CharacterDataType.Hair][CharacterDataKeys.browsStyle]],
							// @ts-ignore
							[CharacterDataKeys.browsColor]: Data[CharacterDataKeys.browsColor][state.gender][state.data[CharacterDataType.Hair][CharacterDataKeys.browsColor]],
							// @ts-ignore
							[CharacterDataKeys.facialHair]: state.gender === Gender.Male ? Data[CharacterDataKeys.facialHair][state.gender][state.data[CharacterDataType.Hair][CharacterDataKeys.facialColor]] : -1,
							// @ts-ignore
							[CharacterDataKeys.facialColor]: Data[CharacterDataKeys.facialColor][state.gender][state.data[CharacterDataType.Hair][CharacterDataKeys.facialColor]],
						},
					}
					rpc.callClient(event, data)
					break
				}

				case CharacterDataType.Face: {
					state.data[categoryId] = {
						[CharacterDataKeys.noseWidth]: getRandomFloat(-1, 1),
						[CharacterDataKeys.noseHeight]: getRandomFloat(-1, 1),
						[CharacterDataKeys.noseLength]: getRandomFloat(-1, 1),
						[CharacterDataKeys.noseBridge]: getRandomFloat(-1, 1),
						[CharacterDataKeys.noseTip]: getRandomFloat(-1, 1),
						[CharacterDataKeys.noseBridgeShift]: getRandomFloat(-1, 1),
						[CharacterDataKeys.browHeight]: getRandomFloat(-1, 1),
						[CharacterDataKeys.browWidth]: getRandomFloat(-1, 1),
						[CharacterDataKeys.jawWidth]: getRandomFloat(-1, 1),
						[CharacterDataKeys.jawHeight]: getRandomFloat(-1, 1),
						[CharacterDataKeys.chinLength]: getRandomFloat(-1, 1),
						[CharacterDataKeys.chinPosition]: getRandomFloat(-1, 1),
						[CharacterDataKeys.chinWidth]: getRandomFloat(-1, 1),
						[CharacterDataKeys.chinShape]: getRandomFloat(-1, 1),
						[CharacterDataKeys.lips]: getRandomFloat(-1, 1),
						[CharacterDataKeys.cheeksWidth]: getRandomFloat(-1, 1),
						[CharacterDataKeys.cheekboneHeight]: getRandomFloat(-1, 1),
						[CharacterDataKeys.cheekboneWidth]: getRandomFloat(-1, 1),
						[CharacterDataKeys.eyes]: getRandomFloat(-1, 1),
					}
					const event = CreateCharApiEventNames.UpdateData
					const data: CreateCharApiUpdateData = {
						type: categoryId,
						data: state.data[categoryId],
					}
					rpc.callClient(event, data)
					break
				}

				case CharacterDataType.Body: {
					state.data[categoryId] = {
						[CharacterDataKeys.ageing]: {
							value: getRandomInt(-1, 14),
							saturation: getRandomFloat(0, 1),
						},
						[CharacterDataKeys.blemishes]: {
							value: getRandomInt(-1, 23),
							saturation: getRandomFloat(0, 1),
						},
						[CharacterDataKeys.bodyBlemishes]: {
							value: getRandomInt(-1, 11),
							saturation: getRandomFloat(0, 1),
						},
						[CharacterDataKeys.sunDamage]: {
							value: getRandomInt(-1, 10),
							saturation: getRandomFloat(0, 1),
						},
						[CharacterDataKeys.moles]: {
							value: getRandomInt(-1, 17),
							saturation: getRandomFloat(0, 1),
						},
					}
					const event = CreateCharApiEventNames.UpdateData
					const data: CreateCharApiUpdateData = {
						type: categoryId,
						data: state.data[categoryId],
					}
					rpc.callClient(event, data)
					break
					break
				}

				case CharacterDataType.Clothes: {
					const top = getRandomInt(0, 3)
					state.data[categoryId] = {
						[CharacterDataKeys.topData]: {
							top,
							torso: top,
						},
						[CharacterDataKeys.legs]: getRandomInt(0, 3),
						[CharacterDataKeys.shoes]: getRandomInt(0, 3),
					}
					const event = CreateCharApiEventNames.UpdateData
					const data: CreateCharApiUpdateData = {
						type: categoryId,
						data: {
							[CharacterDataKeys.topData]: {
								// @ts-ignore
								top: Data[CharacterDataKeys.topData].top[state.gender][state.data[CharacterDataType.Clothes][CharacterDataKeys.topData].top],
								// @ts-ignore
								torso: Data[CharacterDataKeys.topData].top[state.gender][state.data[CharacterDataType.Clothes][CharacterDataKeys.topData].top],
							},
							// @ts-ignore
							[CharacterDataKeys.legs]: Data[CharacterDataKeys.legs][state.gender][state.data[CharacterDataType.Clothes][CharacterDataKeys.legs]],
							// @ts-ignore
							[CharacterDataKeys.shoes]: Data[CharacterDataKeys.shoes][state.gender][state.data[CharacterDataType.Clothes][CharacterDataKeys.shoes]],
						},
					}
					rpc.callClient(event, data)
					break
				}
			}
		}
	},
})

export const createCharReducer = createCharSlice.reducer
export const createCharActions = createCharSlice.actions
