import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import SceneHandler from "../SceneHandler/SceneHandler";
import { authScene } from "../SceneHandler/scenes/authScene";
import authApi from '../../../shared/auth/api';
import rpc from '../../../shared/rpc';
import { PlayerController } from "../CharacterCreator/PlayerController";

BaseEventHandler.get('auth:clientpreset').addHandler(() => {
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.gui.chat.show(false);
    mp.nametags.enabled = false
    mp.players.local.position = new mp.Vector3(-326.2754, 639.0650, 172.8681);
    mp.players.local.setAlpha(0);

    rpc.callBrowsers('executeRpc', authApi.show({ disclaimerDuration: 4 }));
    
    SceneHandler.startScene(authScene);
}, 0);

BaseEventHandler.get('auth:success').addHandler(() => {
    rpc.callBrowsers('executeRpc', authApi.hide());

    mp.gui.cursor.show(false, false);
    mp.game.ui.displayRadar(true);
    mp.gui.chat.show(true);
    mp.players.local.position = new mp.Vector3(-326.2754, 639.0650, 172.8681);
    mp.players.local.setAlpha(255);

    SceneHandler.endScene();

    const positions = [{ position: new mp.Vector3(-324.0053, 604.0095, 172.4014), heading: 172 }]
    const playerController = new PlayerController(positions, {
        animation: {
            positionIdx: 0,
            dict: 'timetable@denice@ig_1',
            name: 'idle_b'
        }
    });

    playerController.init();

    mp.game.graphics.notify('Welcome to the club, budy');
}, 1);