import axios, { AxiosError } from "axios";

interface HasMessage { message: any }
interface HasMessageString { message: string }

export const axiosSafeError = (e: any) => {
    const isAxiosErrorMessage = axios.isAxiosError(e) &&
        (e as AxiosError).response?.data?.hasOwnProperty?.("message") &&
        typeof (e as AxiosError<HasMessage>).response?.data
            ?.message === "string";
    return isAxiosErrorMessage
        ? (e as AxiosError<HasMessageString>).response?.data?.message : undefined;
}