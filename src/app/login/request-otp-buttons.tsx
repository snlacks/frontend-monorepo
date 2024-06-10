import { Group, Button } from "@mantine/core";

export const RequestOtpButtons = ({
  submitDisabled,
  onSkipClick,
}: {
  submitDisabled: boolean;
  onSkipClick: () => void;
}) => {
  return (
    <Group gap="sm" justify="center">
      <Button type="submit" disabled={submitDisabled}>
        Sign in
      </Button>
      <Button variant="subtle" onClick={onSkipClick}>
        Enter SMS Passcode
      </Button>
    </Group>
  );
};
