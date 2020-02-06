export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    roles: [];
    birthday?: Date;
    token?: string;
}