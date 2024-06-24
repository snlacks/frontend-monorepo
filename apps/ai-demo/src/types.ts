
export interface Role {
    roleId: string;
    roleName: string;
}

export interface UserResponse {
    user_id: string;
    username: string;
    phone_number: string;
    roles: { role_id: string; role_name: string }[];
}

export interface SmsResponse {
    body: string;
    errorMessage: string | null;
    oneTimePassword: string;
}
