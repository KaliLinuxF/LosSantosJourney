import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { playerSocketConnect } from "./player";

BaseEventHandler.get('playerJoin').addHandler((player: PlayerMp) => {
    playerSocketConnect(player);
}, -1)

BaseEventHandler.get('playerBeforeQuit').addHandler((player: PlayerMp) => {
    if (player?.socketWeb) {
        player.socketWeb?.disconnect(true);
        player.socketWeb = null;
    }
}, 50);