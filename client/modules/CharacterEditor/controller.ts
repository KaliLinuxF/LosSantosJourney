import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { DefaultCharacterType } from "../../../shared/CharacterCreator/DefaultCharacterDataType";
import { CreateCharApiEventNames, CreateCharApiSave, CreateCharApiUpdateCategory, CreateCharApiUpdateData, CreateCharApiUpdateGender } from "../../../shared/CharacterCreator/api";
import { CharacterEditorService } from "./Service/CharacterEditorService";
import rpc from '../../../shared/rpc';

let characterEditorService: CharacterEditorService = null;

BaseEventHandler.get('characterEditor::init').addHandler((jsonData: string) => {
    const data: DefaultCharacterType = JSON.parse(jsonData);
    characterEditorService = new CharacterEditorService(data);
    characterEditorService.init();
});

rpc.register(CreateCharApiEventNames.UpdateCategory, (data: CreateCharApiUpdateCategory) => {
    characterEditorService.changeCategory(data.categoryId);
});

rpc.register(CreateCharApiEventNames.UpdateGender, (data: CreateCharApiUpdateGender) => {
    characterEditorService.setGender(data.gender);
});

rpc.register(CreateCharApiEventNames.Save, (data: CreateCharApiSave) => {
    characterEditorService.save(data.firstName, data.lastName);
});

rpc.register(CreateCharApiEventNames.UpdateCategory, (data: CreateCharApiUpdateData) => {
    characterEditorService.update(data.type, data.data);
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