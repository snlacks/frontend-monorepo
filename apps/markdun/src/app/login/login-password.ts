import {
  LoginPasswordDTO,
  LoginPasswordForm,
  User,
  UserResponse,
} from "@snlacks-fe/user";
import { axiosInstance } from "@/store/axios-instance";

export const loginPasswordFetcher = async (
  path: string,
  { arg }: { arg: LoginPasswordDTO }
): Promise<User | { oneTimePasswordSent: true }> => {
  try {
    const res = await axiosInstance.post(path, arg);

    if (res.data.user_id) {
      return res.data;
    } else {
      return { oneTimePasswordSent: true };
    }
  } catch {
    throw "Unauthorized";
  }
};
