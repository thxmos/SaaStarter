import ProtectedLayout from "@/components/protected-layout";

interface Props {
  children: React.ReactNode;
}

const AwaitingLayout: React.FC<Props> = async ({ children }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default AwaitingLayout;
