export enum NotificationTypes {
	Info,
	Error,
	Warning,
	Success,
}

export enum NotificationPositions {
	TopLeft,
}

export interface NotificationsActionSend {
	position: NotificationPositions
	type: NotificationTypes
	text: string
	duration: number
}
