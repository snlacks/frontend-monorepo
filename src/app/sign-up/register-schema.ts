
import * as yup from "yup";
import { RegisterForm } from "./types";
import { phoneUtility } from "@/utils/phone/phone";

const required = "Required";

export const registerSchema = yup.object<RegisterForm>({
    username: yup
        .string()
        .email("Username must be a valid email")
        .required(required),
    guest_key_id: yup.string().uuid("Must be a valid key").required(required),
    country_code: yup.string().required(required),
    regional_phone_number: yup
        .string()
        .required(required)
        .test(
            "phone_number",
            ({ value }) => `${value} is not a valid phone number`,
            (regional_phone_number, ctx) => {
                try {
                    return (
                        !regional_phone_number ||
                        phoneUtility.isValidNumberForRegion(
                            phoneUtility.parseAndKeepRawInput(
                                regional_phone_number,
                                ctx.parent.country_code
                            ),
                            ctx.parent.country_code
                        )
                    );
                } catch {
                    return false;
                }
            }
        ),
});