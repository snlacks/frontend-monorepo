import useSWRMutation from "swr/mutation";
import { axiosPost } from "@/utils/fetch/axios-post";

export const useSignout = () => useSWRMutation(
    "/auth/sign-out",
    axiosPost<undefined, undefined>
);
