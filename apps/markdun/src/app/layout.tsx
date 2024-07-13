import "@/app/globals.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import type { Metadata } from "next";
import "./globals.css";
import {
  AppShell,
  ColorSchemeScript,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { Suspense } from "react";
import { Notifications } from "@mantine/notifications";

const theme = createTheme({});

export const metadata: Metadata = {
  title: "markdun",
  description: "Utilities for a fair web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MantineProvider theme={theme}>
          <AppShell
            header={{
              height: 60,
            }}
            padding="lg"
          >
            <Suspense>
              <ColorSchemeScript />
              {children}
            </Suspense>
          </AppShell>
          <Notifications />
        </MantineProvider>
      </body>
    </html>
  );
}
