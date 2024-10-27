import { getUser } from "@/actions/session.actions";
import AccountTab from "./account-tab";
import { getUserById } from "@/data-access/user";

export default async function AccountSettingsPage() {
  const sessionUser = await getUser();
  const userId = sessionUser.user?.id;
  if (!userId) return null;
  const user = await getUserById(userId);

  return <AccountTab user={user} />;
}
