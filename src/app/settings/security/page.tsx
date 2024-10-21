import { getUserById, getUserByIdWithPassword } from "@/data-access/user";
import SecurityTab from "./security-tab";
import { getUser } from "@/actions/session.actions";
export default async function SecurityPage() {
  const { user: sessionUser } = await getUser();
  if (!sessionUser) return null;
  const user = await getUserById(sessionUser.id);
  const { password } = await getUserByIdWithPassword(sessionUser.id);
  const hasPassword = !!password;

  return <SecurityTab user={user} hasPassword={hasPassword} />;
}
