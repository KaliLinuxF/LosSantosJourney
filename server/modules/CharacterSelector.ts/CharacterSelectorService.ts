import { Person } from "../database/Models/Person";
import { CharacterSelectorDataType } from "../../../shared/CharacterSelector/CharacterSelectorData";
import { CharacterEditorServiceHandler } from "../CharacterEditor/CharacterEditorServiceHandler";

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export class CharacterSelectorService {
    public readonly player: PlayerMp;
    private rawCharacters: Person[];
    private characters: CharacterSelectorDataType[];

    constructor(player: PlayerMp) {
        this.player = player;
        this.characters = [];
    }

    async init() {
        const account = this.player.accountInstance;

        if(!account) {
            return;
        }

        this.rawCharacters = await Person.findAll({
            where: {
                accountId: account.id
            }
        });

        this.characters = this.rawCharacters.map(item => {
            return {
                id: item.id,
                name: item.name,
                static: item.static,
                bank: 0,
                cash: 0,
                characterData: item.characterData,
                sex: item.sex,
                lastLogin: `${monthNames[account.data.lastLoginData.getMonth()]}/${account.data.lastLoginData.getDate()} | ${account.data.lastLoginData.getHours()}:${account.data.lastLoginData.getMinutes()}`
            };
        });
        
        this.player.call('characterSelector::init', [JSON.stringify(this.characters)]);
    }

    select(id: number) {
        const character = this.rawCharacters.find(item => item.id === id);

        if(!character) {
            CharacterEditorServiceHandler.get(this.player).init();
            return;
        }

        this.player.call('characterSelector::select', [JSON.stringify(character)]);
    }
}