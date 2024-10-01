"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download } from "lucide-react";
import { useSession } from "@/providers/session-provider";
import Link from "next/link";

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

  // const [isSubscribed, setIsSubscribed] = useState(user.isSubscribed);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Billing Information</CardTitle>
        <CardDescription>
          Manage your subscription and billing details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
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
      <CardFooter className="flex space-x-4">
        <Link
          target="_blank"
          // TODO: change this so it's not hardcoded
          href={`https://billing.stripe.com/p/login/test_8wM17y7ej2tF5vG9AA?prefilled_email=${user.email}`}
        >
          <Button>Customer Portal</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BillingTab;
