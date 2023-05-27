import {NotificationsActionSend} from "./types";

export default {
	show: (payload: NotificationsActionSend) => ({ type: "notifications/send", payload }),
};
