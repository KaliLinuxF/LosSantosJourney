import { socketsConfig } from './config'
import sha256 from "sha256";
import { playerSockets, SocketCustomInstance } from "./utils";

export function playerSocketConnect(player: PlayerMp) {
    if(!socketsConfig.enabled) {
        return;
    }

    try {
        const date = new Date();
        const time = date.getTime();
        const socketHash = sha256(`${player.id}${time}fqDddN332HjKLemn`);
        playerSockets.set(socketHash, player.id);
        player.socketHash = socketHash;
        player.call('connectToSocket', [socketHash, `http://${socketsConfig.ip}:${socketsConfig.listenPort}/`]);
    } catch (error) {
        console.log('[SOCKET:PLAYERCONNECT]: ', error);
    }
}

export function onSocketAuth(socketCustom: SocketCustomInstance, data: string) {
    try {
        const playerSocket = playerSockets.get(data);

        if(playerSocket === null) {
            socketCustom.socket.disconnect(true);
            return;
        }

        const playerId = playerSocket;
        const player = mp.players.at(playerId);

        if(!player) {
            playerSockets.delete(data);
            socketCustom.socket.disconnect(true);
            return;
        }

        socketCustom.playerId = playerId;
        socketCustom.hash = data;

        if(player?.socketWeb) {
            player.socketWeb?.disconnect(true);
        }

        player.socketWeb = socketCustom.socket;
    } catch (error) {
        console.log('[SOCKET:AUTH]: ', error);
    }
}

export function onSocketDisconnect(socketCustom: SocketCustomInstance) {
    try {
        socketCustom.socket.disconnect(true);
    } catch (error) {
        console.log('[SOCKET: DISCONNECT]: ', error);
    }
}