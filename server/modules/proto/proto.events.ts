import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";

BaseEventHandler.get('playerQuit').addHandler((player: PlayerMp) => {
    mp.events.call('playerBeforeQuit', player);
}, 0);