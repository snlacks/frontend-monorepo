import { phoneUtility } from "@/utils/phone/phone";
import { RegisterForm } from "./types";


export class CreateUserDTO {
    constructor(formValues: RegisterForm) {
        this.username = formValues.username;
        this.phone_number = phoneUtility.formatOutOfCountryCallingNumber(
            phoneUtility.parse(
                formValues.regional_phone_number,
                formValues.country_code
            )
        );
        this.guest_key_id = formValues.guest_key_id;
    }
    username: string;
    phone_number: string;
    guest_key_id: string;
}