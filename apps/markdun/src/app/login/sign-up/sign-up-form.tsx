"use client";
import { useForm, yupResolver } from "@mantine/form";
import {
  Alert,
  Button,
  Center,
  Group,
  Loader,
  LoadingOverlay,
  NativeSelect,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import { SuccessModal } from "./success-modal";
import {
  CreateUserDTO,
  CreateUserFormValues,
  RegisterSchema,
  getCountryPrefix,
} from "@snlacks-fe/user";
import countryCodes from "@snlacks-fe/user/country-code-data.json";
import { registerFetcher } from "./sign-up";
import { notifications } from "@mantine/notifications";
import { PhoneNumberInput } from "../../../components/phone-number-inputs";

export const SignUpForm = () => {
  const form = useForm<CreateUserFormValues>({
    mode: "controlled",
    initialValues: {
      username: "",
      regionalPhoneNumber: "",
      password: "",
      countryCode: "US",
    },
    validateInputOnBlur: true,
    validate: yupResolver(RegisterSchema),
  });
  const prefix = getCountryPrefix(form.values.countryCode);

  const [netErrors, setNetErrors] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    "/auth/users",
    registerFetcher
  );

  return (
    <form
      onSubmit={form.onSubmit(async (_, e) => {
        e?.preventDefault();
        netErrors.forEach((id) => notifications.hide(id));
        setNetErrors([]);

        try {
          const data = await trigger(new CreateUserDTO(form));
          if (data) {
            setShowSuccess(true);
          }
        } catch {
          const id = notifications.show({
            title: "Create user",
            message: "Something went wrong.",
          });
          setNetErrors([...netErrors, id]);
        }
      })}
      onChange={() => setNetErrors([])}
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
        <Button type="submit" disabled={isMutating || !form.isValid()}>
          Register
        </Button>
        {isMutating && <LoadingOverlay />}
      </Stack>
      <SuccessModal opened={showSuccess} />
    </form>
  );
};
