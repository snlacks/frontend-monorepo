import { PasswordForm } from "../types";

export class LoginDTO {
    constructor(form: PasswordForm) {
        this.username = form.values.username;
        this.one_time_password = form.values.password;
    }
    username: string;
    one_time_password: string;
};