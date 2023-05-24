import SceneElement from "./SceneElement";

interface VehicleElementOptions {
    position: Vector3Mp,
    heading: number,
    model: string,
    color1: RGB,
    color2: RGB
}

export default class VehicleElement extends SceneElement {
    private options: VehicleElementOptions;
    private vehicle: VehicleMp;

    constructor(options: VehicleElementOptions) {
        super();

        this.options = options;
    }

    destroy() {
        this.vehicle.destroy();
    }

    create() {
        this.vehicle = mp.vehicles.new(mp.game.joaat(this.options.model), this.options.position, {
            alpha: 255,
            color: [this.options.color1, this.options.color2],
            dimension: mp.players.local.remoteId + 1,
            heading: this.options.heading,
            numberPlate: 'LSJ'
        });
    }

    isLoaded(): boolean {
        return mp.vehicles.exists(this.vehicle) && this.vehicle.handle;
    }

    onLoad() { }
}