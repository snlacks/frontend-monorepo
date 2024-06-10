import { LoadingOverlay, Stack, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import useSWRMutation from "swr/mutation";
import { ErrorMessage } from "@/components/error-message";
import { RequestOtpDTO } from "./request-otp-dto";
import { PasswordOtpFormValues } from "./types";
import { useContext, useState } from "react";
import { axiosPost } from "@/utils/fetch/axios-post";
import { failedLoginMessage } from "./constants";
import { RequestOtpButtons } from "./request-otp-buttons";
import { LoginContext } from "./login-provider";
import { SmsResponse, UserResponse } from "@/types";

const passwordSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export const RequestOtpPasswordForm = () => {
  const { setUsernameRequested } = useContext(LoginContext);
  const form = useForm<PasswordOtpFormValues>({
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
    axiosPost<RequestOtpDTO, UserResponse | SmsResponse>
    // {
    //   onSuccess: (d: UserResponse | SmsResponse) => {
    //     d.hasOwnProperty("user_id") ?? router.push("/ai-chat");
    //   },
    // }
  );

  return (
    <form
      onSubmit={form.onSubmit(async (_, e) => {
        e?.preventDefault();
        try {
          const d = await trigger(new RequestOtpDTO(form));
          if (d.hasOwnProperty("user_id")) {
            router.push("/chat");
          } else {
            setUsernameRequested(form.values.username);
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
          key={form.key("username")}
          placeholder="your@email.com"
          {...form.getInputProps("username")}
        />
        <TextInput
          label="Password"
          type="password"
          withAsterisk
          key={form.key("password")}
          placeholder="*******"
          {...form.getInputProps("password")}
        />

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
