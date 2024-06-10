import axios, { AxiosProgressEvent } from "axios";
import useSWRMutation, { SWRMutationConfiguration, SWRMutationResponse } from "swr/mutation";
import { ChatHistory } from "./type";
import { atom, useAtom } from "jotai";
import { useSetAtom } from "jotai/react";

export const liveResponseAtom = atom('')
export const loadingAtom = atom(false)
export const chatHistoryAtom = atom<ChatHistory[]>([]);

export const useAiStream = (): {
    mutation: SWRMutationResponse<string, any, "/ai-chat/chat-stream", string>;
    trigger: (
        question: string,
        options?: SWRMutationConfiguration<string, any, "/ai-chat/chat-stream", string, string>
    ) => Promise<string | undefined>
} => {
    const setLiveResponse = useSetAtom(liveResponseAtom)
    const setLoading = useSetAtom(loadingAtom)
    const [chatHistory, setChatHistory] = useAtom(chatHistoryAtom)

    const fetcher = (path: string, { arg: question }: { arg: string }) => {

        return axios.post<string>(
            path,
            { message: question },
            {
                responseType: "stream",
                onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
                    const eventObj = ((progressEvent.event as ProgressEvent)?.srcElement as XMLHttpRequest);
                    if (!eventObj) return;
                    setLoading(false)

                    const dataChunk = eventObj.responseText;
                    setLiveResponse(dataChunk);
                },
            }
        ).then(({ data }) => data)
    }

    const mutation = useSWRMutation(
        `/ai-chat/chat-stream`, fetcher);

    return {
        mutation,
        trigger: (async (question, options) => {
            try {
                setLiveResponse("");
                setLoading(true)
                const response = await mutation.trigger(question, options);
                setChatHistory([
                    ...chatHistory,
                    {
                        question,
                        response: response ?? '',
                        key: `responses-${Math.random()}`,
                    },
                ])
                return response;
            } catch (e) {
                console.error(e)
            }
        })
    }
}