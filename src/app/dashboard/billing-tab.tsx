"use client";

import { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Download, Settings, User } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "@/providers/session-provider";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "./dashboard.action";
import { getSubscriptions } from "@/actions/stripe.actions";

interface Props {
  user: any;
}

const mockBillingHistory = [
  {
    date: "July 1, 2024",
    amount: "$29.99",
    invoiceUrl: "/invoices/july-2024.pdf",
  },
  {
    date: "June 1, 2024",
    amount: "$29.99",
    invoiceUrl: "/invoices/june-2024.pdf",
  },
];

const BillingTab: React.FC<Props> = () => {
  const { user } = useSession();

  if (!user) {
    return null;
  }

  const [isSubscribed, setIsSubscribed] = useState(user.isSubscribed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const badgeFactory = () => {
    const isSubscribed = user.isSubscribed;
    if (isSubscribed) {
      return (
        <Badge variant="secondary" className="text-sm">
          Active
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline" className="text-sm">
          Inactive
        </Badge>
      );
    }
  };

  const handleChangePlan = async () => {
    const res = await getSubscriptions(user.id);
    console.log(res);

    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("id", user.id);
        formData.append("isSubscribed", String(!isSubscribed));

        const result = await updateUser(formData);

        if (result.message === "User successfully updated!") {
          setIsSubscribed(!isSubscribed);
          toast.success("Successfully updated your plan", {
            duration: 2000,
          });
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error("Error updating plan:", error);
        toast.error("Couldn't update your plan", {
          duration: 2000,
        });
      }
    });
  };

  const handleBillingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateBillingInfo = () => {
    console.log("Updated billing info:", billingInfo);
    toast.success("Billing information updated successfully", {
      duration: 2000,
    });
    setIsModalOpen(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Billing Information</CardTitle>
        <CardDescription>
          Manage your subscription and billing details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Current Plan</h3>
            <p className="text-gray-500">
              {user.isSubscribed ? "Pro Plan" : "Free Plan"}
            </p>
          </div>
          {badgeFactory()}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Billing Cycle</h3>
          <p className="text-gray-500">
            Your next billing date is August 1, 2024
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Method</h3>
          <div className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-gray-400" />
            <span>Visa ending in 1234</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Billing History</h3>
          <ul className="space-y-2">
            {mockBillingHistory.map((item) => (
              <li key={item.date} className="flex justify-between items-center">
                <span>{item.date}</span>
                <span className="text-gray-500">{item.amount}</span>
                <Link href={item.invoiceUrl}>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Invoice
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-4 place-content-end">
        <Link
          target="_blank"
          href={`https://billing.stripe.com/p/login/test_8wM17y7ej2tF5vG9AA?prefilled_email=${user.email}`}
        >
          <Button variant="outline">Customer Portal</Button>
        </Link>
        {/* <Button variant="outline" onClick={handleChangePlan}>
          Change Plan
        </Button> */}
        {/* <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Manage Billing
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Billing Information</DialogTitle>
              <DialogDescription>
                Make changes to your billing details here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardNumber" className="text-right">
                  Card Number
                </Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  value={billingInfo.cardNumber}
                  onChange={handleBillingInfoChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="expirationDate" className="text-right">
                  Expiration Date
                </Label>
                <Input
                  id="expirationDate"
                  name="expirationDate"
                  value={billingInfo.expirationDate}
                  onChange={handleBillingInfoChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cvv" className="text-right">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  name="cvv"
                  value={billingInfo.cvv}
                  onChange={handleBillingInfoChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="billingAddress" className="text-right">
                  Billing Address
                </Label>
                <Input
                  id="billingAddress"
                  name="billingAddress"
                  value={billingInfo.billingAddress}
                  onChange={handleBillingInfoChange}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateBillingInfo}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog> */}
      </CardFooter>
    </Card>
  );
};

export default BillingTab;
