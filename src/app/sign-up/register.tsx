"use client";
import { useForm, yupResolver } from "@mantine/form";
import {
  Alert,
  Button,
  Center,
  Group,
  Loader,
  NativeSelect,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

import classNames from "./register.module.css";
import { RegisterForm } from "./types";
import { registerSchema } from "./register-schema";
import { fetchRegisterUser } from "./fetch-register-user";
import { CreateUserDTO } from "./create-user-dto";
import { SuccessModal } from "./success-modal";
import { getCountryPrefix } from "@/utils/phone/phone";

import countryCodes from "@/utils/phone/country-code-data.json";
import { RegisterError } from "./register-error";
import axios from "axios";

export const Register = () => {
  const form = useForm<RegisterForm>({
    mode: "controlled",
    initialValues: {
      username: "",
      regional_phone_number: "",
      guest_key_id: "",
      country_code: "US",
    },
    validateInputOnBlur: true,
    validate: yupResolver(registerSchema),
  });

  const [netError, setNetError] = useState<string | undefined>();

  const [showSuccess, setShowSuccess] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    "/auth/users",
    fetchRegisterUser
  );

  const prefix = getCountryPrefix(form.values.country_code);

  return (
    <form
      onSubmit={form.onSubmit(async (values, e) => {
        e?.preventDefault();
        try {
          const data = await trigger(new CreateUserDTO(values));
          if (data) {
            setShowSuccess(true);
          }
        } catch (e: any) {
          setNetError(
            axios.isAxiosError(e)
              ? e.response?.data?.message
              : "Something went wrong."
          );
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
        <Group align="start" justify="space-between" grow>
          <NativeSelect
            label="Country Code"
            data={countryCodes}
            key={form.key("country_code")}
            {...form.getInputProps("country_code")}
            flex="shrink"
            maw={{ base: "100%", md: 95 }}
          />
          <TextInput
            flex="grow"
            label="Phone Number"
            type="string"
            leftSection={
              <Text px="sm" w={80} fz="xs">
                {prefix}
              </Text>
            }
            key={form.key("regional_phone_number")}
            placeholder="555-555-5555"
            {...form.getInputProps("regional_phone_number")}
            maw={{ base: "100%", md: 200 }}
          />
        </Group>
        <TextInput label="Guest Key" {...form.getInputProps("guest_key_id")} />
        <Button
          type="submit"
          className={classNames.submitButton}
          disabled={isMutating || !form.isValid()}
        >
          Register
        </Button>
        <RegisterError
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
