
import * as yup from "yup";
import { RegisterForm } from "./types";
import { withPhoneValidationSchema } from "@/utils/phone/phone";
import { requiredMessage } from "@/constants";

export const registerSchema = yup.object<RegisterForm>({
    username: yup
        .string()
        .email("Username must be a valid email")
        .required(requiredMessage),
    guestKeyId: yup.string().uuid("Must be a valid key").required(requiredMessage),
    ...withPhoneValidationSchema()
});