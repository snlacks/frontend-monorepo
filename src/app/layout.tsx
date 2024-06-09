import "@mantine/core/styles.css";
import "@/app/globals.css";

import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { AppShellClient } from "@/components/app-shell-client";

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
        <ColorSchemeScript defaultColorScheme="light" />
        <MantineProvider theme={theme} defaultColorScheme="light">
          <AppShellClient>{children}</AppShellClient>
        </MantineProvider>
      </body>
    </html>
  );
}
