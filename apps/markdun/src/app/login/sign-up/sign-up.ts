import { CreateUserDTO, User, UserResponse } from "@snlacks-fe/user";
import { axiosInstance } from "@/store/axios-instance";

export const registerFetcher = async (
  path: string,
  { arg }: { arg: CreateUserDTO }
): Promise<User> => {
  try {
    const res = await axiosInstance.post(path, arg);

    return res.data;
  } catch {
    throw "Failed to create user";
  }
};
