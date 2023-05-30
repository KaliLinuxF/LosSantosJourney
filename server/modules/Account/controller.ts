import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { AccountHandler } from "./AccountHandler";

BaseEventHandler.get('playerBeforeQuit').addHandler((player: PlayerMp) => {
    if(!player.accountInstance) {
        return;
    }

    AccountHandler.remove(player.accountInstance.id);
}, 0);