import { Container } from "@mantine/core";
import { PropsWithChildren } from "react";

export const UserFormContainer = ({ children }: PropsWithChildren) => (
  <Container maw="380px">{children}</Container>
);
