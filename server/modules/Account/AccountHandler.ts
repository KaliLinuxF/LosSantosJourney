import { Account } from "./Account";
import { AccountData } from "./AccountData";

const accountStorage = new Map<number, Account>();

export class AccountHandler {
    static create(id: number, player: PlayerMp, data: AccountData) {
        const account = new Account(id, player, data);
        accountStorage.set(id, account);
    }

    static get(id: number) {
        return accountStorage.get(id);
    }

    static remove(id: number) {
        if(accountStorage.has(id)) {
            accountStorage.delete(id);
        }
    }
}