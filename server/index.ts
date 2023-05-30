import 'reflect-metadata';
import './modules/sockets';
import './modules/proto';
import './modules/utils';
import './modules/database'
import './modules/AuthService/controller';
import './modules/Person/controller';
import './modules/Account/controller';
import './modules/CharacterEditor/controller';

import { BaseEventHandler } from '../shared/BaseEvents/BaseEventHandler';
import { AuthSessionHandler } from './modules/AuthService/AuthSessionHandler';
import { initializePlayerEventBus } from './modules/AuthService/utils';

BaseEventHandler.get('auth:startsesstion').addHandler((player: PlayerMp) => {
    player.tempValues = {};
    initializePlayerEventBus(player);
    AuthSessionHandler.create(player);
}, 0);