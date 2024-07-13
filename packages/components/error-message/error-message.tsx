import React from "react";
import { Alert } from "@mantine/core";
import { IconCircleXFilled } from "@tabler/icons-react";

export const ErrorMessage = ({
  errorMessage,
  onClose,
}: {
  errorMessage?: string;
  onClose: () => void;
}) => (
  <>
    {errorMessage && (
      <Alert
        title="Error"
        color="red"
        icon={<IconCircleXFilled />}
        withCloseButton
        onClose={onClose}
      >
        {errorMessage}
      </Alert>
    )}
  </>
);
