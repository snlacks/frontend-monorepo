import { FormValuesWithPhoneNumber } from "@/utils/phone/types";

export type RegisterForm = {
    username: string;
    guestKeyId: string;
} & FormValuesWithPhoneNumber;