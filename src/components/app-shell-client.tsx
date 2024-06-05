"use client";
import {
  Anchor,
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Burger,
  CloseButton,
  Group,
  NavLink,
  Title,
  Text,
  rem,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import Link from "next/link";
import { NavLinksExternal } from "./nav-links-external";
import classNames from "./app-shell-client.module.css";
import { NavChevron } from "./nav-chevron";
import { PropsWithChildren } from "react";

export const AppShellClient = ({ children }: PropsWithChildren) => {
  const [opened, { toggle }] = useDisclosure(false);
  const pinned = useHeadroom({ fixedAt: 120 });
  return (
    <AppShell
      padding={{ base: "md", lg: "xl" }}
      header={{ height: 50 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { desktop: !opened, mobile: !opened },
      }}
    >
      <AppShellHeader
        style={{
          transform: `translate3d(0, ${pinned ? 0 : rem(-110)}, 0)`,
        }}
      >
        <Group h="100%" gap="lg" pl="lg">
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
          <Anchor component={Link} href="/" c="dark.8" underline="never">
            <Title order={1}>
              <Text size="xs" component="span">
                demo.
              </Text>
              <Text fz={{ base: 28, md: 32 }} component="span" fw="bold">
                StevenLacks.com
              </Text>
            </Title>
          </Anchor>
        </Group>
      </AppShellHeader>
      <AppShellNavbar className={classNames.nav}>
        <Group gap="0">
          <NavLink
            p="lg"
            href="/sign-up"
            label="Sign up"
            rightSection={<NavChevron />}
          />
          <NavLinksExternal />
        </Group>
        <CloseButton size="xl" aria-label="Close navigation" onClick={toggle} />
      </AppShellNavbar>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
};
