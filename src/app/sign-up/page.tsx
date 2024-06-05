import { Button, Container, Group, Popover, Title } from "@mantine/core";
import { Register } from "./register";
import { IconQuestionMark } from "@tabler/icons-react";
import { RegisterInfo } from "./register-info";

export default function Page() {
  return (
    <Container maw="380px">
      <Group align="flex-start">
        <Title order={2}>Sign Up</Title>
        <RegisterInfo />
      </Group>
      <Register />
    </Container>
  );
}
