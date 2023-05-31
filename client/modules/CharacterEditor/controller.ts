import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { DefaultCharacterType } from "../../../shared/CharacterCreator/DefaultCharacterDataType";
import { CreateCharApiEventNames, CreateCharApiSave, CreateCharApiUpdateCategory, CreateCharApiUpdateData, CreateCharApiUpdateGender } from "../../../shared/CharacterCreator/api";
import { CharacterEditorService } from "./Service/CharacterEditorService";
import rpc from '../../../shared/rpc';
import SceneHandler from "../SceneHandler/SceneHandler";
import charApi from '../../../shared/CharacterCreator/api';

let characterEditorService: CharacterEditorService = null;

BaseEventHandler.get('characterEditor::init').addHandler((jsonData: string) => {
    const data: DefaultCharacterType = JSON.parse(jsonData);
    characterEditorService = new CharacterEditorService(data);
    
    SceneHandler.endScene();

    characterEditorService.init();
});

BaseEventHandler.get('characterEditor::finish').addHandler(() => {
    if(!characterEditorService) {
       return;
    }

    rpc.callBrowsers('executeRpc', charApi.hide());

    characterEditorService.destroy();
    characterEditorService = null;
    
    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.gui.chat.show(true);
    mp.nametags.enabled = true;
    mp.players.local.position = new mp.Vector3(-326.2754, 639.0650, 172.8681);
});

rpc.register(CreateCharApiEventNames.UpdateCategory, (data: CreateCharApiUpdateCategory) => {
    mp.console.logInfo('Update category');
    characterEditorService.changeCategory(data.categoryId);
});

rpc.register(CreateCharApiEventNames.UpdateGender, (data: CreateCharApiUpdateGender) => {
    mp.console.logInfo('UpdateGender');
    characterEditorService.setGender(data.gender);
});

rpc.register(CreateCharApiEventNames.Save, (data: CreateCharApiSave) => {
    mp.console.logInfo(`Save ${JSON.stringify(data)}`);
    characterEditorService.save(data.firstName, data.lastName);
});

rpc.register(CreateCharApiEventNames.UpdateData, (data: CreateCharApiUpdateData) => {
    mp.console.logInfo('UpdateData');
    mp.console.logInfo(`update ${JSON.stringify(data)}`);
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