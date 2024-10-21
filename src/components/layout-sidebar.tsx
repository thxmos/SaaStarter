"use client";

import { LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";

type Tab = {
  key: string;
  label: string;
  icon: React.ReactNode;
  href: string;
};

type Props = {
  tabs: Tab[];
  title: string;
  headerIcon: React.ReactNode;
};

const LayoutSidebar: React.FC<Props> = ({ tabs, title }) => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-card p-6 shadow-md h-full">
      <div className="flex items-center mb-8">
        <LayoutDashboard className="h-8 w-8 text-primary mr-2" />
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <nav>
        {tabs.map((tab) => (
          <Link href={tab.href} key={tab.key}>
            <Button
              key={tab.key}
              className="w-full justify-start mb-2"
              variant={pathname === tab.href ? "default" : "ghost"}
            >
              {tab.icon}
              {tab.label}
            </Button>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default LayoutSidebar;
