import { getUser } from "@/lib/lucia";
import Test from "./test";
import ProtectedLayout from "@/components/protected-layout";

interface Props {}

const UserPage: React.FC<Props> = async () => {
  const { user, session } = await getUser();
  if (!user) return null;
  return (
    <ProtectedLayout redirectUrl="/auth">
      <Test user={user} session={session} />
    </ProtectedLayout>
  );
};

export default UserPage;
