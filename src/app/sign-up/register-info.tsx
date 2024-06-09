"use client";
import { Popover, ActionIcon } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

export const RegisterInfo = () => (
  <Popover position="bottom" withArrow>
    <Popover.Target>
      <ActionIcon size="xs">
        <IconQuestionMark />
      </ActionIcon>
    </Popover.Target>
    <Popover.Dropdown bg="dark.5" c="gray.0">
      Welcome, please enter the email and phone number you want to use to log in
      and the key from your invitation.
    </Popover.Dropdown>
  </Popover>
);
