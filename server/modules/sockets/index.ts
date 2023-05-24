import express from 'express';
import http from 'http';
import fs from 'fs';
import { Server as SocketIOServer, Socket } from 'socket.io';
import sha256 from 'sha256';
import config from './config.json';
import path from 'path';
import { BaseEventHandler } from '../BaseEvents/BaseEventHandler';

const mapHTML = fs.readFileSync(path.join(__dirname, '../../socks/index.html'), 'utf8');
const socketIO = fs.readFileSync(path.join(__dirname, '../../socks/socket.io.js'), 'utf8');
const socketIOMap = fs.readFileSync(path.join(__dirname, '../../socks/socket.io.js.map'), 'utf8');

const app = express();
const server = http.createServer(app);

const io = new SocketIOServer(server, {
    httpCompression: false,
    perMessageDeflate: false,
    allowEIO3: true,
    transports: ['websocket', 'polling']
});

app.get('/', (req, res) => {
    res.send(mapHTML);
});

app.get('/socket.io.js', (req, res) => {
    res.send(socketIO);
});

app.get('/socket.io.js.map', (req, res) => {
    res.send(socketIOMap);
});

server.listen(config.listenPort);
console.log('[SOCKET]: Socket server is ready');

export const playerSockets: Map<string, number> = new Map<string, number>();

export function playerSocketConnect(player: PlayerMp) {
    if(!config.enabled) {
        return;
    }

    try {
        const date = new Date();
        const time = date.getTime();
        const socketHash = sha256(`${player.id}${time}fqDddN332HjKLemn`);
        playerSockets.set(socketHash, player.id);
        player.socketHash = socketHash;
        const ip = '26.136.40.148';
        player.call('connectToSocket', [socketHash, `http://${ip}:${config.listenPort}/`]);
    } catch (error) {
        console.log('[SOCKET:PLAYERCONNECT]: ', error);
    }
}

type SocketCustomInstance = { socket: Socket, aliveTimestamp: number, playerId: number | null, hash: string | null };
const socketsPool: SocketCustomInstance[] = [];

setInterval(() => {
    const timestamp = Date.now() / 1000;

    for (const socket of [...socketsPool]) {
        const socketInstance = socket?.socket;

        socketInstance?.emit('pingAlive');

        if(socket?.aliveTimestamp === null || socket?.aliveTimestamp + 30 < timestamp) {
            socketInstance?.disconnect(true);
        }
    }
}, 10000);

function onSocketAuth(socketCustom: SocketCustomInstance, data: string) {
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

function onSocketDisconnect(socketCustom: SocketCustomInstance) {
    try {
        socketCustom.socket.disconnect(true);
    } catch (error) {
        console.log('[SOCKET: DISCONNECT]: ', error);
    }
}

function initSockets() {
    try {
        io.on('connection', (client) => {
            const clientDisconnect = client.disconnect;

            client.disconnect.prototype = (...args: any) => {
                clientDisconnect(...args);
                client.removeAllListeners();

                const idx = socketsPool.findIndex((item) => item.socket === client);

                if(idx !== -1) {
                    socketsPool.splice(idx, 1);
                }
            }

            const aliveTimestamp = Date.now() / 1000;
            const socketPoolInstance: SocketCustomInstance = { socket: client, aliveTimestamp: aliveTimestamp, playerId: null, hash: null };
            socketsPool.push(socketPoolInstance);

            client.on('authConnect', (data: string) => {
                onSocketAuth(socketPoolInstance, data);
            });

            client.on('disconnect', () => {
                onSocketDisconnect(socketPoolInstance);
            });

            client.on('pongAlive', () => {
                socketPoolInstance.aliveTimestamp = Date.now() / 1000;
            });
        });
    } catch (error) {
        console.log('[SOCKET:CONNECTION]: ', error);
    }
}

setTimeout(() => {
    initSockets();
}, 4000);

BaseEventHandler.get('playerQuit').addHandler((player: PlayerMp) => {
    if (player?.socketWeb) {
        player.socketWeb?.disconnect(true);
        player.socketWeb = null;
    }

    console.log('player quit socket handler')
}, 0);