import { Group, Button } from "@mantine/core";

export const RequestOtpButtons = ({
  submitDisabled,
  skipDisabled,
  onSkipClick,
}: {
  submitDisabled: boolean;
  skipDisabled: boolean;
  onSkipClick: () => void;
}) => {
  return (
    <Group gap="sm" justify="center">
      <Button type="submit" disabled={submitDisabled}>
        Sign in
      </Button>
      <Button disabled={skipDisabled} onClick={onSkipClick}>
        Enter SMS Passcode
      </Button>
    </Group>
  );
};
