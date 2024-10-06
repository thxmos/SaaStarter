import React from "react";
import ProtectedLayout from "@/components/protected-layout";
import SettingsLayoutSidebar from "./layout.sidebar";

interface Props {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<Props> = async ({ children }) => {
  return (
    <ProtectedLayout redirectUrl="/auth">
      <div className="flex h-screen bg-background">
        <SettingsLayoutSidebar />
        {children}
      </div>
    </ProtectedLayout>
  );
};

export default SettingsLayout;
