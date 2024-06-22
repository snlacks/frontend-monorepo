"use client";
import { Stack } from "@mantine/core";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { AuthGuardPlaceholder } from "@/hooks/use-auth-guard";
import { Loading } from "@/components/loading";
import { UserFormContainer } from "../../components/user-form-container";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user } = useUser();
  if (user) {
    router.push("/chat");
  }
  return (
    <UserFormContainer>
      <Stack gap="md">
        {user ? (
          <Loading visible />
        ) : (
          <AuthGuardPlaceholder>{children}</AuthGuardPlaceholder>
        )}
      </Stack>
    </UserFormContainer>
  );
}
