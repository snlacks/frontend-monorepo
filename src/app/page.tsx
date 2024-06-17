"use client";
import { Box, Center, Title, Transition } from "@mantine/core";
import Link from "next/link";
import { AuthGuardSkeleton } from "@/hooks/use-auth-guard";
import classes from "./page.module.css";
import useUser from "@/hooks/use-user";

export default function Home() {
  const { user, isInitial } = useUser();
  return (
    <main>
      <Box p="md" className={classes.welcome}>
        <Center>
          <Transition
            mounted={!isInitial}
            transition="rotate-right"
            timingFunction="ease"
            duration={1000}
          >
            {(styles) => (
              <Title order={2} style={styles}>
                Home Page!
              </Title>
            )}
          </Transition>
        </Center>
      </Box>
      <Box p="md">
        <AuthGuardSkeleton skeletonProps={{ w: 100 }}>
          {user ? (
            <Link href="/chat">Go to chat.</Link>
          ) : (
            <Link href="/login">Sign in</Link>
          )}
        </AuthGuardSkeleton>
      </Box>
    </main>
  );
}
