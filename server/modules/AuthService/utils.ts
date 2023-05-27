import { EventBus } from "../../../shared/utils/EventBus";
import * as bcrypt from 'bcryptjs';

export function initializePlayerEventBus(player: PlayerMp) {
    player.eventBus = new EventBus();

    const __call = player.eventBus.call;
    player.eventBus.call = <T>(name: string, ...args: any[]): T[] => {
        mp.events.call(name, player, ...args);
        return __call.apply(player.eventBus, [name, ...args]);
    }
}

export async function hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

export async function comparePasswords(userInput: string, hash: string) {
    const comapreResult = await bcrypt.compare(userInput, hash);

    return comapreResult;
}