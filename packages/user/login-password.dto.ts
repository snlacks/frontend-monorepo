import { LoginPasswordForm } from "./types";

export class LoginPasswordDTO {
  constructor(form: LoginPasswordForm) {
    const {
      values: { username, password, remember_me },
    } = form;
    this.username = username;
    this.password = password;
    this.remember_me = !!remember_me;
  }
  username: string;
  password: string;
  remember_me: boolean;
}
