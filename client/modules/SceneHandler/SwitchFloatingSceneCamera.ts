import ISceneCamera from "./ISceneCamera";

export type TransactionCamera = [[Vector3Mp, Vector3Mp], [Vector3Mp, Vector3Mp], number][];

export default class SwitchFloatingSceneCamera implements ISceneCamera {
    protected activeCamera: CameraMp;
    protected interpCamera: CameraMp;
    protected activeIdx: number;
    protected timeout: ReturnType<typeof setTimeout>

    protected isActive: boolean = false;

    constructor(
        /** Position, Rotation, Ms */
        protected readonly transitions: TransactionCamera,
    ) { }

    getActiveCamera(): CameraMp {
        return this.activeCamera;
    }

    async start(interpCamera?: CameraMp) {
        if (this.isActive) {
            return;
        }

        this.activeIdx = -1;
        this.isActive = true;
        this.switchNext();
    }

    stop(): void {
        this.isActive = false;
        clearTimeout(this.timeout);

        this.activeCamera?.destroy(true);
        this.activeCamera = null;

        this.interpCamera?.destroy(true);
        this.interpCamera = null;
    }

    protected async switchNext() {
        if (!this.isActive) {
            return;
        }

        this.activeIdx = this.activeIdx === this.transitions.length - 1 ? 0 : this.activeIdx + 1;

        if (this.interpCamera) {
            this.interpCamera.setActive(false);
            this.interpCamera.destroy(true);
        }

        if (this.activeCamera) {
            this.interpCamera.setActive(false);
            this.activeCamera.destroy(true);
        }

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