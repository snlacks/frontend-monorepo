"use client";
import {
  Stack,
  Button,
  TextInput,
  PinInput,
  Group,
  Text,
  Alert,
} from "@mantine/core";
import { use, useState } from "react";
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
import classes from "./verify-otp-form.module.css";

const loginSchema = yup.object().shape({
  username: yup.string().email(),
  password: yup.string(),
});

export default function VerifyOtp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { mutate: refreshUser } = useUser();
  const [netError, setNetError] = useState<string>();
  const form = useForm({
    mode: "controlled",
    initialValues: {
      username: searchParams.get("username") || "",
      password: "",
    },
    validate: yupResolver(loginSchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    "/auth/login",
    axiosPost<LoginDTO, UserResponse>
  );

  return (
    <>
      <Alert
        color="green"
        title={`Your code has been sent via ${
          searchParams.get("method") === "email" ? "email" : "sms"
        }`}
      />
      <form
        onSubmit={form.onSubmit(async (_, e) => {
          e?.preventDefault();
          try {
            const data = await trigger(
              new LoginDTO({
                ...form,
                values: {
                  ...form.values,
                  username: searchParams.get("username") || "",
                },
              })
            );
            if (data) {
              refreshUser().catch(() => {
                throw "";
              });
            }
          } catch {
            setNetError(failedLoginMessage);
          }
        })}
      >
        <Stack gap="lg">
          <TextInput
            label="Username"
            disabled
            {...form.getInputProps("username")}
            value={searchParams.get("username") || ""}
          />
          <PinInput length={6} size="lg" {...form.getInputProps("password")} />
          <Group gap="sm">
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
