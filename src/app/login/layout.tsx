"use client";
import { Container, Stack } from "@mantine/core";
import useUser from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { AuthGuardPlaceholder } from "@/hooks/use-auth-guard";
import { Loading } from "@/components/loading";

export default function Layout({ children }: PropsWithChildren) {
  const router = useRouter();
  const { user } = useUser();
  if (user) {
    router.push("/chat");
  }
  return (
    <Container w="350px">
      <Stack gap="md" justify="center" ta="center">
        {user ? (
          <Loading visible />
        ) : (
          <AuthGuardPlaceholder>{children}</AuthGuardPlaceholder>
        )}
      </Stack>
    </Container>
  );
}
