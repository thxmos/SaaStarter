"use client";

import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const tabs = [
  {
    key: "bean-machine",
    label: "Bean Machine",
    icon: <LayoutDashboard className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/home",
  },
  {
    key: "example",
    label: "Example",
    icon: <QuestionMarkIcon className={"mr-2 h-4 w-4"} />,
    href: "/dashboard/example",
  },
];

const DashboardLayout: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 bg-card p-6 shadow-md">
        <div className="flex items-center mb-8">
          <LayoutDashboard className="h-8 w-8 text-primary mr-2" />
          <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
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
      {children}
    </div>
  );
};

export default DashboardLayout;
