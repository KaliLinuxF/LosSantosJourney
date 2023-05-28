import { NotificationPositions, NotificationTypes } from "../../../../shared/notifications/types";
import rpc from "../../../../shared/rpc";
import NotifyApi from "../../../../shared/notifications/api";

export function showNotify(player: PlayerMp, type: NotificationTypes, text: string, duration: number = 4, position: NotificationPositions = NotificationPositions.TopLeft) {
    rpc.callBrowsers(player, 'executeRpc', NotifyApi.show({ 
        position,
        duration,
        text,
        type
    }));
}