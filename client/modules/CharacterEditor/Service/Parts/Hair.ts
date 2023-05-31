import { PartEditor } from "../PartEditor";
import { HairType } from "../Types/HairType";

export class Hair extends PartEditor<HairType> {
    constructor(defaultMale: HairType, defaultFamele: HairType) {
        super(defaultMale, defaultFamele);
    }

    apply(): void {
        this.player.setComponentVariation(2, this.data.hairStyle, 0, 2);
        this.player.setHairColor(this.data.hairColor, 0);
        this.player.setHeadOverlay(2, this.data.browsStyle, 1.0, this.data.browsColor, 0);
        this.player.setHeadOverlay(1, this.data.facialHair, 1.0, this.data.facialColor, 0);
    }
}