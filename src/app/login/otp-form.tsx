"use client";
import { Stack, Button, Title, TextInput, PinInput } from "@mantine/core";
import { useContext, useState } from "react";
import { ErrorMessage } from "@/components/error-message";
import { useForm } from "@mantine/form";
import { LoginDTO } from "./login-dto";
import useSWRMutation from "swr/mutation";
import { axiosPost } from "@/utils/fetch/axios-post";
import useUser from "@/hooks/use-user";
import { failedLoginMessage } from "./constants";
import { UserResponse } from "@/types";
import { User } from "@/User";
import { LoginContext } from "./login-provider";

export const OtpForm = () => {
  const { mutate: refreshUser } = useUser();
  const [netError, setNetError] = useState<string>();
  const { usernameRequested } = useContext(LoginContext);
  const form = useForm({
    mode: "controlled",
    initialValues: { username: usernameRequested ?? "", password: "" },
  });
  const { trigger, isMutating } = useSWRMutation(
    "/auth/login",
    axiosPost<LoginDTO, UserResponse>
  );
  return (
    <>
      <Title order={2}>Request SMS Password</Title>
      <form
        onSubmit={form.onSubmit(async (_, e) => {
          e?.preventDefault();
          try {
            const data = await trigger(new LoginDTO(form));
            if (data) {
              refreshUser(new User(data)).catch(() => {
                throw "";
              });
            }
          } catch {
            setNetError(failedLoginMessage);
          }
        })}
      >
        <Stack p="md" gap="md">
          <TextInput label="Username" {...form.getInputProps("username")} />
          <PinInput {...form.getInputProps("password")} length={6} />
          <Button type="submit" disabled={isMutating}>
            Submit
          </Button>
        </Stack>
      </form>
      <ErrorMessage
        errorMessage={netError}
        onClose={() => setNetError(undefined)}
      />
    </>
  );
};
