import { PartEditor } from "../PartEditor";
import { BodyType } from "../Types/BodyType";

export class Body extends PartEditor<BodyType> {
    constructor(defaultMale: BodyType, defaultFamele: BodyType) {
        super(defaultMale, defaultFamele);
    }

    apply(): void {
        this.player.setHeadOverlay(3, this.data.ageing.value, this.data.ageing.saturation, 0, 0);
        this.player.setHeadOverlay(0, this.data.blemishes.value, this.data.ageing.saturation, 0, 0);
        this.player.setHeadOverlay(11, this.data.bodyBlemishes.value, this.data.ageing.saturation, 0, 0);
        this.player.setHeadOverlay(7, this.data.sunDamage.value, this.data.ageing.saturation, 0, 0);
        this.player.setHeadOverlay(9, this.data.moles.value, this.data.ageing.saturation, 0, 0);
    }
}