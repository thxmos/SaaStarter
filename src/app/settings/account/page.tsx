import { getUser } from "@/actions/session.actions";
import AccountTab from "./account-tab";

export default async function AccountSettingsPage() {
  const { user } = await getUser();
  if (!user) return null;
  return <AccountTab user={user} />;
}
