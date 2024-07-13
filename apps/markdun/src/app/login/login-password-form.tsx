"use client";
import { useState } from "react";
import {
  Button,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
  Text,
  PasswordInput,
  Notification,
  Checkbox,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter, useSearchParams } from "next/navigation";
import useSWRMutation from "swr/mutation";
import { LoginPasswordDTO, LoginPasswordSchema } from "@snlacks-fe/user";
import { LoginPasswordFormValues } from "@snlacks-fe/user/types";
import { loginPasswordFetcher } from "./login-password";
import { failedLoginMessage } from "./constants";
import { useSetAtom } from "jotai";
import { rememberMeAtom, usernameAtom } from "../../store/login";
import { notifications } from "@mantine/notifications";

export const LoginPasswordForm = () => {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const setRememberMe = useSetAtom(rememberMeAtom);
  const setUsername = useSetAtom(usernameAtom);

  const form = useForm<LoginPasswordFormValues>({
    mode: "controlled",
    initialValues: {
      username: "",
      password: "",
      remember_me: true,
    },
    validateInputOnBlur: true,
    validate: yupResolver(LoginPasswordSchema),
  });
  const [netErrors, setNetErrors] = useState<string[]>([]);
  const router = useRouter();

  const { data, trigger, isMutating } = useSWRMutation(
    "/auth/login-password",
    loginPasswordFetcher
  );

  return (
    <form
      onSubmit={form.onSubmit(async (_, e) => {
        e?.preventDefault();
        netErrors.forEach((id) => notifications.hide(id));
        setNetErrors([]);

        try {
          const d = await trigger(new LoginPasswordDTO(form));
          setUsername(form.values.username);
          setRememberMe(!!form.values.remember_me);
          if (!d.hasOwnProperty("user_id")) {
            router.push(
              `/login/verify${redirect ? `/?redirect=${redirect}` : ``}`
            );
          } else {
            if (redirect) {
              window.location.href = redirect;
            } else {
              router.push("/dashboard");
            }
          }
        } catch {
          const id = notifications.show({
            title: "Login",
            message: failedLoginMessage,
          });
          setNetErrors([...netErrors, id]);
        }
      })}
    >
      <Stack gap="lg" ta="left">
        {(data ?? isMutating) && <LoadingOverlay />}
        <TextInput
          label="Username (email)"
          type="email"
          withAsterisk
          placeholder="your@email.com"
          key={form.key("username")}
          {...form.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          withAsterisk
          placeholder="*******"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <Checkbox
          label="Remember me"
          key={form.key("remember_me")}
          {...form.getInputProps("remember_me", { type: "checkbox" })}
        />

        <Button type="submit" disabled={isMutating || !form.isValid()}>
          Sign in
        </Button>
        <Button variant="subtle" component="a" href="/login/code">
          Skip to passcode
        </Button>
        <Button variant="subtle" component="a" href="/login/sign-up">
          Sign up
        </Button>
        {isMutating && <LoadingOverlay />}
      </Stack>
    </form>
  );
};
