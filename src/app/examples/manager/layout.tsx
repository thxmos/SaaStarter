"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Calendar,
  ChevronDown,
  Github,
  Globe,
  LayoutDashboard,
  ListTodo,
  Menu,
  Plus,
  Search,
  Settings,
} from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-gray-100 dark:bg-gray-900">
      {/* Top Navbar */}
      <header className="flex h-16 items-center justify-between border-b bg-white px-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-2xl font-semibold">Project Tasks</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="h-6 w-6" />
          </Button>
          <Button variant="ghost" size="icon">
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden w-64 overflow-y-auto border-r bg-white dark:border-gray-700 dark:bg-gray-800 md:block">
          <nav className="p-4">
            {[
              {
                title: "Quick Links",
                links: [
                  { icon: Github, text: "GitHub", url: "/github" },
                  { icon: Globe, text: "Website", url: "/website" },
                ],
              },
              {
                title: "Overview",
                links: [
                  {
                    icon: LayoutDashboard,
                    text: "Dashboard",
                    url: "/dashboard",
                  },
                  { icon: Calendar, text: "Scheduling", url: "/scheduling" },
                  { icon: ListTodo, text: "Work Items", url: "/work-items" },
                ],
              },
              {
                title: "Analytics",
                links: [{ icon: BarChart3, text: "Reports", url: "/reports" }],
              },
              {
                title: "Settings",
                links: [
                  {
                    icon: Settings,
                    text: "Project Settings",
                    url: "/settings",
                  },
                ],
              },
            ].map((section, index) => (
              <div
                key={index}
                className={index > 0 ? "mt-8 space-y-1" : "space-y-1"}
              >
                <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {section.title}
                </h3>
                {section.links.map((link, linkIndex) => (
                  <a
                    key={linkIndex}
                    href={`/examples/manager${link.url}`}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
                  >
                    <link.icon className="mr-3 h-6 w-6" />
                    {link.text}
                  </a>
                ))}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
