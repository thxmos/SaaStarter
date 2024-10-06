import React from "react";
import ProtectedLayout from "@/components/protected-layout";
import LayoutSidebar from "@/components/layout-sidebar";
import { Settings, Lock, CreditCard, LayoutDashboard } from "lucide-react";

interface Props {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<Props> = async ({ children }) => {
  const tabs = [
    {
      key: "account",
      label: "Account",
      icon: <Settings className={"mr-2 h-4 w-4"} />,
      href: "/settings/account",
    },
    {
      key: "security",
      label: "Security",
      icon: <Lock className={"mr-2 h-4 w-4"} />,
      href: "/settings/security",
    },
    {
      key: "billing",
      label: "Billing",
      icon: <CreditCard className={"mr-2 h-4 w-4"} />,
      href: "/settings/billing",
    },
  ];
  return (
    <ProtectedLayout redirectUrl="/auth">
      <div className="flex h-screen bg-background">
        <LayoutSidebar
          tabs={tabs}
          title="Settings"
          headerIcon={<LayoutDashboard />}
        />
        {children}
      </div>
    </ProtectedLayout>
  );
};

export default SettingsLayout;
