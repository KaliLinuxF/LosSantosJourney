import { BaseEventHandler } from "../../../../shared/BaseEvents/BaseEventHandler";
import { NotificationPositions, NotificationTypes } from "../../../../shared/notifications/types";
import { showNotify } from "./notify";

BaseEventHandler.get('notify:show')
.addHandler((player: PlayerMp, type: NotificationTypes, text: string, duration: number, position: NotificationPositions) => {
    showNotify(player, type, text, duration, position);
}, 2);