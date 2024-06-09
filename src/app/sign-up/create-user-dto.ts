import { getPhoneNumberFromForm } from "@/utils/phone/phone";
import { RegisterForm } from "./types";
import { FormWithPhoneNumber } from "@/utils/phone/types";


export class CreateUserDTO {
    constructor(form: FormWithPhoneNumber<RegisterForm>) {
        this.username = form.values.username;
        this.phone_number = getPhoneNumberFromForm(form)
        this.guest_key_id = form.values.guestKeyId;
    }
    username: string;
    phone_number: string;
    guest_key_id: string;
}