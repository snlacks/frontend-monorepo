import { useContext } from "react";
import { LoginContext } from "./login-provider";
import RequestOtp from "./request-otp";
import { OtpForm } from "./otp-form";

export const LoginMultiForm = () => {
  const { usernameRequested } = useContext(LoginContext);
  return usernameRequested ? <OtpForm /> : <RequestOtp />;
};
