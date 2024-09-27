"use client";

import { useState } from "react";
import { CreditCard, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Tabs } from "@/components/ui/tabs";
import { useSession } from "@/providers/session-provider";
import AccountTab from "./AccountTab";
import SecurityTab from "./SecurityTab";
import BillingTab from "./BillingTab";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("account");
  const { user } = useSession();

  const tabStyles = "mr-2 h-4 w-4";
  const tabs = [
    {
      key: "account",
      label: "Account",
      icon: <User className={tabStyles} />,
      tabContent: <AccountTab user={user} />,
    },
    {
      key: "security",
      label: "Security",
      icon: <Lock className={tabStyles} />,
      tabContent: <SecurityTab user={user} />,
    },
    {
      key: "billing",
      label: "Billing",
      icon: <CreditCard className={tabStyles} />,
      tabContent: <BillingTab user={user} />,
    },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card p-6 shadow-md">
        <div className="flex items-center mb-8">
          <User className="h-8 w-8 text-primary mr-2" />
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
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
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          {tabs.map((tab) => {
            return tab.tabContent;
          })}
        </Tabs>
      </main>
    </div>
  );
}
