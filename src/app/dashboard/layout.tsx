import { LayoutDashboard } from "lucide-react";
import { QuestionMarkIcon } from "@radix-ui/react-icons";
import ProtectedLayout from "@/components/protected-layout";
import LayoutSidebar from "@/components/layout-sidebar";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = ({ children }) => {
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

  return (
    <ProtectedLayout redirectUrl="/auth">
      <div className="flex h-screen bg-background">
        <LayoutSidebar
          tabs={tabs}
          title="Dashboard"
          headerIcon={<LayoutDashboard />}
        />
        {children}
      </div>
    </ProtectedLayout>
  );
};

export default DashboardLayout;
