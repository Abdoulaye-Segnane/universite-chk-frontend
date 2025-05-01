export interface LoginRequestModel {
    username: string;
    password: string;
    email?: string;
    rememberMe?: boolean;
}
