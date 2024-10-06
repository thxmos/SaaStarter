import ProtectedLayout from "@/components/protected-layout";
import BeanMachineTab from "./home/bean-machine-tab";

export default function Dashboard({}) {
  return (
    <ProtectedLayout redirectUrl="/auth">
      <main className="flex-1 p-8 overflow-y-auto bg-background">
        <div className="w-full max-w-5xl">
          <BeanMachineTab />
        </div>
      </main>
    </ProtectedLayout>
  );
}
