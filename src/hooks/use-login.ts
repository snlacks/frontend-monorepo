import useSWRMutation from "swr/mutation";
import { LoginDTO } from "../app/login/login-dto";
import { UserResponse } from "../types";
import { axiosPost } from "../utils/fetch/axios-post";

export const useLogin = () => useSWRMutation(
    "/auth/login",
    axiosPost<LoginDTO, UserResponse>
);