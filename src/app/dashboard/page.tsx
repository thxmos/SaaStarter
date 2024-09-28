"use client";

import { useState } from "react";
import { CreditCard, LayoutDashboard, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Tabs } from "@/components/ui/tabs";
import { useSession } from "@/providers/session-provider";
import AccountTab from "./AccountTab";
import DashboardTab from "./BeanMachineTab";
import BillingTab from "./BillingTab";
import { TabsContent } from "@radix-ui/react-tabs";
import BeanMachineTab from "./BeanMachineTab";

export default function UserDashboard() {
  const { user } = useSession();

  const tabStyles = "mr-2 h-4 w-4";
  const tabs = [
    {
      key: "bean-machine",
      label: "Bean Machine",
      icon: <LayoutDashboard className={tabStyles} />,
      tabContent: <BeanMachineTab />,
    },
    {
      key: "account",
      label: "Account",
      icon: <User className={tabStyles} />,
      tabContent: <AccountTab user={user} />,
    },
    // {
    //   key: "security",
    //   label: "Security",
    //   icon: <Lock className={tabStyles} />,
    //   tabContent: <SecurityTab user={user} />,
    // },
    {
      key: "billing",
      label: "Billing",
      icon: <CreditCard className={tabStyles} />,
      tabContent: <BillingTab user={user} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card p-6 shadow-md">
        <div className="flex items-center mb-8">
          {/* <User className="h-8 w-8 text-primary mr-2" /> */}
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
        <div className="w-full max-w-5xl">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-4"
          >
            {tabs.map((tab) => {
              return (
                <TabsContent value={tab.key}>{tab.tabContent}</TabsContent>
              );
            })}
          </Tabs>
        </div>
      </main>
    </div>
  );
}
