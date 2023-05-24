import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Notification} from "./types";
import {NotificationsActionSend, NotificationPositions} from "../../../../shared/notifications/types";

type NotificationsState = {
	iterator: number
	list: Notification[]
	rendered: number[]
}

const initialState: NotificationsState = {
	iterator: 0,
	list: [],
	rendered: [],
}

export const notificationsSlice = createSlice({
	name: 'notifications',
	initialState,
	reducers: {
		send(state, action: PayloadAction<NotificationsActionSend>) {
			const {position, type, text, duration} = action.payload
			switch (position) {
				case NotificationPositions.TopLeft: {
					const id = state.iterator++
					state.list.push({position, id, type, text, duration})
					state.rendered.push(id)
					setTimeout(() => {
						// @ts-ignore
						window.removeNotify(id)
					}, duration * 1000)
					break
				}
			}
		},
		removeFromRendered(state, action: PayloadAction<number>) {
			const id = action.payload
			const index = state.rendered.indexOf(id)
			if (!~index) return
			state.rendered.splice(index, 1)
		},
		removeFromList(state, action: PayloadAction<number>) {
			const id = action.payload
			const index = state.list.findIndex(notify => notify.id === id)
			if (!~index) return
			state.list.splice(index, 1)
		}
	},
})

export const notificationsReducer = notificationsSlice.reducer
export const notificationsActions = notificationsSlice.actions
