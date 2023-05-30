import { Account } from "./Account";
import { AccountData } from "./AccountData";

const accountStorage = new Map<number, Account>();

export class AccountHandler {
    static create(id: number, player: PlayerMp, data: AccountData) {
        const account = new Account(id, player, data);
        accountStorage.set(id, account);
        return account;
    }

    static get(id: number) {
        return accountStorage.get(id);
    }

    static getByPlayer(player: PlayerMp) {
        return [...accountStorage.values()].find((item) => item.player.id === player.id);
    }

    static remove(id: number) {
        if(accountStorage.has(id)) {
            accountStorage.delete(id);
        }
    }
}