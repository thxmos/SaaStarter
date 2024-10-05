import BeanMachineTab from "./bean-machine-tab";

const DashboardHome = () => {
  return (
    <main className="flex-1 p-8 overflow-y-auto bg-background">
      <div className="w-full max-w-5xl">
        <BeanMachineTab />
      </div>
    </main>
  );
};

export default DashboardHome;
