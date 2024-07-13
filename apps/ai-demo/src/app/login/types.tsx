import { UseFormReturnType } from "@mantine/form";
import { HasPhoneNumbers } from "@snlacks-fe/user/types";

export interface OtpFormValues extends HasPhoneNumbers {
  username: string;
  method: string;
}

export interface LoginPasswordFormValues {
  username: string;
  password: string;
}

export type PasswordForm = UseFormReturnType<
  LoginPasswordFormValues,
  (values: LoginPasswordFormValues) => LoginPasswordFormValues
>;

export type SmsForm = UseFormReturnType<OtpFormValues>;
