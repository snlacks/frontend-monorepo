"use client";
import { Card, Drawer, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useAtomValue } from "jotai/react";
import { useState } from "react";
import { chatHistoryAtom } from "./use-ai-stream";
import classes from "./chat-form.module.css";
import { ChatHistory } from "./type";

export const ChatRecord = () => {
  const [opened, { open, close }] = useDisclosure(undefined);
  const [active, setActive] = useState<ChatHistory>();
  const chatHistory = useAtomValue(chatHistoryAtom);
  return (
    <>
      {chatHistory.map(({ question, response, key }) => (
        <Card
          key={key}
          p="sm"
          onClick={() => {
            open();
            setActive({ question, response, key });
          }}
        >
          <Text>
            {question.length > 80
              ? `${question.substring(0, 80)}...`
              : question}
          </Text>
          <Text component="div">
            {response.length > 200
              ? `${response.substring(0, 200)}...`
              : response}
          </Text>
        </Card>
      ))}
      <Drawer
        className={classes.messageDetail}
        position="top"
        size="90%"
        opened={opened}
        onClose={() => {
          close();
          setActive(undefined);
        }}
        title={active?.question}
      >
        <Text>{active?.response}</Text>
      </Drawer>
    </>
  );
};
