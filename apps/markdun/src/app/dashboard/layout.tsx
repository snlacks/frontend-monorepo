import { PropsWithChildren, Suspense } from "react";
import { AppHeader } from "../../components/app-header";
import { AppShellMain, Card, Menu, MenuTarget } from "@mantine/core";
import { refreshToken } from "@/store/refresh-token";
import { redirect } from "next/navigation";
import { DashboardHeader } from "./dashboard-header";

export default async function Layout({ children }: PropsWithChildren) {
  const { data: user, error } = await refreshToken();
  if (!user) {
    redirect("/login");
  }
  return (
    <Suspense>
      <DashboardHeader user={user ? { ...user } : undefined} />
      <AppShellMain>{children}</AppShellMain>
    </Suspense>
  );
}
