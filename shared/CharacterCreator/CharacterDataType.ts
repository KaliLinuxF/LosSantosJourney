export enum CharacterDataType {
	Dna,
	Hair,
	Face,
	Body,
	Clothes
}

export enum CharacterDataKeys {
	shapeFirstId = 'shapeFirstId',
	shapeSecondId = 'shapeSecondId',
	skinFirstId = 'skinFirstId',
	skinSecondId = 'skinSecondId',
	shapeMix = 'shapeMix',
	skinMix = 'skinMix',
	hairStyle = 'hairStyle',
	hairColor = 'hairColor',
	browsStyle = 'browsStyle',
	browsColor = 'browsColor',
	chestStyle = 'chestStyle',
	chestColor = 'chestColor',
	noseWidth = 'noseWidth',
	noseHeight = 'noseHeight',
	noseLength = 'noseLength',
	noseBridge = 'noseBridge',
	noseTip = 'noseTip',
	noseBridgeShift = 'noseBridgeShift',
	browHeight = 'browHeight',
	browWidth = 'browWidth',
	jawWidth = 'jawWidth',
	jawHeight = 'jawHeight',
	chinLength = 'chinLength',
	chinPosition = 'chinPosition',
	chinWidth = 'chinWidth',
	chinShape = 'chinShape',
	lips = 'lips',
	cheeksWidth = 'cheeksWidth',
	cheekboneHeight = 'cheekboneHeight',
	cheekboneWidth = 'cheekboneWidth',
	eyes = 'eyes',
	ageing = 'ageing',
	blemishes = 'blemishes',
	bodyBlemishes = 'bodyBlemishes',
	sunDamage = 'sunDamage',
	moles = 'moles',
	topData = 'topData',
	legs = 'legs',
	shoes = 'shoes',
}

export type CharacterData = {
	[CharacterDataType.Dna]: {
		[CharacterDataKeys.shapeFirstId]: number // 0..45
		[CharacterDataKeys.shapeSecondId]: number // 0..45
		[CharacterDataKeys.skinFirstId]: number // 0..45
		[CharacterDataKeys.skinSecondId]: number // 0..45
		[CharacterDataKeys.shapeMix]: number // -1..1
		[CharacterDataKeys.skinMix]: number // -1..1
	},
	[CharacterDataType.Hair]: {
		[CharacterDataKeys.hairStyle]: number // male: 1, 15, 70 | female: 1, 14, 36
		[CharacterDataKeys.hairColor]: number	// 0, 5, 14, 61, 62
		[CharacterDataKeys.browsStyle]: number // 0, 6, 9
		[CharacterDataKeys.browsColor]: number // 0, 5, 14, 61, 62
		[CharacterDataKeys.chestStyle]: number // male: 0, 1, 2 | female: 0
	[CharacterDataKeys.chestColor]: number // 0, 5, 14, 61, 62
	},
	[CharacterDataType.Face]: {
		[CharacterDataKeys.noseWidth]: number // -1..1
		[CharacterDataKeys.noseHeight]: number // -1..1 invert
		[CharacterDataKeys.noseLength]: number // -1..1 invert
		[CharacterDataKeys.noseBridge]: number // -1..1
		[CharacterDataKeys.noseTip]: number // -1..1 invert
		[CharacterDataKeys.noseBridgeShift]: number // -1..1 invert
		[CharacterDataKeys.browHeight]: number // -1..1 invert
		[CharacterDataKeys.browWidth]: number // -1..1
		[CharacterDataKeys.jawWidth]: number // -1..1
		[CharacterDataKeys.jawHeight]: number // -1..1 invert
		[CharacterDataKeys.chinLength]: number // -1..1
		[CharacterDataKeys.chinPosition]: number // -1..1
		[CharacterDataKeys.chinWidth]: number // -1..1
		[CharacterDataKeys.chinShape]: number // -1..1
		[CharacterDataKeys.lips]: number // -1..1 invert
		[CharacterDataKeys.cheeksWidth]: number // -1..1 invert
		[CharacterDataKeys.cheekboneHeight]: number // -1..1 invert
		[CharacterDataKeys.cheekboneWidth]: number // -1..1
		[CharacterDataKeys.eyes]: number // -1..1 invert
	},
	[CharacterDataType.Body]: {
		[CharacterDataKeys.ageing]: {
			value: number // 0..14
			saturation: number // 0-1
		}
		[CharacterDataKeys.blemishes]: {
			value: number // 0..21
			saturation: number // 0-1
		}
		[CharacterDataKeys.bodyBlemishes]: {
			value: number // 0..11
			saturation: number // 0-1
		}
		[CharacterDataKeys.sunDamage]: {
			value: number // 0..10
			saturation: number // 0-1
		}
		[CharacterDataKeys.moles]: {
			value: number // 0..17
			saturation: number // 0-1
		}
	},
	[CharacterDataType.Clothes]: {
		[CharacterDataKeys.topData]: {
			top: number // male: 14, 9, 17 | female: 23, 395, 5
			torso: number // male: 1, 0, 2 | female: 0, 0, 4
		},
		[CharacterDataKeys.legs]: number // male: 14, 7, 0 | female: 1, 4, 8
		[CharacterDataKeys.shoes]: number // male: 1, 5, 6 | female: 3, 5, 0
	},
}