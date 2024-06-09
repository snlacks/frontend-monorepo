"use client";
import {
  Anchor,
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Burger,
  CloseButton,
  Title,
  Text,
  rem,
  useMantineColorScheme,
  SegmentedControl,
  MantineColorScheme,
  useComputedColorScheme,
  Accordion,
  Grid,
} from "@mantine/core";
import { useDisclosure, useHeadroom } from "@mantine/hooks";
import Link from "next/link";
import { NavLinksExternal } from "./nav-links-external";
import classNames from "./app-shell-client.module.css";
import { PropsWithChildren } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import useUser from "@/hooks/use-user";
import { AuthGuardSkeleton } from "../hooks/use-auth-guard";

export const AppShellClient = ({ children }: PropsWithChildren) => {
  const colorScheme = useComputedColorScheme();
  const { user } = useUser();
  const { setColorScheme } = useMantineColorScheme();
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
        mah={{ base: "initial", lg: "100vh" }}
      >
        <Grid h="100%" px="lg" align="center">
          <Grid.Col span={2}>
            <Burger
              opened={opened}
              onClick={toggle}
              aria-label="Toggle navigation"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 10, md: 8 }}>
            <Anchor component={Link} href="/" underline="never">
              <Title
                order={1}
                c="var(--mantine-color-text)"
                ta={{ base: "left", md: "center" }}
              >
                StevenLacks.com
              </Title>
            </Anchor>
          </Grid.Col>
          <Grid.Col span={2} visibleFrom="md">
            <AuthGuardSkeleton skeletonLines={1}>
              <Text className={classNames.user}>{user?.username}</Text>
            </AuthGuardSkeleton>
          </Grid.Col>
        </Grid>
      </AppShellHeader>
      <AppShellNavbar className={classNames.nav}>
        <Accordion classNames={classNames}>
          <NavLinksExternal />
          <Accordion.Item value="settings">
            <Accordion.Control
              h={65}
              chevron={<IconChevronDown size={24} stroke={1} />}
            >
              <Text fz="sm">Settings</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <Text p="lg" fz="sm">
                Color theme?
              </Text>
              <SegmentedControl
                p="lg"
                onChange={(value) =>
                  setColorScheme(value as MantineColorScheme)
                }
                value={colorScheme}
                data={["dark", "light"] as MantineColorScheme[]}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <CloseButton size="xl" aria-label="Close navigation" onClick={toggle} />
      </AppShellNavbar>
      <AppShellMain>{children}</AppShellMain>
    </AppShell>
  );
};
