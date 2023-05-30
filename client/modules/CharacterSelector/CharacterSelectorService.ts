import { CharacterDataType } from "../../../shared/CharacterCreator/CharacterDataType";
import { Gender } from "../../../shared/CharacterCreator/types";
import { CharacterSelectorDataType } from "../../../shared/CharacterSelector/CharacterSelectorData";
import SceneHandler from "../SceneHandler/SceneHandler";
import PedElement from "../SceneHandler/elements/PedElement";
 
export class CharacterSelectorService {
    private readonly player: PlayerMp;
    private characters: CharacterSelectorDataType[];
    private loadedPeds: PedElement[];
    private pedSlotModels: string[];
    private selectedPed: PedMp;
    private camera: CameraMp;

    constructor(player: PlayerMp, characters: CharacterSelectorDataType[]) {
        this.player = player;
        this.characters = characters;
        this.loadedPeds = [];
        this.pedSlotModels = [
            'a_m_y_beach_03',
            'a_m_y_beach_01'
        ];
        this.selectedPed = null;
    }

    init() {
        if (this.characters[0]) {
            this.loadSelectablePed(0);
        }

        if(this.characters[1]) {
            this.loadSelectablePed(1);
        }

        this.loadedPeds.forEach((item) => {
            item.ped.setAlpha(100);
        });

        this.camera = mp.cameras.new('charselector');
        this.camera.setCoord(0, 0, 0);
        this.camera.setRot(0, 0, 0, 2);
        this.camera.setActive(true)
        mp.game.cam.renderScriptCams(true, false, 0, true, false);
    }

    loadSelectablePed(index: number) {
        const scene = SceneHandler.activeScene;

        if (!scene) {
            return;
        }

        const pedElements = scene.elements.filter((item) => item instanceof PedElement) as PedElement[];
        const pedToRemove = pedElements.find((item) => item.options.model === this.pedSlotModels[index]);

        pedToRemove.destroy();
        scene.removeElement(pedToRemove);

        const ped = new PedElement({
            model: this.characters[index].sex === Gender.Male ? 'mp_m_freemode_01' : 'mp_f_freemode_01',
            position: new mp.Vector3(-337.610, 596.839, 171.955),
            rotation: new mp.Vector3(0, 0, 161.86),
            animation:
            {
                dict: 'amb@world_human_bum_standing@drunk@base',
                name: 'base'
            },
            charData: this.characters[index].characterData
        });

        scene.addElement(ped);
        this.loadedPeds.push(ped);
    }

    render() {
        const coursor = mp.gui.cursor.position;
        const coursourCord = mp.game.graphics.screen2dToWorld3d(new mp.Vector3(coursor[0], coursor[1], 0));
        const raycast = mp.raycasting.testPointToPoint(this.camera.getCoord(), new mp.Vector3(coursourCord.x, coursourCord.y, coursourCord.z), this.player, 8 | 4) 

        if(raycast && raycast?.entity && (raycast.entity as PedMp)?.position) {
            this.selectedPed = (raycast.entity as PedMp);
        }

        this.loadedPeds.forEach((item) => {
            if(item.ped === this.selectedPed) {
                item.ped.setAlpha(255);
            } else {
                item.ped.setAlpha(100);
            }
        });
    }
}

