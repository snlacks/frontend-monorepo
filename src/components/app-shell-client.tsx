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
import classes from "./app-shell-client.module.css";
import { PropsWithChildren } from "react";
import { IconChevronDown } from "@tabler/icons-react";
import useUser from "@/hooks/use-user";
import { AuthGuardSkeleton } from "../hooks/use-auth-guard";
import { Loading } from "./loading";
import { useSignout } from "../hooks/use-signout";
import { useLogin } from "../hooks/use-login";
import { AppSettings } from "./app-settings";

export const AppShellClient = ({ children }: PropsWithChildren) => {
  const { user, isLoading, isInitial } = useUser();
  const { isMutating: isLogginIn } = useLogin();
  const { isMutating: isSigningOut } = useSignout();
  const [opened, { toggle, close }] = useDisclosure(false);
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
              <Text className={classes.user}>{user?.username}</Text>
            </AuthGuardSkeleton>
          </Grid.Col>
        </Grid>
      </AppShellHeader>
      <AppShellNavbar className={classes.nav}>
        <Accordion>
          <NavLinksExternal onLinkClick={close} />
          <Accordion.Item value="settings">
            <Accordion.Control
              h={65}
              chevron={<IconChevronDown size={24} stroke={1} />}
            >
              <Text fz="sm">Settings</Text>
            </Accordion.Control>
            <Accordion.Panel>
              <AppSettings />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
        <CloseButton size="xl" aria-label="Close navigation" onClick={close} />
      </AppShellNavbar>
      <AppShellMain>
        <Loading visible={isSigningOut} />
        <Loading visible={isLoading && isInitial} />
        <Loading visible={isLogginIn} />
        {children}
      </AppShellMain>
    </AppShell>
  );
};
