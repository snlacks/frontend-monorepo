import * as yup from "yup";
import { CreateUserFormValues } from "@snlacks-fe/user/types";
import { withPhoneValidationSchema } from "@snlacks-fe/user";

export const RegisterSchema = yup.object<CreateUserFormValues>({
  username: yup.string().email("Username must be a valid email").required(),
  ...withPhoneValidationSchema(),
});
