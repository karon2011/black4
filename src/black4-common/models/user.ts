import { Role } from './role';

export class User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: any;
    // firstname: string;
    // lastname: string;
    // birthday?: Date;
    token?: string;
    // apiTokens?: {
    //     id: number,
    //     token: string,
    //     expiresAt: Date,
    // };
}