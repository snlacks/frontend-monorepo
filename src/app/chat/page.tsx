/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";
import {
  Button,
  Card,
  Container,
  Grid,
  Loader,
  Stack,
  Textarea,
  Text,
  Group,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import axios, { AxiosProgressEvent } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { marked } from "marked";
import { AuthGuardWrapper, useAuthGuard } from "@/hooks/use-auth-guard";

import classNames from "./page.module.css";

export default function Page() {
  useAuthGuard(true);
  const [response, setResponse] = useState("");
  const [history, setHistory] = useState<
    { question: string; response: string; key: string }[]
  >([]);
  const ref = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const fetcher = useCallback(
    (question: string) =>
      axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_SERVER}/ai-chat/chat-stream`,
        { message: question },
        {
          responseType: "stream",
          onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
            const eventObj = progressEvent.event?.srcElement;
            if (!eventObj) return;

            setLoading(false);
            const dataChunk = eventObj.response;
            setResponse(dataChunk as string);

            setHistory((h) => {
              const older = h.slice(0, h.length - 1);
              const previous = h.slice(h.length - 1)[0];
              const newer = [
                ...(older.length > 0 ? older : []),
                ...(previous ? [{ ...previous, response: dataChunk }] : []),
              ].filter((el) => !!el);

              return newer;
            });
          },
        }
      ),
    []
  );
  const form = useForm({
    initialValues: { question: "" },
  });

  useEffect(() => {
    if (response) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [response]);
  return (
    <AuthGuardWrapper>
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Stack justify="end" h={{ base: "45vh", lg: "80vh" }} p="lg">
            <Container>
              {loading ? (
                <Container
                  mah={{ base: "30vh", lg: "70vh" }}
                  className={classNames.chat}
                >
                  <Loader />
                </Container>
              ) : (
                <Container
                  mah={{ base: "30vh", lg: "70vh" }}
                  className={classNames.chat}
                  ref={ref}
                  dangerouslySetInnerHTML={{ __html: marked.parse(response) }}
                ></Container>
              )}
            </Container>
            <Container h="10vh" w="100%">
              <form
                onSubmit={form.onSubmit(async ({ question }, e) => {
                  e?.preventDefault();
                  try {
                    setHistory((h) => {
                      const older = h.slice(0, h.length - 1);
                      const previous = h.slice(h.length - 1)[0];
                      const newer = [
                        ...(older.length > 0 ? older : []),
                        ...(previous ? [{ ...previous, response }] : []),
                        {
                          question,
                          response: "",
                          key: `responses-${Math.random()}`,
                        },
                      ].filter((el) => !!el);

                      return newer;
                    });
                    setResponse("");
                    setLoading(true);

                    await fetcher(question);
                  } catch (e) {
                    console.error(e);
                  }
                })}
              >
                <Stack gap="sm">
                  <Textarea {...form.getInputProps("question")} />
                  <Group>
                    <Button type="submit" className={classNames.send}>
                      Send
                    </Button>
                    <Button
                      variant="light"
                      onClick={form.reset}
                      className={classNames.send}
                    >
                      Clear
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Container>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Container
            h={{ base: "40vh", lg: "80vh" }}
            className={classNames.history}
          >
            <Stack className={classNames.stack}>
              {history.map(({ question, response, key }) => (
                <Card key={key} p="sm">
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
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
    </AuthGuardWrapper>
  );
}
