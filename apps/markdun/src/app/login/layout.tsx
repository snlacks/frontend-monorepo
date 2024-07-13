"use client";
import { AppShellMain, Card } from "@mantine/core";
import { PropsWithChildren, Suspense } from "react";
import { AppHeader } from "../../components/app-header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense>
      <AppHeader />
      <AppShellMain>
        <Card withBorder my="md" mx="auto" w="20em">
          {children}
        </Card>
      </AppShellMain>
    </Suspense>
  );
}
