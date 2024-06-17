"use client";

import { useLocalStorage } from "@mantine/hooks";
import { LOGIN_USERNAME_KEY } from "@/app/login/login-username-key";
import { UpdatePassword } from "./update-password-form";

export default function Page() {
  const [username] = useLocalStorage({
    key: LOGIN_USERNAME_KEY,
  });
  return username ? <UpdatePassword username={username} /> : null;
}
