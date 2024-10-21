import { getUser } from "@/actions/session.actions";
import BillingTab from "./billing-tab";
import { getBillingInfo } from "./billing.actions";

export default async function BillingPage() {
  const { user } = await getUser();
  if (!user) return null;

  const billingInfo = await getBillingInfo(user.id);

  return <BillingTab user={user} billingInfo={billingInfo} />;
}
