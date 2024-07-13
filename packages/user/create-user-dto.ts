import { getPhoneNumberFromForm } from "./phone";
import { CreateUserForm } from "./types";

export class CreateUserDTO {
  constructor(form: CreateUserForm) {
    this.username = form.values.username;
    this.phone_number = getPhoneNumberFromForm(form);
    this.password = form.values.password;
  }
  username: string;
  phone_number: string;
  password: string;
}
