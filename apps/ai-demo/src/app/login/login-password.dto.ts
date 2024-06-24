import { PasswordForm } from "./types";

export class LoginPasswordDTO {
  constructor(form: PasswordForm) {
    const { values: { username, password } } = form
    this.username = username;
    this.password = password;
  }
  username: string;
  password?: string;
};