export interface HasPhoneNumbers {
  regionalPhoneNumber: string;
  countryCode: string;
}
export interface CreateUserForm {
  values: CreateUserFormValues;
}
export interface CreateUserFormValues {
  username: string;
  password: string;
  regionalPhoneNumber: string;
  countryCode: string;
}
export interface OtpFormValues extends HasPhoneNumbers {
  username: string;
  method: string;
  regionalPhoneNumber: string;
  countryCode: string;
}

export interface Role {
  roleId: string;
  roleName: string;
}

export interface UserResponse {
  user_id: string;
  username: string;
  phone_number: string;
  roles: { role_id: string; role_name: string }[];
}

export interface LoginPasswordFormValues {
  username: string;
  password: string;
  remember_me?: boolean;
}

export type VerifyForm = {
  values: LoginPasswordFormValues;
};

export interface LoginPasswordForm {
  values: LoginPasswordFormValues;
}
