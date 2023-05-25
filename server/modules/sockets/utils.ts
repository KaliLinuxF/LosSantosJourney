import { Socket } from "socket.io";

export const playerSockets: Map<string, number> = new Map<string, number>();
export type SocketCustomInstance = { socket: Socket, aliveTimestamp: number, playerId: number | null, hash: string | null };
export const socketsPool: SocketCustomInstance[] = [];