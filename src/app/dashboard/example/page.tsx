import { getUser } from "@/lib/lucia";
import Test from "./test";

interface Props {}

const UserPage: React.FC<Props> = async () => {
  const { user, session } = await getUser();
  if (!user) return null;
  return (
    <>
      <Test user={user} session={session} />
    </>
  );
};

export default UserPage;
