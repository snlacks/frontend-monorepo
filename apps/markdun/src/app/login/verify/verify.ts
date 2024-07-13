import {
  LoginPasswordForm,
  User,
  UserResponse,
  VerifyDTO,
} from "@snlacks-fe/user";
import { axiosInstance } from "@/store/axios-instance";

export const verifyOtpFetcher = async (
  path: string,
  { arg }: { arg: VerifyDTO }
): Promise<User> => {
  try {
    const res = await axiosInstance.post(path, arg);

    if (res.data.user_id) {
      return res.data;
    } else {
      throw "Unauthorized";
    }
  } catch {
    throw "Unauthorized";
  }
};
