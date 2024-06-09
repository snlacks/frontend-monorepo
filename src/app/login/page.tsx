"use client";
import { Container, Stack, Title } from "@mantine/core";
import useUser from "@/hooks/use-user";
import { LoginProvider } from "./login-provider";
import { LoginMultiForm } from "./login-multi-form";

export default function Page() {
  const { user } = useUser();
  return (
    <Container w="380px">
      <Stack gap="md" justify="center" ta="center">
        {user ? (
          <Title>You&apos;re already logged in</Title>
        ) : (
          <LoginProvider>
            <LoginMultiForm />
          </LoginProvider>
        )}
      </Stack>
    </Container>
  );
}
