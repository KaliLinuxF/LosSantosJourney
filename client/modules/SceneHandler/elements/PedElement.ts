import { CharacterData, CharacterDataType } from "../../../../shared/CharacterCreator/CharacterDataType";
import { BodyType } from "../../CharacterEditor/Service/Types/BodyType";
import { ClothesType } from "../../CharacterEditor/Service/Types/ClothesType";
import { DnaType } from "../../CharacterEditor/Service/Types/DnaType";
import { FaceType } from "../../CharacterEditor/Service/Types/FaceType";
import { HairType } from "../../CharacterEditor/Service/Types/HairType";
import SceneElement from "./SceneElement";

interface PedElementOptions {
    position: Vector3Mp,
    rotation: Vector3Mp,
    scenarioName?: string,
    animation?: {
        dict: string,
        name: string
    },
    model: string,
    charData?: CharacterData
}

export default class PedElement extends SceneElement {
    public options: PedElementOptions;
    public ped: PedMp;

    constructor(options: PedElementOptions) {
        super();

        this.options = options;
    }

    create(dimension: number) {
        this.ped = mp.peds.new(mp.game.joaat(this.options.model), this.options.position, this.options.rotation.z, dimension);
    }

    async onLoad() {
        if (!mp.peds.exists(this.ped)) {
            return;
        }

        if(this.options.charData) {
            this.loadCharData(CharacterDataType.Dna, this.options.charData[CharacterDataType.Dna]);
            this.loadCharData(CharacterDataType.Face, this.options.charData[CharacterDataType.Face]);
            this.loadCharData(CharacterDataType.Hair, this.options.charData[CharacterDataType.Hair]);
            this.loadCharData(CharacterDataType.Clothes, this.options.charData[CharacterDataType.Clothes]);
            this.loadCharData(CharacterDataType.Body, this.options.charData[CharacterDataType.Body]);
            // Пишу коды, заливаю моды
        }

        if (this.options.animation) {
            mp.game.streaming.requestAnimDict(this.options.animation.dict);
            while (!mp.game.streaming.hasAnimDictLoaded(this.options.animation.dict)) {
                mp.game.streaming.requestAnimDict(this.options.animation.dict);
                await mp.game.waitAsync(10);
            }

            if (!mp.peds.exists(this.ped)) {
                return;
            }

            this.ped.taskPlayAnim(this.options.animation.dict, this.options.animation.name, 8.0, 1.0, -1, 1, 1.0, false, false, false);
        }

        if (this.options.scenarioName) {
            // @ts-ignore
            this.ped.taskStartScenarioInPlace(this.options.scenarioName, -1, true);
        }
    }

    loadCharData(charDataType: CharacterDataType, data: DnaType | FaceType | HairType | ClothesType | BodyType) {
        switch (charDataType) {
            case CharacterDataType.Dna: {
                const dnaData = data as DnaType;
                this.ped.setHeadBlendData(dnaData.shapeFirstId, dnaData.shapeSecondId, 0, dnaData.skinFirstId, dnaData.skinSecondId, 0, dnaData.shapeMix, dnaData.skinMix, 0.0, false);
                
                break;
            }
            case CharacterDataType.Face: {
                const faceData = data as FaceType;

                this.ped.setFaceFeature(0, faceData.noseWidth);
                this.ped.setFaceFeature(1, faceData.noseHeight);
                this.ped.setFaceFeature(2, faceData.noseLength);
                this.ped.setFaceFeature(3, faceData.noseBridge);
                this.ped.setFaceFeature(4, faceData.noseTip);
                this.ped.setFaceFeature(5, faceData.noseBridgeShift);
                this.ped.setFaceFeature(6, faceData.browHeight);
                this.ped.setFaceFeature(7, faceData.browWidth);
                this.ped.setFaceFeature(8, faceData.cheekboneHeight);
                this.ped.setFaceFeature(9, faceData.cheekboneWidth);
                this.ped.setFaceFeature(10, faceData.cheeksWidth);
                this.ped.setFaceFeature(11, faceData.eyes);
                this.ped.setFaceFeature(12, faceData.lips);
                this.ped.setFaceFeature(13, faceData.jawWidth);
                this.ped.setFaceFeature(14, faceData.jawHeight);
                this.ped.setFaceFeature(15, faceData.chinLength);
                this.ped.setFaceFeature(16, faceData.chinPosition);
                this.ped.setFaceFeature(17, faceData.chinWidth);
                this.ped.setFaceFeature(18, faceData.chinShape);

                break;
            }
            case CharacterDataType.Hair: {
                const hairData = data as HairType;

                this.ped.setComponentVariation(2, hairData.hairStyle, 0, hairData.hairColor);
                this.ped.setHeadOverlay(2, hairData.browsStyle, 1.0);
                this.ped.setHeadOverlay(1, hairData.chestStyle, 1.0);

                break;
            }
            case CharacterDataType.Clothes: {
                const clothesData = data as ClothesType;
                
                this.ped.setComponentVariation(3, clothesData.topData.torso, 0, 0);
                this.ped.setComponentVariation(11, clothesData.topData.top, 0, 0);

                this.ped.setComponentVariation(4, clothesData.legs, 0, 0);
                this.ped.setComponentVariation(6, clothesData.shoes, 0, 0);
            }
            case CharacterDataType.Body: {
                const bodyData = data as BodyType;

                this.ped.setHeadOverlay(3, bodyData.ageing.value, bodyData.ageing.saturation);
                this.ped.setHeadOverlay(0, bodyData.blemishes.value, bodyData.ageing.saturation);
                this.ped.setHeadOverlay(11, bodyData.bodyBlemishes.value, bodyData.ageing.saturation);
                this.ped.setHeadOverlay(7, bodyData.sunDamage.value, bodyData.ageing.saturation);
                this.ped.setHeadOverlay(9, bodyData.moles.value, bodyData.ageing.saturation);
            }
            default:
                break;
        }
    }

    destroy() {
        this.ped.destroy();
    }

    isLoaded(): boolean {
        return mp.peds.exists(this.ped) && this.ped.handle;
    }
}
