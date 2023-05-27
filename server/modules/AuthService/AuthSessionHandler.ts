import { AuthSession } from "./AuthSession";

const sessionStorage = new Set<AuthSession>();

export class AuthSessionHandler {
    static create(player: PlayerMp) {
        sessionStorage.add(new AuthSession(player));
    }

    static get(player: PlayerMp) {
        return [...sessionStorage].find((item) => item.player.id === player.id);
    }

    static remove(session: AuthSession) {
        if(sessionStorage.has(session)) {
            sessionStorage.delete(session);
        }
    }
}