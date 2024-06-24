import { getPhoneNumberFromForm } from "@/utils/phone/phone";
import { SmsForm } from "./types";

export class RequestOtpDTO {
    constructor(form: SmsForm) {
        const { values: { method, username } } = form
        this.username = username;
        this.method = method === 'sms' ? 'sms' : 'email';
        this.phone_number = getPhoneNumberFromForm(form)

    }
    username: string;
    phone_number?: string;
    password?: string;
    method: 'sms' | 'email';
};