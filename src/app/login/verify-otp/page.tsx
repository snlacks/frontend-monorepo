"use client";

import { Suspense } from "react";
import VerifyOtpForm from "./verify-otp-form";

export default function VerifyOtp() {
  return (
    <Suspense>
      <VerifyOtpForm />
    </Suspense>
  );
}
