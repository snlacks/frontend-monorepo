"use client";
import {
  Stack,
  Button,
  Title,
  TextInput,
  PinInput,
  Group,
} from "@mantine/core";
import { useContext, useState } from "react";
import { ErrorMessage } from "@/components/error-message";
import { useForm, yupResolver } from "@mantine/form";
import { LoginDTO } from "./login-dto";
import useSWRMutation from "swr/mutation";
import { axiosPost } from "@/utils/fetch/axios-post";
import useUser from "@/hooks/use-user";
import * as yup from "yup";

import { failedLoginMessage } from "./constants";
import { UserResponse } from "@/types";
import { User } from "@/User";
import { LoginContext } from "./login-provider";
import { useRouter } from "next/navigation";
import classes from "./otp-form.module.css";

const loginSchema = yup.object().shape({
  username: yup.string().email(),
  password: yup.string(),
});

export const OtpForm = () => {
  const router = useRouter();
  const { mutate: refreshUser } = useUser();
  const [netError, setNetError] = useState<string>();
  const { usernameRequested, setHasPasscode } = useContext(LoginContext);
  const form = useForm({
    mode: "controlled",
    initialValues: { username: usernameRequested ?? "", password: "" },
    validate: yupResolver(loginSchema),
  });
  const { trigger, isMutating } = useSWRMutation(
    "/auth/login",
    axiosPost<LoginDTO, UserResponse>
  );
  return (
    <>
      <Title order={2}>Sign In</Title>
      <form
        onSubmit={form.onSubmit(async (_, e) => {
          e?.preventDefault();
          try {
            const data = await trigger(new LoginDTO(form));
            if (data) {
              refreshUser(new User(data))
                .then(() => {
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
            {...form.getInputProps("username")}
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
              onClick={() => setHasPasscode(false)}
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
};
