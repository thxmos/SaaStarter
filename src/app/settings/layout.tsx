import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<Props> = async ({ children }) => {
  const { user, session } = await getUser();

  if (!user || !session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default SettingsLayout;
