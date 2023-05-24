import {NotificationPositions, NotificationTypes} from "../../../../shared/notifications/types";

export type Notification = {
	position: NotificationPositions
	id: number
	type: NotificationTypes
	text: string
	duration: number
}
