import { EventBus } from "../../../shared/utils/EventBus";

export function initializePlayerEventBus(player: PlayerMp) {
    player.eventBus = new EventBus();

    const __call = player.eventBus.call;
    player.eventBus.call = <T>(name: string, ...args: any[]): T[] => {
        mp.events.call(name, player, ...args);
        return __call.apply(player.eventBus, [name, ...args]);
    }
}