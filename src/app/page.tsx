"use client";
import {
  Box,
  Center,
  Title,
  alpha,
  parseThemeColor,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import { AuthGuardSkeleton } from "../hooks/use-auth-guard";

export default function Home() {
  const theme = useMantineTheme();
  return (
    <main>
      <Box
        p="md"
        bg={alpha(
          parseThemeColor({ color: theme.colors.indigo[4], theme }).value,
          0.1
        )}
      >
        <Center>
          <Title order={2}>Home Page!</Title>
        </Center>
      </Box>
      <Box p="md">
        <AuthGuardSkeleton skeletonProps={{ w: 100 }}>
          <Link href="/chat">Go to chat.</Link>
        </AuthGuardSkeleton>
      </Box>
    </main>
  );
}
