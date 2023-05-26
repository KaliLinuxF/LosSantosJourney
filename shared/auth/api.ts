import {AuthActionShowPayload} from "./types";

export enum AuthApiEventNames {
	SignIn = 'auth::signIn',
	SignUp = 'auth::signUp',
	RecoveryEmail = 'auth::recoveryEmail',
	RecoveryCode = 'auth::recoveryCode',
	RecoveryPassword = 'auth::recoveryPassword',
}

export type AuthApiSignInData = {
		username: string
		password: string
}

export type AuthApiSignUpData = {
	username: string
	password: string
	email: string
	promocode: string
}

export type AuthApiRecoveryEmail = {
	email: string
}

export type AuthApiRecoveryCode = {
	code: string
}

export type AuthApiRecoveryPassword = {
	password: string
}

export const authRpc = {
	show: (payload: AuthActionShowPayload) => ({ type: "auth/show", payload }),
	hide: () => ({ type: "auth/hide" }),
};
