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
      <aside
        className="w-64 bg-card p-6 shadow-md"
        role="navigation"
        aria-label="Dashboard Navigation"
      >
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        </div>
        <nav>
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              variant={activeTab === tab.key ? "default" : "ghost"}
              className="w-full justify-start mb-2"
              onClick={() => setActiveTab(tab.key)}
              aria-current={activeTab === tab.key}
              aria-label={`${tab.label} tab`}
            >
              {tab.icon && <span aria-hidden="true">{tab.icon}</span>}
              <span>{tab.label}</span>
            </Button>
          ))}
        </nav>
      </aside>
      <main className="flex-grow" role="main">
        {children}
      </main>
    </div>
  );
}
