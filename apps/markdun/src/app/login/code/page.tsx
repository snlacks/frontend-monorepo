import { redirectToDashboardIfUser } from "@/store/refresh-token";
import { RequestOtpForm } from "./request-otp-form";

export default async function Page() {
  await redirectToDashboardIfUser();
  return <RequestOtpForm />;
}
