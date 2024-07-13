import { redirectToDashboardIfUser } from "@/store/refresh-token";
import { SignUpForm } from "./sign-up-form";

export default async function Page() {
  await redirectToDashboardIfUser();
  return <SignUpForm />;
}
