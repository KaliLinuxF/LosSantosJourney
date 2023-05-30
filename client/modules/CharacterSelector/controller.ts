import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { CharacterSelectorDataType } from "../../../shared/CharacterSelector/CharacterSelectorData";

BaseEventHandler.get('characterSelector::init').addHandler((jsonData: string) => {
    const data: CharacterSelectorDataType[] = JSON.parse(jsonData);
    
});