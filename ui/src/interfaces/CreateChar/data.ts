import {CharacterDataKeys} from "../../../../shared/CharacterCreator/CharacterDataType";
import {Gender} from "../../../../shared/CharacterCreator/types";

type GenderDataType = {
	[Gender.Male]: number[]
	[Gender.Female]: number[]
}

type DataType = {
	[CharacterDataKeys.hairStyle]: GenderDataType // male: 1, 15, 70 | female: 1, 14, 36
	[CharacterDataKeys.hairColor]: number[]	// 0, 5, 14, 61, 62
	[CharacterDataKeys.browsStyle]: number[] // 0, 6, 9
	[CharacterDataKeys.browsColor]: number[] // 0, 5, 14, 61, 62
	[CharacterDataKeys.facialHair]: GenderDataType // male: 0, 1, 2 | female: 0
	[CharacterDataKeys.facialColor]: number[] // 0, 5, 14, 61, 62
	[CharacterDataKeys.topData]: {
		top: GenderDataType // male: 14, 9, 17 | female: 23, 395, 5
		torso: GenderDataType // male: 1, 0, 2 | female: 0, 0, 4
	},
	[CharacterDataKeys.legs]: GenderDataType // male: 14, 7, 0 | female: 1, 4, 8
	[CharacterDataKeys.shoes]: GenderDataType // male: 1, 5, 6 | female: 3, 5, 0
}

const hairColors: number[] = [0, 5, 14, 61, 62]

export const Data: DataType = {
	[CharacterDataKeys.hairStyle]: {
		[Gender.Male]: [1, 15, 70],
		[Gender.Female]: [1, 14, 36],
	},
	[CharacterDataKeys.hairColor]: hairColors,
	[CharacterDataKeys.browsStyle]: [0, 6, 9],
	[CharacterDataKeys.browsColor]: hairColors,
	[CharacterDataKeys.facialHair]: {
		[Gender.Male]: [-1, 0, 1, 2],
		[Gender.Female]: [-1],
	},
	[CharacterDataKeys.facialColor]: [0, 5, 14, 61, 62],
	[CharacterDataKeys.topData]: {
		top: {
			[Gender.Male]: [15, 14, 9, 17],
			[Gender.Female]: [15, 23, 395, 5],
		},
		torso: {
			[Gender.Male]: [15, 23, 395, 5],
			[Gender.Female]: [15, 0, 0, 4],
		},
	},
	[CharacterDataKeys.legs]: {
		[Gender.Male]: [14, 7, 0],
		[Gender.Female]: [1, 4, 8],
	},
	[CharacterDataKeys.shoes]: {
		[Gender.Male]: [1, 5, 6],
		[Gender.Female]: [3, 5, 0],
	},
}
