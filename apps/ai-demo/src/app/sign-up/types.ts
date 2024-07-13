import { HasPhoneNumbers } from "@snlacks-fe/user/types";

export type RegisterForm = {
  username: string;
  password: string;
} & HasPhoneNumbers;
