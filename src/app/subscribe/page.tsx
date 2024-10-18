import { getUserSubscriptions } from "@/actions/user.actions";
import ProtectedLayout from "@/components/protected-layout";
import { APP_NAME } from "@/constants";
import Pricing from "@/components/pricing/pricing";
import SubscribedCard from "@/components/pricing/subscribed-card";

const SubscribePage = async () => {
  const subscriptions = await getUserSubscriptions();

  if (subscriptions) return <SubscribedCard />;

  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              {APP_NAME} Subscription Plans
            </h1>
            <p className="text-xl text-muted-foreground">
              Boost your productivity with our amazing tools
            </p>
          </header>
          <Pricing />
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default SubscribePage;
