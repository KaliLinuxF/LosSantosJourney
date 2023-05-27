type AuthValidationRegExp = {
	Length?: RegExp
	AllowedChars: RegExp
}

type ValidationRegExps = {
	usernameRegExps: AuthValidationRegExp
	passwordRegExps: AuthValidationRegExp
	mailRegExps: AuthValidationRegExp
}

export const AuthValidationRegExps: ValidationRegExps = {
	usernameRegExps: {
		Length: /^\w{3,25}$/,
		AllowedChars: /^[a-z0-9]+$/i,
	},
	passwordRegExps: {
		Length: /^\w{6,18}$/,
		AllowedChars: /^[a-z0-9.,!?@#$%^&*()_\-+={}\[\]/\\;:]+$/i,
	},
	mailRegExps: {
		AllowedChars: /^\w+@[a-z_]+?\.[a-z]{2,3}$/i,
	},
}