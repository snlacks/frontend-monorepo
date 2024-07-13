import { AppShellHeader, Group } from "@mantine/core";
import { PropsWithChildren } from "react";

export const AppHeader = ({ children }: PropsWithChildren) => (
  <AppShellHeader px="md">
    <Group justify="space-between" align="center" className="w-full h-full">
      <div>
        <a
          href="/"
          className="font-bold flex items-center gap-[var(--mantine-spacing-xs)]"
        >
          <img
            src="https://static-assets-markdun.nyc3.cdn.digitaloceanspaces.com/checkmark.png"
            className="max-h-4"
          />
          Markdun
        </a>
      </div>
      {children}
    </Group>
  </AppShellHeader>
);
