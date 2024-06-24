"use client";
import { Text } from "@mantine/core";
import Link from "next/link";
import { RequestOtpForm } from "./request-otp-form";
import { Suspense } from "react";

export default function RequestOtp() {
  return (
    <Suspense>
      <RequestOtpForm />
      <Text>
        <Link href={"/sign-up"}>Sign up</Link>
      </Text>
      <Text>
        <Link href={"/login"}>Login using password instead</Link>
      </Text>
    </Suspense>
  );
}
