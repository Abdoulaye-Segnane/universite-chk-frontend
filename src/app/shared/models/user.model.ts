export interface UserModel {
    id?: number;
    username: string;
    role: 'ADMIN' | 'STUDENT';
}
