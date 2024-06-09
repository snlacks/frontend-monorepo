import { FormValuesWithPhoneNumber } from "@/utils/phone/types";
import { UseFormReturnType } from "@mantine/form";

export interface SmsOtpFormValues extends FormValuesWithPhoneNumber {
  username: string;
}

export interface PasswordOtpFormValues {
  username: string;
  password: string;
}

export type PasswordForm = UseFormReturnType<
  PasswordOtpFormValues,
  (values: PasswordOtpFormValues) => PasswordOtpFormValues
>;

export type SmsForm = UseFormReturnType<SmsOtpFormValues>;
