import './modules/sockets';
import './modules/proto';
import './modules/utils/index.ts';
import { BaseEventHandler } from '../shared/BaseEvents/BaseEventHandler';

BaseEventHandler.get('playerJoin').addHandler((player: PlayerMp) => {
    player.tempValues = {};
}, 0);