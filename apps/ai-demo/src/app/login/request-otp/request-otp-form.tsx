import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import useSWRMutation from "swr/mutation";
import { ErrorMessage } from "@/components/error-message";
import { PhoneNumberInput } from "@/components/phone-number-inputs";
import { withPhoneValidationSchema } from "@/utils/phone/phone";
import { axiosPost } from "@/utils/fetch/axios-post";
import { failedLoginMessage } from "../constants";
import { RequestOtpDTO } from "../request-otp-dto";
import { OtpFormValues } from "../types";

const smsSchema = yup.object().shape({
  username: yup.string().email().required(),
  ...withPhoneValidationSchema(),
});

export const RequestOtpForm = ({
  method = "sms",
}: {
  method?: "sms" | "email";
}) => {
  const router = useRouter();
  const form = useForm<OtpFormValues>({
    mode: "controlled",
    initialValues: {
      username: "",
      regionalPhoneNumber: "",
      method,
      countryCode: "US",
    },
    validateInputOnBlur: true,
    validate: yupResolver(smsSchema),
  });
  const [netError, setNetError] = useState<string | undefined>();

  const { trigger, isMutating } = useSWRMutation(
    "/auth/request-otp",
    axiosPost<RequestOtpDTO>
  );
  return (
    <form
      onSubmit={form.onSubmit(async (_, e) => {
        e?.preventDefault();
        try {
          await trigger(new RequestOtpDTO(form));
          router.push(
            `/login/verify-otp?method=sms&username=${form.values.username}`
          );
        } catch {
          setNetError(failedLoginMessage);
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
        {method === "sms" && <PhoneNumberInput form={form} />}
        <ErrorMessage
          errorMessage={netError}
          onClose={() => setNetError(undefined)}
        />
        <Button type="submit" disabled={isMutating || !form.isValid()}>
          Sign in
        </Button>
      </Stack>
    </form>
  );
};
