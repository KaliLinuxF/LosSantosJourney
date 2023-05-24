import SwitchFloatingSceneCamera, { TransactionCamera } from "./SwitchFloatingSceneCamera";

export default class SwitchFloatingSceneCameraWithFade extends SwitchFloatingSceneCamera {
    private readonly fadeInTime: number;
    private readonly fadeOutTime: number;

    constructor(transaction: TransactionCamera, fadeInTime: number = 1000, fadeOutTime: number = 0) {
        super(transaction);
        
        this.fadeInTime = fadeInTime;
        this.fadeOutTime = fadeOutTime;
    }

    protected async switchNext() {
        if (!this.isActive) {
            return;
        }

        this.activeIdx = this.activeIdx === this.transitions.length - 1 ? 0 : this.activeIdx + 1;

        mp.game.cam.doScreenFadeOut(this.fadeOutTime);

        if (this.interpCamera) {
            this.interpCamera.setActive(false);
            this.interpCamera.destroy(true);
        }

        if (this.activeCamera) {
            this.interpCamera.setActive(false);
            this.activeCamera.destroy(true);
        }

        setTimeout(() => {
            mp.game.cam.doScreenFadeIn(this.fadeInTime);
        }, this.fadeOutTime);

        const [ interpPosition, interpRotation ] = this.transitions[this.activeIdx][0];
        const [ activePosition, activeRotation ] = this.transitions[this.activeIdx][1];
        const ms = this.transitions[this.activeIdx][2];

        this.interpCamera = mp.cameras.new('interp');
        this.interpCamera.setCoord(interpPosition.x, interpPosition.y, interpPosition.z);
        this.interpCamera.setRot(interpRotation.x, interpRotation.y, interpRotation.z, 2);
        this.interpCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, true);

        await mp.game.waitAsync(10);

        this.activeCamera = mp.cameras.new('active');
        this.activeCamera.setCoord(activePosition.x, activePosition.y, activePosition.z);
        this.activeCamera.setRot(activeRotation.x, activeRotation.y, activeRotation.z, 2);
        this.activeCamera.setActiveWithInterp(this.interpCamera.handle, ms, 0, 0);
        mp.game.cam.renderScriptCams(true, true, ms, false, false);

        this.timeout = setTimeout(this.switchNext.bind(this), ms);
    } 
}