"use client";
import { useForm, yupResolver } from "@mantine/form";
import * as yup from "yup";
import { AuthGuardWrapper } from "../../hooks/use-auth-guard";
import { Alert, Button, Center, Loader, PasswordInput } from "@mantine/core";
import { UserFormContainer } from "../../components/user-form-container";
import classes from "./update-password-form.module.css";
import UpdatePasswordDTO from "./updata-password.dto";
import useSWRMutation from "swr/mutation";
import { UpdatePasswordForm } from "./types";
import axios from "axios";
import { useState } from "react";
import { ErrorMessage } from "../../components/error-message";

const updatePassSchema = yup.object().shape({
  username: yup.string().required(),
  oldPassword: yup.string().required(),
  newPassword: yup.string().required(),
});

const fetcher = (path: string, { arg }: { arg: UpdatePasswordDTO }) =>
  axios({ url: path, data: arg, method: "PUT" }).then((d) => d);

export const UpdatePassword = ({ username }: { username: string }) => {
  const form = useForm<UpdatePasswordForm>({
    mode: "controlled",
    initialValues: { username, oldPassword: "", newPassword: "" },
    validate: yupResolver(updatePassSchema),
    validateInputOnBlur: true,
  });
  const [netError, setNetError] = useState<string | undefined>();
  const [success, setSuccess] = useState(false);

  const { trigger, isMutating } = useSWRMutation(
    "/auth/users/password",
    fetcher
  );
  return (
    <AuthGuardWrapper>
      <UserFormContainer>
        <form
          className={classes.form}
          onSubmit={form.onSubmit(async (_, e) => {
            try {
              setSuccess(false);
              setNetError(undefined);
              e?.preventDefault();
              await trigger(new UpdatePasswordDTO(form));
              form.reset();
              setSuccess(true);
            } catch (e) {
              setNetError("Something went wrong.");
            }
          })}
        >
          <input
            type="hidden"
            {...form.getInputProps("username")}
            value={username}
          />
          <PasswordInput
            label="Old Password"
            {...form.getInputProps("oldPassword")}
          />
          <PasswordInput
            label="New Password"
            {...form.getInputProps("newPassword")}
          />
          <Button
            type="submit"
            disabled={isMutating}
            className={classes.submit}
          >
            Change Password
          </Button>
          {isMutating && (
            <Alert title="Updating your Password">
              <Center>
                <Loader />
              </Center>
            </Alert>
          )}
          {success && (
            <Alert title="Success!" color="green">
              Your password has been successfully updated.
            </Alert>
          )}
          <ErrorMessage
            errorMessage={netError}
            onClose={() => setNetError(undefined)}
          />
        </form>
      </UserFormContainer>
    </AuthGuardWrapper>
  );
};
