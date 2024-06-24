import { Role, UserResponse } from "./types";


export class User {
    constructor(user: UserResponse) {
        this.userId = user.user_id;
        this.username = user.username;
        this.phoneNumber = user.phone_number;
        this.roles = user.roles.map(({ role_id: roleId, role_name: roleName }) => ({
            roleId,
            roleName,
        }));
    }
    userId: string;
    username: string;
    phoneNumber: string;
    roles: Role[];
}