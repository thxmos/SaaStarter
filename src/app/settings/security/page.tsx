import { getUser } from "@/lib/lucia";
import SecurityTab from "./security-tab";

export default async function SecurityPage() {
  const { user } = await getUser();
  if (!user) return null;
  return <SecurityTab user={user} />;
}
