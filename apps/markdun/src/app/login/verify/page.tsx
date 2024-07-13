import { redirectToDashboardIfUser } from "@/store/refresh-token";
import VerifyForm from "./verify-form";

export default async function Page() {
  await redirectToDashboardIfUser();
  return <VerifyForm />;
}
