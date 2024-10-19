import { getUser } from "@/actions/session.actions";
import BillingTab from "./billing-tab";
import { getBillingInfo } from "./billing.actions";

export default async function BillingPage() {
  const { user } = await getUser();
  if (!user) return null;

  const billingInfo = await getBillingInfo(user.id);

  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <BillingTab user={user} billingInfo={billingInfo} />
      </div>
    </main>
  );
}
