import { Container, Group, Text, Title } from "@mantine/core";
import { Register } from "./register";
import { RegisterInfo } from "./register-info";
import Link from "next/link";

export default function Page() {
  return (
    <Container maw="380px">
      <Group align="flex-start">
        <Title order={2}>Sign Up</Title>
        <RegisterInfo />
      </Group>
      <Register />
      <Text ta="center">If you already have an account</Text>
      <Text ta="center">
        <Link href={"/login"}>log in here</Link>
      </Text>
    </Container>
  );
}
