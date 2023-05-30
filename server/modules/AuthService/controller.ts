import { AuthApiEventNames, AuthApiSignInData, AuthApiSignUpData } from "../../../shared/auth/api";
import { BaseEventHandler } from "../../../shared/BaseEvents/BaseEventHandler";
import { AccountHandler } from "../Account/AccountHandler";
import { AuthSessionHandler } from "./AuthSessionHandler";

BaseEventHandler.get(AuthApiEventNames.SignIn).addHandler((player: PlayerMp, jsonData: string) => {
    const authSession = AuthSessionHandler.get(player);

    if(!authSession) {
        return;
    }

    const data: AuthApiSignInData = JSON.parse(jsonData);
    authSession.onPlayerTryLogin(data.username, data.password);
}, 1);

BaseEventHandler.get(AuthApiEventNames.SignUp).addHandler((player: PlayerMp, jsonData: string) => {
    const authSession = AuthSessionHandler.get(player);

    if(!authSession) {
        return;
    }

    const data: AuthApiSignUpData = JSON.parse(jsonData);
    authSession.onPlayerTryRegister(data.username, data.password, data.repass, data.email, data.promocode);
}, 1);

BaseEventHandler.get('playerBeforeQuit').addHandler((player: PlayerMp) => {
    const authSession = AuthSessionHandler.get(player);

    if(authSession) {
        AuthSessionHandler.remove(authSession.id);
    }
}, 0);