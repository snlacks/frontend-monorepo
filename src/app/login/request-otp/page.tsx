"use client";
import { Text } from "@mantine/core";
import Link from "next/link";
import { RequestOtpForm } from "./request-otp-form";

export default function RequestOtp() {
  return (
    <>
      <RequestOtpForm />
      <Text>Have an invitation to create an account?</Text>
      <Text>
        <Link href={"/sign-up"}>Sign up</Link>
      </Text>
      <Text>
        <Link href={"/login"}>Login using password instead</Link>
      </Text>
    </>
  );
}
