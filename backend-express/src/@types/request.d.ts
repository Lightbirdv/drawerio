declare namespace Express {
	export interface Request {
		user?: {
			user?: string;
			iat?: number;
			isadmin?: boolean;
		};
		drawer?;
	}
}
