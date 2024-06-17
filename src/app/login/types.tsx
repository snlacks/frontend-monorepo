import { FormValuesWithPhoneNumber } from "@/utils/phone/types";
import { UseFormReturnType } from "@mantine/form";

export interface OtpFormValues extends FormValuesWithPhoneNumber {
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
