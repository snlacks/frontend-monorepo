import { Stack, Textarea, Group, Button } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./chat-form.module.css";
import { useAiStream } from "./use-ai-stream";

export const ChatForm = () => {
  const { trigger } = useAiStream();
  const form = useForm({
    initialValues: { question: "" },
  });
  return (
    <form
      onSubmit={form.onSubmit(({ question }) => question && trigger(question))}
    >
      <Stack gap="sm">
        <Textarea {...form.getInputProps("question")} />
        <Group>
          <Button type="submit" className={classes.send}>
            Send
          </Button>
          <Button variant="light" onClick={form.reset} className={classes.send}>
            Clear
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
