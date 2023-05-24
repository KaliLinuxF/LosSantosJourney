import './modules/sockets';
import './modules/proto';
import './modules/utils/devUtils';

import { playerSocketConnect } from './modules/sockets';

mp.events.add('playerJoin', (player: PlayerMp) => {
    player.tempValues = {};

    setTimeout(() => {
        playerSocketConnect(player);
    }, 4000);
});

console.log('Hello from server')