import ProtectedLayout from "@/components/protected-layout";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const AwaitingLayout: React.FC<Props> = async ({ children }) => {
  const { user, session } = await getUser();
  if (user) {
    redirect("/");
  }
  return <>{children}</>;
};

export default AwaitingLayout;
