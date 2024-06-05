"use client";
import axios from "axios";
import { UseFormReturnType } from "@mantine/form";
import { PropsWithChildren, createContext } from "react";
import useSWRMutation from "swr/mutation";
import { LoginForm, RequestOTPForm, useAuthForms } from "./use-auth-forms";

export type Role = {
  role_id: string;
  role_name: string;
};

export type User = {
  user_id: string;
  username: string;
  phoneNumber: string;
  roles: Role[];
};

export type IdentityContextValueType = {
  username?: string;
  roles?: Role[];
  oneTimePassword?: string;
  oneTimePasswordError?: string;
  loginRequestError?: string;
  requestOneTimePassword: () => void;
  requestLogin: () => void;
  otpFormContext: UseFormReturnType<RequestOTPForm>;
  loginFormContext: UseFormReturnType<LoginForm>;
};
export const IdentityContext = createContext<IdentityContextValueType>(
  {} as any
);

export const IdentityProvider = ({ children }: PropsWithChildren) => {
  const { otpFormContext, loginFormContext } = useAuthForms();

  const fetchOneTimePassword = (path: string) =>
    axios
      .post<undefined>(
        `${process.env.NEXT_PUBLIC_AUTH_SERVER}/${path}`,
        otpFormContext.values
      )
      .then((res) => res.data);

  const fetchSubmitPassword = (path: string) =>
    axios
      .post<User>(
        `${process.env.NEXT_PUBLIC_AUTH_SERVER}${path}`,
        otpFormContext.values
      )
      .then((res) => res.data);

  const { trigger: triggerOTP, error: otpError } = useSWRMutation(
    "/auth/request-otp",
    fetchOneTimePassword
  );

  const {
    trigger: triggerLogin,
    error: loginError,
    data: user,
  } = useSWRMutation<User>("/auth/login", fetchSubmitPassword);
  if (otpError) {
    return <div>Authentication Error</div>;
  }
  return (
    <IdentityContext.Provider
      value={{
        username: user?.username,
        roles: user?.roles,
        loginRequestError: loginError
          ? "There was a problem logging in"
          : undefined,
        oneTimePasswordError: otpError
          ? "There was a problem with the request for the one time password."
          : undefined,
        requestOneTimePassword: triggerOTP as () => void,
        requestLogin: triggerLogin as () => void,
        otpFormContext,
        loginFormContext,
      }}
    >
      {user?.username ? children : "login screen"}
    </IdentityContext.Provider>
  );
};
