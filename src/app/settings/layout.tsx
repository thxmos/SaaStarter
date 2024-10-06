import React from "react";
import { getUser } from "@/lib/lucia";
import { redirect } from "next/navigation";
import ProtectedLayout from "@/components/protected-layout";
import { CreditCard, LayoutDashboard, Lock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  children: React.ReactNode;
}

const SettingsLayout: React.FC<Props> = async ({ children }) => {
  const { user, session } = await getUser();

  if (!user || !session) {
    redirect("/");
  }

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
        <aside className="w-64 bg-card p-6 shadow-md">
          <div className="flex items-center mb-8">
            <LayoutDashboard className="h-8 w-8 text-primary mr-2" />
            <h2 className="text-2xl font-bold text-foreground">Settings</h2>
          </div>
          <nav>
            {tabs.map((tab) => (
              <Link href={tab.href}>
                <Button key={tab.key} className="w-full justify-start mb-2">
                  {tab.icon}
                  {tab.label}
                </Button>
              </Link>
            ))}
          </nav>
        </aside>
        {children}
      </div>
    </ProtectedLayout>
  );
};

export default SettingsLayout;
