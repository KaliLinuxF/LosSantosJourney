import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { DefaultCharacterType } from "../../../shared/CharacterCreator/DefaultCharacterDataType";
import { CharacterEditorService } from "./Service/CharacterEditorService";

let characterEditorService: CharacterEditorService = null;

BaseEventHandler.get('characterEditor::init').addHandler((jsonData: string) => {
    const data: DefaultCharacterType = JSON.parse(jsonData);
    characterEditorService = new CharacterEditorService(data);
});

mp.events.add('render', () => {
    if(!characterEditorService) {
        return;
    }

    mp.game.controls.disableAllControlActions(0);
    mp.game.controls.disableAllControlActions(1);
    mp.game.controls.disableAllControlActions(2);
});

export function destroyCharacterEditorService() {
    characterEditorService.destroy();
    characterEditorService = null;
}