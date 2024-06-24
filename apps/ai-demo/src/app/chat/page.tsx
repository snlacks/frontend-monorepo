"use client";
import { Container, Grid, Loader, Stack } from "@mantine/core";
import { useEffect, useRef } from "react";
import { marked } from "marked";
import { AuthGuardWrapper, useAuthGuard } from "@/hooks/use-auth-guard";

import classes from "./page.module.css";
import { liveResponseAtom, loadingAtom } from "./use-ai-stream";
import { ChatRecord } from "./chat-record";
import { ChatForm } from "./chat-form";
import { useAtomValue } from "jotai/react";

export default function Page() {
  useAuthGuard(true);
  const loading = useAtomValue(loadingAtom);
  const liveResponse = useAtomValue(liveResponseAtom);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (liveResponse) {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [liveResponse]);
  return (
    <AuthGuardWrapper>
      <Grid>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Stack justify="end" h={{ base: "45vh", lg: "80vh" }} p="lg">
            <Container>
              {loading ? (
                <Container
                  mah={{ base: "30vh", lg: "70vh" }}
                  className={classes.chat}
                >
                  <Loader />
                </Container>
              ) : (
                <Container
                  mah={{ base: "30vh", lg: "70vh" }}
                  className={classes.chat}
                  ref={ref}
                  dangerouslySetInnerHTML={{
                    __html: marked.parse(liveResponse),
                  }}
                ></Container>
              )}
            </Container>
            <Container h="10vh" w="100%">
              <ChatForm />
            </Container>
          </Stack>
        </Grid.Col>
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Container
            h={{ base: "40vh", lg: "80vh" }}
            className={classes.history}
          >
            <Stack className={classes.stack}>
              <ChatRecord />
            </Stack>
          </Container>
        </Grid.Col>
      </Grid>
    </AuthGuardWrapper>
  );
}
