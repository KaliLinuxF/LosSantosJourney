import { Clothes } from "./Parts/Clothes";
import { Dna } from "./Parts/Dna";
import { Face } from "./Parts/Face";
import { Hair } from "./Parts/Hair";
import { Body } from "./Parts/Body";
import { DefaultCharacterType } from "../../../../shared/CharacterCreator/DefaultCharacterDataType";
import { CharacterData, CharacterDataType } from "../../../../shared/CharacterCreator/CharacterDataType";
import { Gender } from "../../../../shared/CharacterCreator/types";
import { CameraController } from "../CameraController";
import { PlayerController } from "../PlayerController";
import { charCreatorConfig } from "../config";
import { destroyCharacterEditorService } from "../controller";
import rpc from '../../../../shared/rpc';
import charApi, { CreateCharApiUpdateCategory } from '../../../../shared/CharacterCreator/api';

export class CharacterEditorService {
    private readonly player: PlayerMp;
    private readonly Dna: Dna;
    private readonly Clothes: Clothes;
    private readonly Face: Face;
    private readonly Hair: Hair;
    private readonly Body: Body;

    private gender: Gender;
    private cameraController: CameraController;
    private playerController: PlayerController;

    constructor(defaultData: DefaultCharacterType) { 
        this.player = this.player;

        this.gender = Gender.Male;

        this.Dna = new Dna(defaultData.male[CharacterDataType.Dna], defaultData.famale[CharacterDataType.Dna]);
        this.Clothes = new Clothes(defaultData.male[CharacterDataType.Clothes], defaultData.famale[CharacterDataType.Clothes]);
        this.Face = new Face(defaultData.male[CharacterDataType.Face], defaultData.famale[CharacterDataType.Face]);
        this.Hair = new Hair(defaultData.male[CharacterDataType.Hair], defaultData.famale[CharacterDataType.Hair]);
        this.Body = new Body(defaultData.male[CharacterDataType.Body], defaultData.famale[CharacterDataType.Body]);
    }

    init() {
        this.cameraController = new CameraController(750);
        this.playerController = new PlayerController(charCreatorConfig.characterPositions);

        this.cameraController.setCameras(charCreatorConfig.dnaCameraPositions);
        this.cameraController.init();

        this.playerController.changePosition(0);

        rpc.callBrowsers('executeRpc', charApi.show());
    }

    changeCategory(categoryId: CharacterDataType) {
        switch (categoryId) {
            case CharacterDataType.Dna: {
                this.cameraController.setCameras(charCreatorConfig.dnaCameraPositions);
                this.playerController.changePosition(0);
                break;
            }
            case CharacterDataType.Clothes: {
                this.cameraController.setCameras(charCreatorConfig.clothesCameraPositions);
                this.playerController.changePosition(1);
                break;
            }
            case CharacterDataType.Face: {
                this.cameraController.setCameras(charCreatorConfig.barberCameraPositions);
                this.playerController.changePosition(2);
                break;
            }
            case CharacterDataType.Hair: {
                this.cameraController.setCameras(charCreatorConfig.barberCameraPositions);
                this.playerController.changePosition(2);
                break;
            }
            case CharacterDataType.Body: {
                this.cameraController.setCameras(charCreatorConfig.dnaCameraPositions);
                this.playerController.changePosition(0);
                break;
            }
        
            default:
                break;
        }
    }

    setGender(gender: Gender) {
        this.gender = gender;

        this.Dna.changeGender(this.gender);
        this.Clothes.changeGender(this.gender);
        this.Face.changeGender(this.gender);
        this.Hair.changeGender(this.gender);
        this.Body.changeGender(this.gender);
    }

    update(type: CharacterDataType, data: any) {
        switch (type) {
            case CharacterDataType.Dna: {
                this.Dna.update(data);
                break;
            }
            case CharacterDataType.Clothes: {
                this.Clothes.update(data);
                break;
            }
            case CharacterDataType.Face: {
                this.Face.update(data);
                break;
            }
            case CharacterDataType.Hair: {
                this.Hair.update(data);
                break;
            }
            case CharacterDataType.Body: {
                this.Body.update(data);
                break;
            }

            default:
                return;
        }
    }

    // updateAll(data: CharacterData) {
    //     this.Dna.update(data[CharacterDataType.Dna]);
    //     this.Clothes.update(data[CharacterDataType.Clothes]);
    //     this.Face.update(data[CharacterDataType.Face]);
    //     this.Hair.update(data[CharacterDataType.Hair]);
    //     this.Body.update(data[CharacterDataType.Body]);
    // }

    // applyAll() {
    //     this.Dna.apply();
    //     this.Clothes.apply();
    //     this.Face.apply();
    //     this.Hair.apply();
    //     this.Body.apply();
    // }

    save(firstName: string, lastName: string) {
        const data: CharacterData = {
            [CharacterDataType.Dna]: this.Dna.data,
            [CharacterDataType.Clothes]: this.Clothes.data,
            [CharacterDataType.Face]: this.Face.data,
            [CharacterDataType.Hair]: this.Hair.data,
            [CharacterDataType.Body]: this.Body.data,
        }

        this.player.call('characterEditor:save', [firstName, lastName, this.gender, data]);
        this.destroy();
    }

    destroy() {
        this.cameraController.destroy();
        this.playerController.destroy();
        destroyCharacterEditorService();
    }
}