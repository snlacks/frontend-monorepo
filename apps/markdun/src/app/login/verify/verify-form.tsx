"use client";
import {
  Stack,
  Button,
  TextInput,
  PinInput,
  Group,
  Alert,
  Checkbox,
  LoadingOverlay,
} from "@mantine/core";
import { useState } from "react";
import { useForm, yupResolver } from "@mantine/form";
import useSWRMutation from "swr/mutation";
import { useAtomValue } from "jotai";
import { useRouter, useSearchParams } from "next/navigation";

import { LoginPasswordSchema, VerifyDTO } from "@snlacks-fe/user";

import { failedLoginMessage } from "../constants";
import { rememberMeAtom, usernameAtom, verifyMethodAtom } from "@/store/login";
import { verifyOtpFetcher } from "./verify";
import { notifications } from "@mantine/notifications";

export default function VerifyForm() {
  const router = useRouter();
  const username = useAtomValue(usernameAtom);
  const rememberMe = useAtomValue(rememberMeAtom);
  const searchParams = useSearchParams();
  const verifyMethod = useAtomValue(verifyMethodAtom);
  const redirect = searchParams.get("redirect");
  const form = useForm({
    mode: "controlled",
    initialValues: {
      username: username,
      password: "",
      remember_me: rememberMe,
    },
    validate: yupResolver(LoginPasswordSchema),
  });
  const [netErrors, setNetErrors] = useState<string[]>([]);

  const { trigger, isMutating } = useSWRMutation(
    "/auth/login",
    verifyOtpFetcher
  );

  return (
    <>
      <Alert
        color="green"
        title={`Your code has been sent via ${verifyMethod}`}
      />
      <form
        onSubmit={form.onSubmit(async (_, e) => {
          e?.preventDefault();
          netErrors.forEach((id) => notifications.hide(id));
          setNetErrors([]);
          try {
            const data = await trigger(new VerifyDTO(form));
            if (data.hasOwnProperty("user_id")) {
              if (redirect) {
                window.location.href = redirect;
              } else {
                router.push("/dashboard");
              }
            } else {
              throw "No user";
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
        <Stack gap="lg">
          <TextInput
            label="Username"
            disabled
            key={form.key("username")}
            {...form.getInputProps("username")}
            value={username}
          />
          <PinInput
            length={6}
            size="lg"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Checkbox
            label="Remember me"
            key={form.key("remember_me")}
            {...form.getInputProps("remember_me", { type: "checkbox" })}
          />

          <Group gap="sm">
            <Button type="submit" disabled={isMutating}>
              Submit
            </Button>
            <Button
              variant="subtle"
              disabled={isMutating}
              component="a"
              href="/login/code"
            >
              Request new code
            </Button>
            {isMutating && <LoadingOverlay />}
          </Group>
        </Stack>
      </form>
    </>
  );
}
