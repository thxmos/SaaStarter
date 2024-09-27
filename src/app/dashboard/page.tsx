"use client";

import { useEffect, useState } from "react";
import {
  Bell,
  CreditCard,
  Key,
  Lock,
  Mail,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useSession } from "@/providers/session-provider";
import { getSubscriptions, Subscription } from "@/actions/stripe.actions";
import Link from "next/link";
import { set } from "date-fns";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, session } = useSession();

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const fetchSubscription = async () => {
      const res = await getSubscriptions(user.id);
      console.log(res);
      if (res.success) {
        setSubscription(res.subscription);
      }
    };
    fetchSubscription();
  }, []);

  const convertTimestampToReadableDate = (
    timestamp: number | undefined,
  ): string => {
    if (!timestamp) return "";
    const date = new Date(timestamp * 1000);
    return date.toLocaleString();
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 bg-card p-6 shadow-md">
        <div className="flex items-center mb-8">
          <User className="h-8 w-8 text-primary mr-2" />
          <h2 className="text-2xl font-bold text-foreground">User Dashboard</h2>
        </div>
        <nav>
          <Button
            variant={activeTab === "overview" ? "default" : "ghost"}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("overview")}
          >
            <Settings className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant={activeTab === "account" ? "default" : "ghost"}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("account")}
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </Button>
          <Button
            variant={activeTab === "security" ? "default" : "ghost"}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("security")}
          >
            <Lock className="mr-2 h-4 w-4" />
            Security
          </Button>
          <Button
            variant={activeTab === "notifications" ? "default" : "ghost"}
            className="w-full justify-start mb-2"
            onClick={() => setActiveTab("notifications")}
          >
            <Bell className="mr-2 h-4 w-4" />
            Notifications
          </Button>
          <Button
            variant={activeTab === "billing" ? "default" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab("billing")}
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Billing
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto bg-background">
        <h1 className="text-3xl font-bold mb-6 text-foreground">
          Welcome, {user.name}
        </h1>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Overview</CardTitle>
                <CardDescription>
                  Here's a quick summary of your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">Email:</span>
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-foreground">
                      Account Type:
                    </span>
                    <span className="text-muted-foreground">
                      {user.isSubscribed ? "Premium" : "Free"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Update your account details here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    type="email"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account's security.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Password</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="2fa" />
                  <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email-notifications" />
                  <Label htmlFor="email-notifications">
                    Email Notifications
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="push-notifications" />
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="sms-notifications" />
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

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
                    <span className="font-medium text-foreground">
                      Current Plan:
                    </span>
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
        </Tabs>
      </main>
    </div>
  );
}
