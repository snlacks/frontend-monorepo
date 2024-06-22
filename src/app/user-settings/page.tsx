"use client";
import { Suspense } from "react";
import { UpdatePassword } from "./update-password-form";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  return <UpdatePassword username={searchParams.get("username")!} />;
}
