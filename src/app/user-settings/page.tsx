"use client";

import { UpdatePassword } from "./update-password-form";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  return searchParams.get("username") ? (
    <UpdatePassword username={searchParams.get("username")!} />
  ) : (
    ""
  );
}
