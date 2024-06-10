import { useContext } from "react";
import { LoginContext } from "./login-provider";
import RequestOtp from "./request-otp";
import { OtpForm } from "./otp-form";

export const LoginMultiForm = () => {
  const { hasPasscode } = useContext(LoginContext);
  return hasPasscode ? <OtpForm /> : <RequestOtp />;
};
