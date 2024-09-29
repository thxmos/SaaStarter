"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function DashboardLayout({
  children,
  tabs,
}: {
  children: React.ReactNode;
  tabs: any[];
}) {
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
      {children}
    </div>
  );
}
