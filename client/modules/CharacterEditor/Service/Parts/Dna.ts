import { PartEditor } from "../PartEditor";
import { DnaType } from "../Types/DnaType";

export class Dna extends PartEditor<DnaType> {
    constructor(defaultMale: DnaType, defaultFamele: DnaType) {
        super(defaultMale, defaultFamele);
    }

    apply(): void {
        this.player.setHeadBlendData(this.data.shapeFirstId, this.data.shapeSecondId, 0, this.data.skinFirstId, this.data.skinSecondId, 0, this.data.shapeMix, this.data.skinMix, 0.0, false);
    }
}