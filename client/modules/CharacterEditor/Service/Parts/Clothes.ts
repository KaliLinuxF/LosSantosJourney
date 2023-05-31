import { Gender } from "../../../../../shared/CharacterCreator/types";
import { PartEditor } from "../PartEditor";
import { ClothesType } from "../Types/ClothesType";

export class Clothes extends PartEditor<ClothesType> {
    constructor(defaultMale: ClothesType, defaultFamele: ClothesType) {
        super(defaultMale, defaultFamele);
    }

    apply(): void {
        this.player.setComponentVariation(3, this.data.topData.torso, 0, 0);
        this.player.setComponentVariation(11, this.data.topData.top, 0, 0);

        if(this.gender === Gender.Male) {
            this.player.setComponentVariation(8, 15, 0, 0);
        } else {
            this.player.setComponentVariation(8, 14, 0, 0);
        }

        this.player.setComponentVariation(4, this.data.legs, 0, 0);
        this.player.setComponentVariation(6, this.data.shoes, 0, 0);
    }
}   