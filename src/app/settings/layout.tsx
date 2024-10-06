import React from "react";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import ProtectedLayout from "@/components/protected-layout";

interface Props {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<Props> = async ({ children }) => {
  const { user, session } = await getUser();

  if (!user || !session) {
    redirect("/");
  }

  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default SettingsLayout;
