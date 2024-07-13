import { getPhoneNumberFromForm } from "./phone";
import { OtpFormValues } from "./types";

export class RequestOtpDTO {
  constructor(form: { values: OtpFormValues }) {
    const {
      values: { method, username },
    } = form;
    this.username = username;
    this.method = method;
    if (method === "sms") {
      this.phone_number = getPhoneNumberFromForm(form);
    }
  }
  username: string;
  phone_number?: string;
  password?: string;
  method: string;
}
