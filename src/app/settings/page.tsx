"use client";

import { useState } from "react";
import { CreditCard, User, Lock, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { useSession } from "@/providers/session-provider";
import { TabsContent } from "@radix-ui/react-tabs";
import { redirect } from "next/navigation";
import AccountTab from "./account-tab";
import BillingTab from "./billing-tab";
import SecurityTab from "./security-tab";

export default function UserSettings({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const tabs = [
    {
      key: "account",
      label: "Account",
      icon: <User className={"mr-2 h-4 w-4"} />,
      tabContent: <AccountTab />,
    },
    {
      key: "security",
      label: "Security",
      icon: <Lock className={"mr-2 h-4 w-4"} />,
      tabContent: <SecurityTab />,
    },
    {
      key: "billing",
      label: "Billing",
      icon: <CreditCard className={"mr-2 h-4 w-4"} />,
      tabContent: <BillingTab />,
    },
  ];

  const [activeTab, setActiveTab] = useState(searchParams.tab || tabs[0].key);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card p-6 shadow-md">
        <div className="flex items-center mb-8">
          <Settings className="h-8 w-8 text-primary mr-2" />
          <h2 className="text-2xl font-bold text-foreground">Settings</h2>
        </div>
        <nav>
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.icon}
              {tab.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-background">
        <div className="w-full max-w-5xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            {tabs.map((tab) => {
              return (
                <TabsContent key={tab.key} value={tab.key}>
                  {tab.tabContent}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
