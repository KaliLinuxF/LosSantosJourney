import { AuthSession } from "./AuthSession";

const sessionStorage = new Map<number, AuthSession>();
let idGenerator = 0;

export class AuthSessionHandler {
    static create(player: PlayerMp) {
        const id = idGenerator++;
        sessionStorage.set(id, new AuthSession(id, player));
    }

    static get(player: PlayerMp) {
        return [...sessionStorage.values()].find((item) => item.player.id === player.id);
    }

    static remove(id: number) {
        if(sessionStorage.has(id)) {
            sessionStorage.delete(id);
        }
    }
}