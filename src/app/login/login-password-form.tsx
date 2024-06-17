"use client";
import { useLayoutEffect, useState } from "react";
import {
  Button,
  Group,
  LoadingOverlay,
  Stack,
  TextInput,
  Text,
  PasswordInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import useSWRMutation from "swr/mutation";
import Link from "next/link";
import { LoginPasswordFormValues } from "./types";
import { axiosPost } from "@/utils/fetch/axios-post";
import useUser from "@/hooks/use-user";
import { ErrorMessage } from "@/components/error-message";
import { useLocalStorage } from "@mantine/hooks";
import { SmsResponse, UserResponse } from "@/types";
import { LOGIN_USERNAME_KEY } from "./login-username-key";
import { LoginPasswordDTO } from "./login-password.dto";
import { failedLoginMessage } from "./constants";

const passwordSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const LoginPasswordForm = () => {
  const [, setUsernameStorage, removeUsernameStorage] = useLocalStorage({
    key: LOGIN_USERNAME_KEY,
  });
  const { mutate } = useUser();
  const form = useForm<LoginPasswordFormValues>({
    mode: "controlled",
    initialValues: {
      username: "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: yupResolver(passwordSchema),
  });
  const [netError, setNetError] = useState<string | undefined>();
  const router = useRouter();

  const { data, trigger, isMutating } = useSWRMutation(
    "/auth/login-password",
    axiosPost<LoginPasswordDTO, UserResponse | SmsResponse>
    // {
    //   onSuccess: (d: UserResponse | SmsResponse) => {
    //     d.hasOwnProperty("user_id") ?? router.push("/ai-chat");
    //   },
    // }
  );
  useLayoutEffect(() => {
    removeUsernameStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form
      onSubmit={form.onSubmit(async (_, e) => {
        e?.preventDefault();
        setNetError(undefined);
        try {
          const d = await trigger(new LoginPasswordDTO(form));
          setUsernameStorage(form.values.username);
          if (d.hasOwnProperty("user_id")) {
            await mutate();
            router.push("/chat");
          } else {
            router.push("/login/verify-otp?method=email");
          }
        } catch {
          setNetError(failedLoginMessage);
        }
      })}
    >
      <Stack p="lg" gap="lg">
        {(data ?? isMutating) && <LoadingOverlay />}
        <TextInput
          label="Username (email)"
          type="email"
          withAsterisk
          placeholder="your@email.com"
          {...form.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          withAsterisk
          placeholder="*******"
          {...form.getInputProps("password")}
        />

        <ErrorMessage
          errorMessage={netError}
          onClose={() => setNetError(undefined)}
        />
        <Group gap="sm" justify="center">
          <Button type="submit" disabled={isMutating || !form.isValid()}>
            Sign in
          </Button>
          <Button variant="subtle" component="a" href="/login/request-otp">
            Skip to passcode
          </Button>
        </Group>
      </Stack>
      <Text>
        <Link href={"/sign-up"}>Sign up</Link>
      </Text>
    </form>
  );
};
