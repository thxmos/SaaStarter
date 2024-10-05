import { getUser } from "@/lib/lucia";
import AccountTab from "./account-tab";

export default async function AccountPage() {
  const { user } = await getUser();
  if (!user) return null;
  return <AccountTab user={user} />;
}
