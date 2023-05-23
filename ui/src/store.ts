import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {authReducer} from "./interfaces/Auth/reducer";
import {notificationsReducer} from "./interfaces/Notifications/reducer";

const rootReducer = combineReducers({
	auth: authReducer,
	notifications: notificationsReducer,
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
