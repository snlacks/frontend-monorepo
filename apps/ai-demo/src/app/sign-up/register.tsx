"use client";
import { useForm, yupResolver } from "@mantine/form";
import { Alert, Button, Center, Loader, Stack, TextInput } from "@mantine/core";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import classes from "./register.module.css";
import { registerSchema } from "./register-schema";
import { SuccessModal } from "./success-modal";
import { ErrorMessage } from "@/components/error-message";
import { PhoneNumberInput } from "@/components/phone-number-inputs";
import { axiosPost } from "@/utils/fetch/axios-post";
import { axiosSafeError } from "@/utils/fetch/axios-safe-error";
import { UserResponse } from "@/types";
import { CreateUserDTO, CreateUserFormValues } from "@snlacks-fe/user";

export const Register = () => {
  const form = useForm<CreateUserFormValues>({
    mode: "controlled",
    initialValues: {
      username: "",
      regionalPhoneNumber: "",
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
        <Button
          type="submit"
          className={classes.submitButton}
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
