import SceneElement from "./SceneElement";

interface PedElementOptions {
    position: Vector3Mp,
    rotation: Vector3Mp,
    scenarioName?: string,
    animation?: {
        dict: string,
        name: string
    },
    outfit?: {
        props: number[][],
        components: number[][]
    },
    model: string,
    faceJson?: string
}

export default class PedElement extends SceneElement {
    private options: PedElementOptions;
    private ped: PedMp;

    constructor(options: PedElementOptions) {
        super();

        this.options = options;
    }

    create(dimension: number) {
        this.ped = mp.peds.new(mp.game.joaat(this.options.model), this.options.position, this.options.rotation.z, dimension);
    }

    async onLoad() {
        if (!mp.peds.exists(this.ped)) {
            return;
        }

        if (this.options.outfit) {
            for (let component of this.options.outfit.components) {
                this.ped.setComponentVariation(component[0], component[1], component[2], 0);
            }

            for (let prop of this.options.outfit.props) {
                // @ts-ignore
                this.ped.setPropIndex(prop[0], prop[1], prop[2], true);
            }
        }

        if (this.options.faceJson) {
            const face = JSON.parse(this.options.faceJson);
            this.ped.setComponentVariation(2, face.hair, 0, 0);
            this.ped.setHairColor(face.hairMainColor, 0);
            this.ped.setHeadBlendData(face.fatherIndex, face.motherIndex, 0, 41, 21, 0, face.shapeMix, face.skinMix, 0, false);
        }

        if (this.options.animation) {
            mp.game.streaming.requestAnimDict(this.options.animation.dict);
            while (!mp.game.streaming.hasAnimDictLoaded(this.options.animation.dict)) {
                mp.game.streaming.requestAnimDict(this.options.animation.dict);
                await mp.game.waitAsync(10);
            }

            if (!mp.peds.exists(this.ped)) {
                return;
            }

            this.ped.taskPlayAnim(this.options.animation.dict, this.options.animation.name, 8.0, 1.0, -1, 1, 1.0, false, false, false);
        }

        if (this.options.scenarioName) {
            // @ts-ignore
            this.ped.taskStartScenarioInPlace(this.options.scenarioName, -1, true);
        }
    }

    destroy() {
        this.ped.destroy();
    }

    isLoaded(): boolean {
        return mp.peds.exists(this.ped) && this.ped.handle;
    }
}
