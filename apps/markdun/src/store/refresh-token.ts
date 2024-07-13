import { User, UserResponse } from "@snlacks-fe/user";
import { ApiError } from "../types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function refreshToken() {
  let error: ApiError | undefined;
  let user: User | undefined;

  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_AUTH_SERVER + "/auth/refresh",
      {
        cache: "no-store",
        method: "POST",
        headers: { Cookie: cookies().toString() },
      }
    );
    if (res.ok) {
      const user = new User((await res.json()) as UserResponse);

      return { data: user };
    } else {
      error = (await res.json()) as ApiError;
      throw new Error(error.message);
    }
  } catch (error: any) {
    return {
      error: { message: error.message, error: "unknown", statusCode: 0 },
    };
  }
}
export const redirectToDashboardIfUser = async () => {
  if (cookies().get("Authorization")) {
    const { data: user } = await refreshToken();
    if (user) {
      redirect("/dashboard");
    }
  }
};
