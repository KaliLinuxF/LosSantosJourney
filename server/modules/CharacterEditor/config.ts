import { CharacterDataType } from "../../../shared/CharacterCreator/CharacterDataType";

export const characterConfig = {
    defaultMaleCharacter: {
        [CharacterDataType.Dna]: {
            shapeFirstId: 0, // 0..45
            shapeSecondId: 0, // 0..45
            skinFirstId: 0, // 0..45
            skinSecondId: 0, // 0..45
            shapeMix: 0, // -1..1
            skinMix: 0 // -1..1
        },
        [CharacterDataType.Hair]: {
            hairStyle: 1, // male: 1, 15, 70 | female: 1, 14, 36
            hairColor: 0,	// 0, 5, 14, 61, 62
            browsStyle: 0, // 0, 6, 9
            browsColor: 0, // 0, 5, 14, 61, 62
            chestStyle: 0, // male: 0, 1, 2 | female: 0
            chestColor: 0 // 0, 5, 14, 61, 62
        },
        [CharacterDataType.Face]: {
            noseWidth: 0, // -1..1
            noseHeight: 0, // -1..1 invert
            noseLength: 0, // -1..1 invert
            noseBridge: 0, // -1..1
            noseTip: 0, // -1..1 invert
            noseBridgeShift: 0, // -1..1 invert
            browHeight: 0, // -1..1 invert
            browWidth: 0, // -1..1
            jawWidth: 0, // -1..1
            jawHeight: 0, // -1..1 invert
            chinLength: 0, // -1..1
            chinPosition: 0, // -1..1
            chinWidth: 0, // -1..1
            chinShape: 0, // -1..1
            lips: 0, // -1..1 invert
            cheeksWidth: 0, // -1..1 invert
            cheekboneHeight: 0, // -1..1 invert
            cheekboneWidth: 0, // -1..1
            eyes: 0 // -1..1 invert
        },
        [CharacterDataType.Body]: {
            ageing: { value: 0, saturation: 1.0 }, // 0..14
            blemishes: { value: 0, saturation: 1.0 }, // 0..23
            bodyBlemishes: { value: 0, saturation: 1.0 }, // 0..11
            sunDamage: { value: 0, saturation: 1.0 }, // 0..10
            moles: { value: 0, saturation: 1.0 } // 0..17
        },
        [CharacterDataType.Clothes]: {
            topData: {
                top: 23, // male: 14, 9, 17 | female: 23, 395, 5
                torso: 1 // male: 1, 0, 2 | female: 0, 0, 4
            },
            legs: 14, // male: 14, 7, 0 | female: 1, 4, 8
            shoes: 1 // male: 1, 5, 6 | female: 3, 5, 0
        },
    },
    defaultFemaleCharacter: {
        [CharacterDataType.Dna]: {
            shapeFirstId: 0, // 0..45
            shapeSecondId: 0, // 0..45
            skinFirstId: 0, // 0..45
            skinSecondId: 0, // 0..45
            shapeMix: 0, // -1..1
            skinMix: 0 // -1..1
        },
        [CharacterDataType.Hair]: {
            hairStyle: 1, // male: 1, 15, 70 | female: 1, 14, 36
            hairColor: 0,	// 0, 5, 14, 61, 62
            browsStyle: 0, // 0, 6, 9
            browsColor: 0, // 0, 5, 14, 61, 62
            chestStyle: 0, // male: 0, 1, 2 | female: 0
            chestColor: 0 // 0, 5, 14, 61, 62
        },
        [CharacterDataType.Face]: {
            noseWidth: 0, // -1..1
            noseHeight: 0, // -1..1 invert
            noseLength: 0, // -1..1 invert
            noseBridge: 0, // -1..1
            noseTip: 0, // -1..1 invert
            noseBridgeShift: 0, // -1..1 invert
            browHeight: 0, // -1..1 invert
            browWidth: 0, // -1..1
            jawWidth: 0, // -1..1
            jawHeight: 0, // -1..1 invert
            chinLength: 0, // -1..1
            chinPosition: 0, // -1..1
            chinWidth: 0, // -1..1
            chinShape: 0, // -1..1
            lips: 0, // -1..1 invert
            cheeksWidth: 0, // -1..1 invert
            cheekboneHeight: 0, // -1..1 invert
            cheekboneWidth: 0, // -1..1
            eyes: 0 // -1..1 invert
        },
        [CharacterDataType.Body]: {
            ageing: { value: 0, saturation: 1.0 }, // 0..14
            blemishes: { value: 0, saturation: 1.0 }, // 0..23
            bodyBlemishes: { value: 0, saturation: 1.0 }, // 0..11
            sunDamage: { value: 0, saturation: 1.0 }, // 0..10
            moles: { value: 0, saturation: 1.0 } // 0..17
        },
        [CharacterDataType.Clothes]: {
            topData: {
                top: 23, // male: 14, 9, 17 | female: 23, 395, 5
                torso: 0 // male: 1, 0, 2 | female: 0, 0, 4
            },
            legs: 1, // male: 14, 7, 0 | female: 1, 4, 8
            shoes: 3 // male: 1, 5, 6 | female: 3, 5, 0
        },
    },
}