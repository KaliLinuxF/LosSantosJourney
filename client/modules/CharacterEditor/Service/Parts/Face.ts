import { PartEditor } from "../PartEditor";
import { FaceType } from "../Types/FaceType";

export class Face extends PartEditor<FaceType> {
    constructor(defaultMale: FaceType, defaultFamele: FaceType) {
        super(defaultMale, defaultFamele);
    }

    apply(): void {
        this.player.setFaceFeature(0, this.data.noseWidth);
        this.player.setFaceFeature(1, this.data.noseHeight);
        this.player.setFaceFeature(2, this.data.noseLength);
        this.player.setFaceFeature(3, this.data.noseBridge);
        this.player.setFaceFeature(4, this.data.noseTip);
        this.player.setFaceFeature(5, this.data.noseBridgeShift);
        this.player.setFaceFeature(6, this.data.browHeight);
        this.player.setFaceFeature(7, this.data.browWidth);
        this.player.setFaceFeature(8, this.data.cheekboneHeight);
        this.player.setFaceFeature(9, this.data.cheekboneWidth);
        this.player.setFaceFeature(10, this.data.cheeksWidth);
        this.player.setFaceFeature(11, this.data.eyes);
        this.player.setFaceFeature(12, this.data.lips);
        this.player.setFaceFeature(13, this.data.jawWidth);
        this.player.setFaceFeature(14, this.data.jawHeight);
        this.player.setFaceFeature(15, this.data.chinLength);
        this.player.setFaceFeature(16, this.data.chinPosition);
        this.player.setFaceFeature(17, this.data.chinWidth);
        this.player.setFaceFeature(18, this.data.chinShape);
    }
}