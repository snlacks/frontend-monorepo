import * as yup from "yup";
import { requiredMessage } from "@/constants";
import { CreateUserFormValues } from "@snlacks-fe/user/types";
import { withPhoneValidationSchema } from "@snlacks-fe/user";

export const registerSchema = yup.object<CreateUserFormValues>({
  username: yup
    .string()
    .email("Username must be a valid email")
    .required(requiredMessage),
  ...withPhoneValidationSchema(),
});
