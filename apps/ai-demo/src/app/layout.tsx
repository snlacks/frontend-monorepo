import "@mantine/core/styles.css";
import "@/app/globals.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { AppShellClient } from "@/components/app-shell-client";
import { Provider } from "jotai/react";
import { Suspense } from "react";

export const metadata = {
  title: "StevenLacks.com",
  description: "Software engineer",
};

const theme = createTheme({});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body>
        <Suspense>
          <Provider>
            <ColorSchemeScript />
            <MantineProvider theme={theme}>
              <AppShellClient>{children}</AppShellClient>
            </MantineProvider>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
