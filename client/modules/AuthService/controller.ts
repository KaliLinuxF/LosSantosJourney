import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import SceneHandler from "../SceneHandler/SceneHandler";
import { authScene } from "../SceneHandler/scenes/authScene";
import authApi, { AuthApiEventNames, AuthApiSignInData, AuthApiSignUpData } from '../../../shared/auth/api';
import rpc from '../../../shared/rpc';
import Events from "../utils/Events";

BaseEventHandler.get('auth:clientpreset').addHandler(() => {
    mp.gui.cursor.show(true, true);
    mp.game.ui.displayRadar(false);
    mp.gui.chat.show(false);
    mp.nametags.enabled = false
    mp.players.local.position = new mp.Vector3(-326.2754, 639.0650, 172.8681);
    mp.players.local.setAlpha(0);

    rpc.callBrowsers('executeRpc', authApi.show({ disclaimerDuration: 10 }));
    
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
    
    mp.game.graphics.notify('Welcome to the club, budy');
}, 1);

rpc.register(AuthApiEventNames.SignIn, (data: AuthApiSignInData) => {
    Events.callRemote('auth:signIn', JSON.stringify(data));
});

rpc.register(AuthApiEventNames.SignUp, (data: AuthApiSignUpData) => {
    Events.callRemote('auth:signUp', JSON.stringify(data));
});