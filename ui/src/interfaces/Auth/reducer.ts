import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PageIds} from "./types";
import {IAuthActionShow} from "../../../../shared/auth/types";

interface AuthState {
	isOpen: boolean
	page: PageIds
	disclaimerDuration: number
}

const initialState: AuthState = {
	isOpen: false,
	page: PageIds.Disclaimer,
	disclaimerDuration: 7,
}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		show(state, action: PayloadAction<IAuthActionShow>) {
			state.isOpen = true
			const { disclaimerDuration } = action.payload
			state.disclaimerDuration = disclaimerDuration
			state.page = disclaimerDuration ? PageIds.Disclaimer : PageIds.SignIn
		},
		hide(state) {
			state.isOpen = false
		},
		setPage(state, action: PayloadAction<PageIds>) {
			state.page = action.payload
		}
	},
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions
