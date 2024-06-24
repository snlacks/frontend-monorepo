import { Group, Button } from "@mantine/core";

export const RequestOtpButtons = ({
  submitDisabled,
  skipHref,
}: {
  submitDisabled: boolean;
  skipHref: string;
}) => {
  return (
    <Group gap="sm" justify="center">
      <Button type="submit" disabled={submitDisabled}>
        Sign in
      </Button>
      <Button variant="subtle" component="a" href={skipHref}>
        Skip to passcode
      </Button>
    </Group>
  );
};
