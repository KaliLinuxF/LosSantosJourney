import { CharacterData, CharacterDataType } from "../../../shared/CharacterCreator/CharacterDataType";
import { Gender } from '../../../shared/CharacterCreator/types';
import { characterConfig } from "./config";
import { Person as PersonModel } from "../database/Models/Person";
import { StaticGenerator } from "../Person/StaticGenerator";
import { PersonHandler } from "../Person/PersonHandler";
import { CharacterEditorServiceHandler } from "./CharacterEditorServiceHandler";
import { DefaultCharacterType } from '../../../shared/CharacterCreator/DefaultCharacterDataType';
import { NotificationTypes, NotificationPositions } from "../../../shared/notifications/types";
import { showNotify } from "../utils/notify/notify";
import { NameRegExp } from "../../../shared/CharacterCreator/RegExps";

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

        if(!firstName) {
            showNotify(this.player, NotificationTypes.Error, 'Type firstname', 4, NotificationPositions.Bottom);
            return;
        }

        if(!lastName) {
            showNotify(this.player, NotificationTypes.Error, 'Type lastname', 4, NotificationPositions.Bottom);
            return;
        }

        if(!gender) {
            showNotify(this.player, NotificationTypes.Error, 'Choose gender', 4, NotificationPositions.Bottom);
            return;
        }

        if(!data) {
            showNotify(this.player, NotificationTypes.Error, 'Something wrong', 4, NotificationPositions.Bottom);
            return;
        }

        // if(!NameRegExp.test(firstName)) {
        //     showNotify(this.player, NotificationTypes.Error, 'Bad first name', 4, NotificationPositions.Bottom);
        //     return;
        // }

        // if(!NameRegExp.test(lastName)) {
        //     showNotify(this.player, NotificationTypes.Error, 'Bad last name', 4, NotificationPositions.Bottom);
        //     return;
        // }

        // const personWithSameName = await PersonModel.findOne({
        //     where: {
        //         name: `${firstName} ${lastName}`
        //     }
        // });

        // if(personWithSameName) {
        //     showNotify(this.player, NotificationTypes.Error, 'Person with same name already exist', 4, NotificationPositions.Bottom);
        //     return;
        // }

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
        this.player.call('characterEditor::finish');
    }
}