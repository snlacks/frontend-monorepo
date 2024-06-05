"use client";
import { Popover, Button, ActionIcon } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

export const RegisterInfo = () => (
  <Popover position="top" withArrow>
    <Popover.Target>
      <ActionIcon size="xs">
        <IconQuestionMark />
      </ActionIcon>
    </Popover.Target>
    <Popover.Dropdown>
      Welcome, please enter the email and phone number you want to use to log in
      and the key from your invitation.
    </Popover.Dropdown>
  </Popover>
);
