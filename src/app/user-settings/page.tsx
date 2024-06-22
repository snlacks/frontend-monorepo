"use client";
import { UpdatePassword } from "./update-password-form";
import { AuthInitialPlaceholder } from "../../hooks/use-auth-guard";

export default function Page() {
  return (
    <AuthInitialPlaceholder>
      <UpdatePassword />
    </AuthInitialPlaceholder>
  );
}
