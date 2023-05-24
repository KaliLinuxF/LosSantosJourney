import ISceneCamera from "./ISceneCamera";

export default class FloatingSceneCamera implements ISceneCamera {
    private activeCamera: CameraMp;
    private interpCamera: CameraMp;
    private activeIdx: number;
    private timeout: ReturnType<typeof setTimeout>

    constructor(
        /** Position, Rotation, Ms */
        private readonly transitions: [Vector3Mp, Vector3Mp, number][]
    ) { }

    getActiveCamera(): CameraMp {
        return this.activeCamera;
    }

    async start(interpCamera?: CameraMp) {
        if (interpCamera) {
            this.activeIdx = -1;
            this.interpCamera = interpCamera;
            this.switchNext();
            return;
        }

        const [ interpPosition, interpRotation ] = this.transitions[0];
        const [ activePosition, activeRotation, ms ] = this.transitions[1];

        this.interpCamera = mp.cameras.new('default');
        this.interpCamera.setCoord(interpPosition.x, interpPosition.y, interpPosition.z);
        this.interpCamera.setRot(interpRotation.x, interpRotation.y, interpRotation.z, 2);
        this.interpCamera.setActive(true);
        mp.game.cam.renderScriptCams(true, false, 0, true, true);

        await mp.game.waitAsync(10);

        this.activeCamera = mp.cameras.new('default');
        this.activeCamera.setCoord(activePosition.x, activePosition.y, activePosition.z);
        this.activeCamera.setRot(activeRotation.x, activeRotation.y, activeRotation.z, 2);
        this.activeCamera.setActiveWithInterp(this.interpCamera.handle, ms, 0, 0);
        mp.game.cam.renderScriptCams(true, true, ms, false, false);

        this.activeIdx = 1;

        this.timeout = setTimeout(this.switchNext.bind(this), ms);
    }

    stop(): void {
        this.interpCamera.destroy(true);
        clearTimeout(this.timeout);
    }

    private switchNext() {
        this.activeIdx = this.activeIdx === this.transitions.length - 1 ? 0 : this.activeIdx + 1;

        const [ activePosition, activeRotation, ms ] = this.transitions[this.activeIdx];

        this.interpCamera.destroy(true);
        this.interpCamera = this.activeCamera;

        this.activeCamera = mp.cameras.new('default');
        this.activeCamera.setCoord(activePosition.x, activePosition.y, activePosition.z);
        this.activeCamera.setRot(activeRotation.x, activeRotation.y, activeRotation.z, 2);
        this.activeCamera.setActiveWithInterp(this.interpCamera.handle, ms, 0, 0);
        mp.game.cam.renderScriptCams(true, true, ms, false, false);

        this.timeout = setTimeout(this.switchNext.bind(this), ms);
    }
}