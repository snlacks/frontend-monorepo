import { useRouter, useSearchParams } from "next/navigation";
import useUser from "./use-user";
import { useLayoutEffect } from "react";

const allowedRedirects = ["stevenlacks", "localhost"];
const allowableRedirect = (redirect: string) => {
  if (redirect === "null") {
    return false;
  }
  if (
    redirect.match("http") &&
    allowedRedirects.every((el) => !redirect.match(el))
  ) {
    return true;
  }
  return true;
};

export const useAuthRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useUser();
  useLayoutEffect(() => {
    if (user) {
      const redirect = searchParams.get("redirect");
      if (redirect && allowableRedirect(redirect)) {
        window.location.href = redirect;
      } else {
      }
      router.push("/");
    }
  }, [router, searchParams, user]);
};
