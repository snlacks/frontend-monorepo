import { FormValuesWithPhoneNumber } from "@/utils/phone/types";

export type RegisterForm = {
    username: string;
    password: string;
} & FormValuesWithPhoneNumber;