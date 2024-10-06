"use client";

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
import Link from "next/link";

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

const BillingTab: React.FC = () => {
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
          <h3 className="text-lg font-semibold mb-2" id="billing-history">
            Billing History
          </h3>
          <ul className="space-y-2" aria-labelledby="billing-history">
            {mockBillingHistory.map((item, index) => (
              <li key={item.date} className="flex justify-between items-center">
                <span>{item.date}</span>
                <span className="text-gray-500">{item.amount}</span>
                <Link
                  href={item.invoiceUrl}
                  aria-label={`Download invoice for ${item.date}`}
                >
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4 mr-2" aria-hidden="true" />
                    <span className="sr-only">Download</span>
                    <span aria-hidden="true">Invoice</span>
                  </Button>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-4">
        <Link target="_blank" href={`/subscribe`}>
          <Button>
            <span className="sr-only">
              Access customer portal to manage your subscription
            </span>
            <span aria-hidden="true">Customer Portal</span>
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default BillingTab;
