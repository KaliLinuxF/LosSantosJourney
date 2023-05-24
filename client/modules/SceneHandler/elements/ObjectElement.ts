import SceneElement from "./SceneElement";

interface ObjectElementOptions {
    model: Hash | string,
    position: Vector3Mp,
    rotation: Vector3Mp
}

export default class ObjectElement extends SceneElement {
    private object: ObjectMp;

    constructor(
        public readonly options: ObjectElementOptions
    ) {
        super();
    }

    create() {
        const modelHash = typeof this.options.model === 'number' ? this.options.model : mp.game.joaat(this.options.model);
        this.object = mp.objects.new(modelHash, this.options.position, {
            dimension: mp.players.local.dimension,
            rotation: this.options.rotation
        });
    }

    destroy() {
        this.object.destroy();
    }

    isLoaded(): boolean {
        return this.object && this.object.handle;
    }

    onLoad() {
    }
}