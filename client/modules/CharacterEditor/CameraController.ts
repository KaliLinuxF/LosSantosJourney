import { charCreatorConfig } from "./config";

export type CameraPosition = {
    position: Vector3Mp;
    rotation: Vector3Mp;
}

export class CameraController {
    private camera: CameraMp;
    private currentCameraPosition: number;
    private positions: CameraPosition[];
    private readonly fadeTime: number;

    private readonly switchFadeTimeout: number;
    private readonly switchFade: number;

    constructor(fadeTime: number, switchFade: number, switchFadeTimeout: number) {
        this.fadeTime = fadeTime;
        this.switchFade = switchFade;
        this.switchFadeTimeout = switchFadeTimeout;
        this.currentCameraPosition = 0;
        this.positions = [];
    }

    init() {
        mp.keys.bind(charCreatorConfig.cameraSwitchKey, false, this.nextPosition);
    }

    setCameras(positions: CameraPosition[]) {
        this.positions = positions;
        this.currentCameraPosition = 0;
        this.nextPosition(true);
    }

    private nextPosition = (isSwitch: boolean = false) => {
        if(this.positions.length < 1) {
            return;
        }
        
        this.fadeCamera(isSwitch);
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

    private fadeCamera(isSwitch: boolean = false) {
        mp.game.cam.doScreenFadeOut(0);

        if(isSwitch) {
            setTimeout(() => {
                mp.game.cam.doScreenFadeIn(this.switchFade);
            }, this.switchFadeTimeout);
        } else {
            mp.game.cam.doScreenFadeIn(this.fadeTime);
        }
    }

    private destroyCamera() {
        if(this.camera) {
            this.camera.setActive(false);
            this.camera.destroy(true);
            this.camera = null;
        }
    }

    destroy() {
        mp.keys.unbind(charCreatorConfig.cameraSwitchKey, false, this.nextPosition);

        this.camera?.setActive(false);
        this.camera?.destroy(true);
        this.camera = null;

        mp.game.cam.renderScriptCams(false, false, 0, true, true);
    }
}