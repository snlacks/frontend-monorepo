import axios from "axios";
import { User } from "../../components/identity-provider";
import { CreateUserDTO } from "./create-user-dto";

export const fetchRegisterUser = (path: string, { arg }: { arg: CreateUserDTO }) => {
    return axios
        .post<User>(`${process.env.NEXT_PUBLIC_AUTH_SERVER}${path}`, arg)
        .then((res) => res.data)
};