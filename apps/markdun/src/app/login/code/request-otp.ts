import { axiosInstance } from "@/store/axios-instance";
import { RequestOtpDTO } from "@snlacks-fe/user";

export const otpFetcher = async (
  path: string,
  { arg }: { arg: RequestOtpDTO }
): Promise<void> => {
  try {
    const res = await axiosInstance.post(path, arg);

    return res.data;
  } catch {
    throw "Failed to create user";
  }
};
