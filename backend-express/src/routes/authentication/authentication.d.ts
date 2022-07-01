export interface User {
	users_id: number;
	email: string;
	password: string;
	refreshToken: string;
	isadmin: boolean;
}

export interface UncodedToken {
	user: string;
	iat: number;
	exp: number;
}