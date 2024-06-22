"use client";
import { Suspense } from "react";
import { LoginPasswordForm } from "./login-password-form";

export default function Page() {
  return (
    <Suspense>
      <LoginPasswordForm />
    </Suspense>
  );
}
