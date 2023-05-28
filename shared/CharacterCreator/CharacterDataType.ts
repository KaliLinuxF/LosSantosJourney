export enum CharacterDataType {
	Dna,
	Hair,
	Face,
	Body,
	Clothes
}

export type CharacterData = {
	[CharacterDataType.Dna]: {
		shapeFirstId: number // 0..45
		shapeSecondId: number // 0..45
		skinFirstId: number // 0..45
		skinSecondId: number // 0..45
		shapeMix: number // -1..1
		skinMix: number // -1..1
	},
	[CharacterDataType.Hair]: {
		hairStyle: number // male: 1, 15, 70 | female: 1, 14, 36
		hairColor: number	// 0, 5, 14, 61, 62
		browsStyle: number // 0, 6, 9
		browsColor: number // 0, 5, 14, 61, 62
		chestStyle: number // male: 0, 1, 2 | female: 0
		chestColor: number // 0, 5, 14, 61, 62
	},
	[CharacterDataType.Face]: {
		noseWidth: number // -1..1
		noseHeight: number // -1..1 invert
		noseLength: number // -1..1 invert
		noseBridge: number // -1..1
		noseTip: number // -1..1 invert
		noseBridgeShift: number // -1..1 invert
		browHeight: number // -1..1 invert
		browWidth: number // -1..1
		jawWidth: number // -1..1
		jawHeight: number // -1..1 invert
		chinLength: number // -1..1
		chinPosition: number // -1..1
		chinWidth: number // -1..1
		chinShape: number // -1..1
		lips: number // -1..1 invert
		cheeksWidth: number // -1..1 invert
		cheekboneHeight: number // -1..1 invert
		cheekboneWidth: number // -1..1
		eyes: number // -1..1 invert
	},
	[CharacterDataType.Body]: {
		ageing: number // 0..14
		blemishes: number // 0..23
		bodyBlemishes: number // 0..11
		sunDamage: number // 0..10
		moles: number // 0..17
	},
	[CharacterDataType.Clothes]: {
		topData: {
			top: number // male: 14, 9, 17 | female: 23, 395, 5
			torso: number // male: 1, 0, 2 | female: 0, 0, 4
		},
		legs: number // male: 14, 7, 0 | female: 1, 4, 8
		shoes: number // male: 1, 5, 6 | female: 3, 5, 0
	},
}

