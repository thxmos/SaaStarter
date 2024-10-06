import { getUser } from "@/lib/lucia";
import BillingTab from "./billing-tab";

export default async function BillingPage() {
  const { user } = await getUser();
  if (!user) return null;
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <BillingTab user={user} />
      </div>
    </main>
  );
}
