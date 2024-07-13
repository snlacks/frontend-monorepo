import { AppShell, AppShellHeader, Group } from "@mantine/core";
import { refreshToken } from "../store/refresh-token";
import Link from "next/link";
import { AppHeader } from "../components/app-header";

export default async function Page() {
  const { data: user } = await refreshToken();
  return (
    <AppHeader>
      <span>{user?.username || <Link href="/login">Sign in</Link>}</span>
    </AppHeader>
  );
}
