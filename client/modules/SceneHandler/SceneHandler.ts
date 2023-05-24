import Scene from "./Scene";

export default class SceneHandler {
    static activeScene: Scene;

    static startScene(scene: Scene) {
        if (this.activeScene != null) {
            return;
        }

        this.activeScene = scene;
        scene.load();
    }

    static endScene() {
        this.activeScene.unload();
        this.activeScene = null;
    }
}
