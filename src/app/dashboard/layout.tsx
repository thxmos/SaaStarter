import ProtectedLayout from "@/components/protected-layout";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<Props> = async ({ children }) => {
  return <ProtectedLayout redirectUrl="/auth">{children}</ProtectedLayout>;
};

export default DashboardLayout;
