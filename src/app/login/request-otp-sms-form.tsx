import { Stack, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import useSWRMutation from "swr/mutation";
import { ErrorMessage } from "@/components/error-message";
import { PhoneNumberInput } from "@/components/phone-number-inputs";
import { withPhoneValidationSchema } from "@/utils/phone/phone";
import { RequestOtpDTO } from "./request-otp-dto";
import { SmsOtpFormValues } from "./types";
import { useContext, useState } from "react";
import { axiosPost } from "@/utils/fetch/axios-post";
import { failedLoginMessage } from "./constants";
import { RequestOtpButtons } from "./request-otp-buttons";
import { LoginContext } from "./login-provider";

const smsSchema = yup.object().shape({
  username: yup.string().email().required(),
  ...withPhoneValidationSchema(),
});

export const RequestOtpSmsForm = () => {
  const { setUsernameRequested } = useContext(LoginContext);
  const form = useForm<SmsOtpFormValues>({
    mode: "controlled",
    initialValues: {
      username: "",
      regionalPhoneNumber: "",
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
          setUsernameRequested(form.values.username);
        } catch {
          setNetError(failedLoginMessage);
        }
      })}
    >
      <Stack p="lg" gap="lg">
        <TextInput
          label="Username (email)"
          type="email"
          withAsterisk
          key={form.key("username")}
          placeholder="your@email.com"
          {...form.getInputProps("username")}
        />
        <PhoneNumberInput form={form} />
        <ErrorMessage
          errorMessage={netError}
          onClose={() => setNetError(undefined)}
        />
        <RequestOtpButtons
          submitDisabled={isMutating || !form.isValid()}
          onSkipClick={() => setUsernameRequested(form.values.username)}
        />
      </Stack>
    </form>
  );
};
