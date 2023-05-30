import { CharacterEditorService } from "./CharacterEditorService";

const serviceStorage = new Map<number, CharacterEditorService>();
let idGenerator = 0;

export class CharacterEditorServiceHandler {
    static create(player: PlayerMp) {
        const id = idGenerator++;
        const service = new CharacterEditorService(id, player);
        serviceStorage.set(id, service);
        return service;
    }

    static get(player: PlayerMp) {
        return [...serviceStorage.values()].find(item => item.player.id === player.id);
    }

    static remove(id: number) {
        if(serviceStorage.has(id)) {
            serviceStorage.delete(id);
        }
    }
}