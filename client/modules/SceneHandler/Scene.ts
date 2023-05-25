import SceneElement from "./elements/SceneElement";
import ISceneCamera from "./ISceneCamera";

export default class Scene {
    private elements: SceneElement[] = [];

    constructor(
        private readonly centerPosition: Vector3Mp,
        private sceneCamera: ISceneCamera,
        private sceneTime?: number
    ) { }

    async load() {
        mp.game.ui.displayRadar(false);
        mp.gui.chat.show(false);
        mp.nametags.enabled = false

        if(this.sceneTime) {
            mp.game.time.setClockTime(this.sceneTime, 1, 1);
        }

        mp.players.local.position = new mp.Vector3(-326.2754, 639.0650, 172.8681);
        mp.players.local.setAlpha(0);

        this.activateCamera();

        for (let element of this.elements) {
            element.create(mp.players.local.dimension);
        }

        while (!this.elements.every(element => element.isLoaded())) {
            await mp.game.waitAsync(200);
        }

        for (let element of this.elements) {
            element.onLoad();
        }
    }

    unload() {
        mp.game.ui.displayRadar(true);
        for (let element of this.elements) {
            element.destroy();
        }

        this.activeCamera.setActive(false);
        mp.game.cam.renderScriptCams(true, false, 0, false, false);

        this.sceneCamera?.stop();
        this.destroyCamera(this.activeCamera);
        this.destroyCamera(this.interpCamera);
    }

    activeCamera: CameraMp;
    interpCamera: CameraMp;

    activateCamera() {
        this.sceneCamera.start();
    }

    addElement(element: SceneElement) {
        this.elements.push(element);
        return this;
    }

    removeElement(element: SceneElement) {
        const idx = this.elements.findIndex(el => el === element);
        if (idx === -1) {
            return;
        }

        this.elements.splice(idx, 1);
    }

    switchCamera(position: Vector3Mp, rotation: Vector3Mp, interpolationTime: number) {
        this.destroyCamera(this.interpCamera);
        this.interpCamera = this.sceneCamera ? this.sceneCamera.getActiveCamera() : this.activeCamera;

        if (this.sceneCamera) {
            this.sceneCamera.stop();
            this.sceneCamera = null;
        }

        this.activeCamera = mp.cameras.new('sceneCam', position, rotation);
        this.activeCamera.setCoord(position.x, position.y, position.z);
        this.activeCamera.setRot(rotation.x, rotation.y, rotation.z, 2);
        this.activeCamera.setActiveWithInterp(this.interpCamera.handle, interpolationTime, 0, 0);

        mp.game.cam.renderScriptCams(true, true, interpolationTime, false, false);
    }

    switchSceneCamera(sceneCamera: ISceneCamera) {
        this.sceneCamera = sceneCamera;
        sceneCamera.start(this.activeCamera);
    }

    private destroyCamera(camera: CameraMp) {
        if (camera && mp.cameras.exists(camera) && camera.isActive()) {
            camera.setActive(false);
            camera.destroy(true);
        }
    }
}