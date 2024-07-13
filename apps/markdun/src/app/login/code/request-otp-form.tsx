"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Group,
  LoadingOverlay,
  Radio,
  RadioGroup,
  Stack,
  TextInput,
  Transition,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import useSWRMutation from "swr/mutation";
import {
  OtpFormValues,
  RequestOtpDTO,
  withPhoneValidationSchema,
} from "@snlacks-fe/user";
import { otpFetcher } from "./request-otp";
import { notifications } from "@mantine/notifications";
import { failedLoginMessage } from "@/app/login/constants";
import { PhoneNumberInput } from "@/components/phone-number-inputs";
import { useSetAtom } from "jotai";
import { usernameAtom, verifyMethodAtom } from "../../../store/login";

export const RequestOtpForm = ({
  method = "sms",
}: {
  method?: "sms" | "email";
}) => {
  const setUsername = useSetAtom(usernameAtom);
  const setVerifyMethod = useSetAtom(verifyMethodAtom);
  const router = useRouter();
  const form = useForm<OtpFormValues>({
    mode: "controlled",
    initialValues: {
      username: "",
      regionalPhoneNumber: "",
      method: "email",
      countryCode: "US",
    },
    validateInputOnBlur: true,
  });
  const [netErrors, setNetErrors] = useState<string[]>([]);

  const { trigger, isMutating } = useSWRMutation(
    "/auth/request-otp",
    otpFetcher
  );
  return (
    <form
      onSubmit={form.onSubmit(async (_, e) => {
        e?.preventDefault();
        netErrors.forEach((id) => notifications.hide(id));
        setNetErrors([]);
        try {
          await trigger(new RequestOtpDTO(form));
          setUsername(form.values.username);
          setVerifyMethod(form.values.method);
          router.push(`/login/verify`);
        } catch {
          setNetErrors([...netErrors, failedLoginMessage]);
        }
      })}
    >
      <Stack gap="lg">
        <TextInput
          label="Username (email)"
          type="email"
          withAsterisk
          key={form.key("username")}
          placeholder="your@email.com"
          {...form.getInputProps("username")}
        />
        <RadioGroup
          label="Delivery Method"
          key={form.key("method")}
          withAsterisk
          {...form.getInputProps("method")}
        >
          <Group>
            <Radio value="email" label="Email" />
            <Radio value="sms" label="SMS" />
          </Group>
        </RadioGroup>
        <Transition
          mounted={form.values.method === "sms"}
          transition="slide-down"
          duration={200}
          timingFunction="ease"
        >
          {(style) => (
            <div style={style}>
              <PhoneNumberInput form={form} />
            </div>
          )}
        </Transition>
        <Button type="submit" disabled={isMutating || !form.isValid()}>
          Sign in
        </Button>
        {isMutating && <LoadingOverlay />}
      </Stack>
    </form>
  );
};
