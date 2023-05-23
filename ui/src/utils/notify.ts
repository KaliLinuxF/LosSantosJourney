import {Notification} from "../interfaces/Notifications/types";

type SendNotification = Omit<Notification, 'id'>

export const sendNotify = (notify: SendNotification) => {
	// @ts-ignore
	window.sendNotify(notify)
}
