import { CharacterData, CharacterDataType } from "../../../shared/CharacterCreator/CharacterDataType";
import { Gender } from '../../../shared/CharacterCreator/types';
import { characterConfig } from "./config";
import { Person as PersonModel } from "../database/Models/Person";
import { StaticGenerator } from "../Person/StaticGenerator";
import { PersonHandler } from "../Person/PersonHandler";
import { CharacterEditorServiceHandler } from "./CharacterEditorServiceHandler";
import { DefaultCharacterType } from '../../../shared/CharacterCreator/DefaultCharacterDataType';

export class CharacterEditorService {
    id: number;
    readonly player: PlayerMp;

    constructor(id: number, player: PlayerMp) {
        this.id = id;
        this.player = player;
    }

    init() {
        const defaultDto: DefaultCharacterType = {
            male: characterConfig.defaultMaleCharacter,
            famale: characterConfig.defaultFemaleCharacter
        }

        this.player.call('characterEditor::init', [JSON.stringify(defaultDto)]);
    }

    async save(firstName: string, lastName: string, gender: Gender, data: CharacterData) {
        const account = this.player.accountInstance;

        if(!account) {
            return;
        }

        const person = await PersonModel.create({
            accountId: account.id,
            name: `${firstName} ${lastName}`,
            static: StaticGenerator.generateUnique(),
            characterData: data,
            sex: gender
        });

        const personInstance = PersonHandler.create(person.id, this.player, {
            accountId: person.accountId,
            name: person.name,
            static: person.static,
            characterData: person.characterData,
            sex: person.sex
        });

        this.player.personInstance = personInstance;
        this.finish();
    }

    finish() {
        CharacterEditorServiceHandler.remove(this.id);
    }
}