import { UseFormReturnType } from "@mantine/form";

export type FormWithPhoneNumber<T extends FormValuesWithPhoneNumber> = UseFormReturnType<
    T,
    (values: T) => T
>
export interface FormValuesWithPhoneNumber {
    regionalPhoneNumber: string;
    countryCode: string;
};
