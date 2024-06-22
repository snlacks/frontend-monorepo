"use client";
import { Suspense } from "react";
import { LoginPasswordForm } from "./LoginPasswordForm";

export default function Page() {
  return (
    <Suspense>
      <LoginPasswordForm />
    </Suspense>
  );
}
