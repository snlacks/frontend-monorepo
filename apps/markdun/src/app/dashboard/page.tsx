import { LoadingOverlay } from "@mantine/core";
import { PropsWithChildren, Suspense, useEffect } from "react";
import { refreshToken } from "@/store/refresh-token";
import { redirect } from "next/navigation";

export default async function Page() {
  const { data: user, error } = await refreshToken();
  if (!user) {
    redirect("/login");
  }
  return (
    <Suspense fallback={<LoadingOverlay />}>
      <div>Dashboard Page</div>
    </Suspense>
  );
}
