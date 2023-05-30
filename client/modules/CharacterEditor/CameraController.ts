import { charCreatorConfig } from "./config";
import { NotificationTypes, NotificationPositions } from '../../../shared/notifications/types';

export type CameraPosition = {
    position: Vector3Mp;
    rotation: Vector3Mp;
}

export class CameraController {
    private camera: CameraMp;
    private currentCameraPosition: number;
    private positions: CameraPosition[];
    private readonly fadeTime: number;

    constructor(fadeTime: number) {
        this.fadeTime = fadeTime;
        this.currentCameraPosition = 0;
        this.positions = [];
    }

    init() {
        mp.keys.bind(charCreatorConfig.cameraSwitchKey, false, () => {
            this.nextPosition();
        });
    }

    setCameras(positions: CameraPosition[]) {
        this.positions = positions;
        this.currentCameraPosition = 0;
        this.nextPosition();
    }

    private nextPosition() {
        if(this.positions.length < 1) {
            return;
        }
        
        this.fadeCamera();
        this.destroyCamera();

        if(this.currentCameraPosition > this.positions.length - 1) {
            this.currentCameraPosition = 0;
        }

        const { position, rotation } = this.positions[this.currentCameraPosition];

        this.camera = mp.cameras.new('charcam');
        this.camera.setCoord(position.x, position.y, position.z);
        this.camera.setRot(rotation.x, rotation.y, rotation.z, 2);
        this.camera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, true);

        this.currentCameraPosition += 1;
    }

    private fadeCamera() {
        mp.game.cam.doScreenFadeOut(0);
        mp.game.cam.doScreenFadeIn(this.fadeTime);
    }

    private destroyCamera() {
        if(this.camera) {
            this.camera.setActive(false);
            this.camera.destroy(true);
            this.camera = null;
        }
    }

    destroy() {
        this.camera?.setActive(false);
        this.camera?.destroy(true);
        this.camera = null;

        mp.game.cam.renderScriptCams(false, false, 0, true, true);
    }
}