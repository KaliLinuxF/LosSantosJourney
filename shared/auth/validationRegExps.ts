export interface IValidationRegExp {
	Length: RegExp
	AllowedChars: RegExp
}

interface IValidationRegExps {
	username: IValidationRegExp
	password: IValidationRegExp
	mail: IValidationRegExp
}

export const ValidationRegExps: IValidationRegExps = {
	username: {
		Length: /^\w{3,25}$/,
		AllowedChars: /^[a-z0-9]$/i,
	},
	password: {
		Length: /^\w{6,18}$/,
		AllowedChars: /^[a-z0-9.,!?@#$%^&*()_\-+={}\[\]/\\;:]$/i,
	},
	mail: {
		Length: /^\w{3,25}$/,
		AllowedChars: /^\w+@[a-z_]+?\.[a-z]{2,3}$/i,
	},
}
