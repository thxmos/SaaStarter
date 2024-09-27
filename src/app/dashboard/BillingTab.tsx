import { getSubscriptions, Subscription } from "@/actions/stripe.actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@radix-ui/react-tabs";
import { Link } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  user: any;
}

const BillingTab: React.FC<Props> = ({ user }) => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  const convertTimestampToReadableDate = (
    timestamp: number | undefined,
  ): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchSubscription = async () => {
      const res = await getSubscriptions(user.id);
      if (res.success) {
        setSubscription(res.subscription);
      }
    };
    fetchSubscription();
  }, []);

  return (
    <TabsContent value="billing" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>
            Your current plan and billing cycle.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium text-foreground">Current Plan:</span>
              <span className="text-muted-foreground">
                {user.isSubscribed ? "Premium" : "Free"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">
                Billing Cycle:
              </span>
              <span className="text-muted-foreground">
                {user.isSubscribed ? `${subscription?.interval}` : "N/A"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-foreground">
                Next Billing Date:
              </span>
              <span className="text-muted-foreground">
                {convertTimestampToReadableDate(
                  subscription?.current_period_end,
                )}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {user.isSubscribed ? (
            <Link
              target="_blank"
              href={`https://billing.stripe.com/p/login/test_8wM17y7ej2tF5vG9AA?prefilled_email=${user.email}`}
            >
              <Button>Change Plan</Button>
            </Link>
          ) : (
            <Link href="/subscribe">
              <Button>Upgrade</Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

export default BillingTab;
