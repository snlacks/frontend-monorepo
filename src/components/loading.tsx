import { LoadingOverlay } from "@mantine/core";

export const Loading = ({ visible }: { visible?: boolean }) => (
  <LoadingOverlay
    visible={visible}
    zIndex={1000}
    overlayProps={{ radius: "sm", blur: 2 }}
  />
);
