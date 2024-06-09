"use client";
import { useForm, yupResolver } from "@mantine/form";
import {
  Alert,
  Button,
  Center,
  Loader,
  LoadingOverlay,
  Stack,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import classNames from "./register.module.css";
import { RegisterForm } from "./types";
import { registerSchema } from "./register-schema";
import { CreateUserDTO } from "./create-user-dto";
import { SuccessModal } from "./success-modal";
import { ErrorMessage } from "@/components/error-message";
import { PhoneNumberInput } from "@/components/phone-number-inputs";
import { axiosPost } from "@/utils/fetch/axios-post";
import { axiosSafeError } from "@/utils/fetch/axios-safe-error";
import { UserResponse } from "@/types";

export const Register = () => {
  const form = useForm<RegisterForm>({
    mode: "controlled",
    initialValues: {
      username: "",
      regionalPhoneNumber: "",
      guestKeyId: "",
      password: "",
      countryCode: "US",
    },
    validateInputOnBlur: true,
    validate: yupResolver(registerSchema),
  });

  const [netError, setNetError] = useState<string | undefined>();

  const [showSuccess, setShowSuccess] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    "/auth/users",
    axiosPost<CreateUserDTO, UserResponse>
  );

  return (
    <form
      onSubmit={form.onSubmit(async (_, e) => {
        e?.preventDefault();
        try {
          const data = await trigger(new CreateUserDTO(form));
          if (data) {
            setShowSuccess(true);
          }
        } catch {
          setNetError(axiosSafeError(e) ?? "Something went wrong.");
        }
      })}
      onChange={() => setNetError(undefined)}
    >
      <LoadingOverlay
        visible={isMutating}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Stack gap="md" p="md">
        <TextInput
          label="Username (email)"
          type="email"
          withAsterisk
          key={form.key("username")}
          placeholder="your@email.com"
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Password"
          type="password"
          withAsterisk
          key={form.key("password")}
          placeholder="********"
          {...form.getInputProps("password")}
        />
        <PhoneNumberInput form={form} />
        <TextInput
          label="Guest Key"
          key={form.key("guestKeyId")}
          {...form.getInputProps("guestKeyId")}
        />
        <Button
          type="submit"
          className={classNames.submitButton}
          disabled={isMutating || !form.isValid()}
        >
          Register
        </Button>
        <ErrorMessage
          errorMessage={netError}
          onClose={() => setNetError(undefined)}
        />
        {isMutating && (
          <Alert title="Creating your user...">
            <Center>
              <Loader />
            </Center>
          </Alert>
        )}
      </Stack>
      <SuccessModal opened={showSuccess} />
    </form>
  );
};
