import { getPhoneNumberFromForm } from "@/utils/phone/phone";
import { PasswordForm, SmsForm } from "./types";

export class RequestOtpDTO {
    constructor(form: SmsForm | PasswordForm) {
        this.username = form.values.username;
        if ((form as SmsForm).values.regionalPhoneNumber) {
            this.phone_number = getPhoneNumberFromForm(form as SmsForm)
        }
        if (typeof (form as PasswordForm).values.password === "string") {
            this.password = (form as PasswordForm).values.password;
        }
    }
    username: string;
    phone_number?: string;
    password?: string
};