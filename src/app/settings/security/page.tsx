import { getUser } from "@/lib/lucia";
import SecurityTab from "./security-tab";

export default async function SecurityPage() {
  const { user } = await getUser();
  if (!user) return null;
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <SecurityTab user={user} />
      </div>
    </main>
  );
}
