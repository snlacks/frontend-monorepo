import { Modal, Stack, Button, Text } from "@mantine/core";
import { useRouter } from "next/navigation";

export const SuccessModal = ({ opened }: { opened: boolean }) => {
  const router = useRouter();
  return (
    <Modal
      title="Success"
      withCloseButton={false}
      opened={opened}
      onClose={() => undefined}
      centered
    >
      <Stack>
        <Text size="sm">Continue to login...</Text>
        <Button onClick={() => router.push("/login")}>Continue</Button>
      </Stack>
    </Modal>
  );
};
