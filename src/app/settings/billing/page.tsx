import { getUser } from "@/lib/lucia";
import BillingTab from "./billing-tab";

export default async function BillingPage() {
  const { user } = await getUser();
  if (!user) return null;
  return <BillingTab user={user} />;
}
