import { redirectToDashboardIfUser } from "@/store/refresh-token";
import { LoginPasswordForm } from "./login-password-form";

export default async function Page() {
  await redirectToDashboardIfUser();
  return <LoginPasswordForm />;
}
