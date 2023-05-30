import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { CharacterData } from "../../../shared/CharacterCreator/CharacterDataType";
import { Gender } from "../../../shared/CharacterCreator/types";
import { CharacterEditorServiceHandler } from "./CharacterEditorServiceHandler";

BaseEventHandler.get('characterEditor:save')
.addHandler((player: PlayerMp, firstName: string, secondName: string, gender: Gender, data: CharacterData) => {
    const characterEditorService = CharacterEditorServiceHandler.get(player);

    if(!characterEditorService) {
        return;
    }

    characterEditorService.save(firstName, secondName, gender, data)
});