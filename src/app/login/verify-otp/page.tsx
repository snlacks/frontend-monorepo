"use client";

import { useLocalStorage } from "@mantine/hooks";
import { LOGIN_USERNAME_KEY } from "../login-username-key";

export default function VerifyOtp() {
  const [username] = useLocalStorage({
    key: LOGIN_USERNAME_KEY,
  });
  return username ? <VerifyOtp /> : null;
}
