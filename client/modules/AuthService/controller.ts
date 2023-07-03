import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import SceneHandler from "../SceneHandler/SceneHandler";
import { authScene } from "../SceneHandler/scenes/authScene";
import authApi from '../../../shared/auth/api';
import rpc from '../../../shared/rpc';

BaseEventHandler.get('auth:clientpreset').addHandler(() => {
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.gui.chat.show(false);
    mp.nametags.enabled = false
    mp.players.local.position = new mp.Vector3(-326.2754, 639.0650, 172.8681);

    rpc.callBrowsers('executeRpc', authApi.show({ disclaimerDuration: 10 }));
    
    SceneHandler.startScene(authScene);
}, 0);

BaseEventHandler.get('auth:success').addHandler(() => {
    rpc.callBrowsers('executeRpc', authApi.hide());
}, 1);