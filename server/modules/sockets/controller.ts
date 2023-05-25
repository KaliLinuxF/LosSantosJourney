import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { playerSocketConnect } from "./player";

BaseEventHandler.get('playerJoin').addHandler((player: PlayerMp) => {
    playerSocketConnect(player);
}, -1)

BaseEventHandler.get('playerQuit').addHandler((player: PlayerMp) => {
    if (player?.socketWeb) {
        player.socketWeb?.disconnect(true);
        player.socketWeb = null;
    }

    console.log('player quit socket handler')
}, 0);