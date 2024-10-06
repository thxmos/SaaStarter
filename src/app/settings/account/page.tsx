import { getUser } from "@/lib/lucia";
import AccountTab from "./account-tab";

export default async function AccountPage() {
  const { user } = await getUser();
  if (!user) return null;
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <AccountTab user={user} />
      </div>
    </main>
  );
}
