import { AuthStatus } from "./AuthStatus";
import { authConfig } from "./config";

export type AccountInstance = {
    id: number,
    login: string,
    password: string,
    lasLoginIp: string,
    registrationData: number,
    email: string,
    promoCode: string,
    donat: number,
    socialClub: string,
    serial: string
}

export class AuthSession {
    private status: AuthStatus;
    private readonly player: PlayerMp;
    private sessionTimeout: NodeJS.Timeout | null = null;
    private readonly sessionTimeoutTime: number;
    private flood: number;
    
    constructor(player: PlayerMp) {
        this.player = player;
        this.flood = 0;
        this.sessionTimeoutTime = authConfig.authTimeout * 60;
    }

    private startSession() {
        this.player.accountInstance = null;
        this.player.call('auth:clientpreset');
    }

    private finishSession() {
        switch(this.status) {
            
        }
    }

    private restartTimeout() {
        if(this.sessionTimeout) {
            clearTimeout(this.sessionTimeout);
            this.sessionTimeout = null;
        }

        this.sessionTimeout = setTimeout(() => {
            this.finishSession();
        }, this.sessionTimeoutTime);
    }


}