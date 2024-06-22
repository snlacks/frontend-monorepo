"use client";
import { Stack } from "@mantine/core";
import useUser from "@/hooks/use-user";
import { PropsWithChildren, useLayoutEffect } from "react";
import { AuthInitialPlaceholder } from "@/hooks/use-auth-guard";
import { Loading } from "@/components/loading";
import { UserFormContainer } from "../../components/user-form-container";
import { useAuthRedirect } from "../../hooks/use-auth-redirect";

export default function Layout({ children }: PropsWithChildren) {
  const { user } = useUser();
  useAuthRedirect();
  return (
    <UserFormContainer>
      <Stack gap="md">
        {user ? (
          <Loading visible />
        ) : (
          <AuthInitialPlaceholder>{children}</AuthInitialPlaceholder>
        )}
      </Stack>
    </UserFormContainer>
  );
}
