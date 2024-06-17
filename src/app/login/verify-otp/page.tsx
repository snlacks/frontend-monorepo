"use client";
import { Stack, Button, TextInput, PinInput, Group, Text } from "@mantine/core";
import { useState } from "react";
import { ErrorMessage } from "@/components/error-message";
import { useForm, yupResolver } from "@mantine/form";
import { LoginDTO } from "./login-dto";
import useSWRMutation from "swr/mutation";
import { axiosPost } from "@/utils/fetch/axios-post";
import useUser from "@/hooks/use-user";
import * as yup from "yup";

import { failedLoginMessage } from "../constants";
import { UserResponse } from "@/types";
import { User } from "@/User";
import { useRouter, useSearchParams } from "next/navigation";
import classes from "./page.module.css";
import { useLocalStorage } from "@mantine/hooks";
import { LOGIN_USERNAME_KEY } from "../login-username-key";

const loginSchema = yup.object().shape({
  username: yup.string().email(),
  password: yup.string(),
});

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [username, , removeUsername] = useLocalStorage({
    key: LOGIN_USERNAME_KEY,
  });
  const { mutate: refreshUser } = useUser();
  const [netError, setNetError] = useState<string>();
  const form = useForm({
    mode: "controlled",
    initialValues: { username, password: "" },
    validate: yupResolver(loginSchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    "/auth/login",
    axiosPost<LoginDTO, UserResponse>
  );

  return (
    <>
      <Text>
        Your code has been sent via{" "}
        {searchParams.get("method") === "email" ? "email" : "sms"}
      </Text>
      <form
        onSubmit={form.onSubmit(async (_, e) => {
          e?.preventDefault();
          try {
            const data = await trigger(
              new LoginDTO({ ...form, values: { ...form.values, username } })
            );
            if (data) {
              refreshUser(new User(data))
                .then(() => {
                  removeUsername();
                  router.push("/chat");
                })
                .catch(() => {
                  throw "";
                });
            }
          } catch {
            setNetError(failedLoginMessage);
          }
        })}
      >
        <Stack p="lg" gap="lg">
          <TextInput
            label="Username"
            className={classes.username}
            disabled
            {...form.getInputProps("username")}
            value={username}
          />
          <PinInput
            className={classes.pin}
            length={6}
            {...form.getInputProps("password")}
          />
          <Group gap="sm" justify="center">
            <Button type="submit" disabled={isMutating}>
              Submit
            </Button>
            <Button
              variant="subtle"
              disabled={isMutating}
              component="a"
              href="/login/request-otp"
            >
              Request new code
            </Button>
          </Group>
        </Stack>
      </form>
      <ErrorMessage
        errorMessage={netError}
        onClose={() => setNetError(undefined)}
      />
    </>
  );
}
