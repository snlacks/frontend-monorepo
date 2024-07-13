import { VerifyForm } from "./types";

export class VerifyDTO {
  constructor(form: VerifyForm) {
    this.username = form.values.username;
    this.one_time_password = form.values.password;
    this.remember_me = !!form.values.remember_me;
  }
  username: string;
  one_time_password: string;
  remember_me: boolean;
}
