"use client";
import { SegmentedControl, Text, Title } from "@mantine/core";
import { useState } from "react";
import Link from "next/link";
import { RequestOtpSmsForm } from "./request-otp-sms-form";
import { RequestOtpPasswordForm } from "./request-otp-password-form";

export default function RequestOtp() {
  const [loginMethod, setLoginMethod] = useState("Password");
  return (
    <>
      <Title order={2}>Request SMS Password</Title>
      <SegmentedControl
        data={["Password", "SMS"]}
        onChange={setLoginMethod}
        value={loginMethod}
      />
      {loginMethod === "SMS" && <RequestOtpSmsForm />}
      {loginMethod === "Password" && <RequestOtpPasswordForm />}
      <Text>Have an invitation to create an account?</Text>
      <Text>
        <Link href={"/sign-up"}>Sign up</Link>
      </Text>
    </>
  );
}
