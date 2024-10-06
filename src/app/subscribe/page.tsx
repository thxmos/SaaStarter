import { getUserSubscriptions } from "@/actions/user.actions";
import ProtectedLayout from "@/components/protected-layout";
import { APP_NAME } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Pricing from "@/components/pricing/pricing";

const SubscribePage = async () => {
  const subscriptions = await getUserSubscriptions();

  if (subscriptions) return <IsSubscribed />;

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

const IsSubscribed = async () => {
  return (
    <ProtectedLayout>
      <div className="min-h-screen bg-background">
        <main className="container mx-auto px-4 py-16">
          <header className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4 text-foreground">
              You already have an active subscription.
            </h1>
            <p className="text-xl text-muted-foreground">
              head to your dashboard to manage your subscription.
            </p>
          </header>

          <section
            aria-label="Actions"
            className="flex flex-col items-center md:items-start md:justify-center gap-4 md:flex-row"
          >
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          </section>
        </main>
      </div>
    </ProtectedLayout>
  );
};

export default SubscribePage;
