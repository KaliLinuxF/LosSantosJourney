import { Server as SocketIOServer } from 'socket.io';
import { onSocketAuth, onSocketDisconnect } from './player';
import { SocketCustomInstance, socketsPool } from './utils';
import server from './app';

const io = new SocketIOServer(server, {
    httpCompression: false,
    perMessageDeflate: false,
    allowEIO3: true,
    transports: ['websocket', 'polling']
});

export function initSockets() {
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

export function pingSockets() {
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
}

