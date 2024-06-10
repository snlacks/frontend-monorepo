"use client";
import { Box, Center, Title } from "@mantine/core";
import Link from "next/link";
import { AuthGuardSkeleton } from "../hooks/use-auth-guard";
import classes from "./page.module.css";

export default function Home() {
  return (
    <main>
      {" "}
      <Box p="md" className={classes.welcome}>
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
