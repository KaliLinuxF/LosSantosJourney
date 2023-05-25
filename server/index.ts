import 'reflect-metadata';
import './modules/sockets';
import './modules/proto';
import './modules/utils';
import './modules/database'
import '../shared/auth/index'
import { BaseEventHandler } from '../shared/BaseEvents/BaseEventHandler';

BaseEventHandler.get('playerJoin').addHandler((player: PlayerMp) => {
    player.tempValues = {};
}, 0);