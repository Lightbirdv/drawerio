export interface User {
    users_id: number;
    email: string;
    password: string;
    isAdmin: string;
    refreshtoken: string;
    forgottoken: string;
    forgotExpires: number;
    confirmationtoken: string;
    enabled: boolean;
}