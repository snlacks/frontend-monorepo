import { UseFormReturnType } from "@mantine/form";
import { UpdatePasswordForm } from "./types";

export default class UpdatePasswordDTO {
  constructor(form: UseFormReturnType<UpdatePasswordForm>) {
    this.username = form.values.username
    this.new_password = form.values.newPassword
    this.old_password = form.values.oldPassword
  }
  username: string;
  old_password: string;
  new_password: string;
}