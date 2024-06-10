"use client";
import { Container, Stack, Title } from "@mantine/core";
import useUser from "@/hooks/use-user";
import { LoginProvider } from "./login-provider";
import { LoginMultiForm } from "./login-multi-form";
import { AuthGuardPlaceholder } from "../../hooks/use-auth-guard";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const { user } = useUser();
  if (user) {
    router.push("/chat");
  }
  return (
    <Container w="350px">
      <Stack gap="md" justify="center" ta="center">
        {user ? (
          <Title>Logged in...</Title>
        ) : (
          <AuthGuardPlaceholder>
            <LoginProvider>
              <LoginMultiForm />
            </LoginProvider>
          </AuthGuardPlaceholder>
        )}
      </Stack>
    </Container>
  );
}
