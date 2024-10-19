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
import { ChevronDown, Download } from "lucide-react";
import Link from "next/link";
import { SessionUser } from "@/lib/lucia";
import { Price, Product } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import Image from "next/image";

const mockBillingHistory = (year: string) => [
  {
    date: `December 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/december-${year}.pdf`,
  },
  {
    date: `November 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/november-${year}.pdf`,
  },
  {
    date: `October 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/october-${year}.pdf`,
  },
  {
    date: `September 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/september-${year}.pdf`,
  },
  {
    date: `August 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/august-${year}.pdf`,
  },
  {
    date: `July 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/july-${year}.pdf`,
  },
  {
    date: `June 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/june-${year}.pdf`,
  },
  {
    date: `May 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/may-${year}.pdf`,
  },
  {
    date: `April 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/april-${year}.pdf`,
  },
  {
    date: `March 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/march-${year}.pdf`,
  },
  {
    date: `February 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/february-${year}.pdf`,
  },
  {
    date: `January 1, ${year}`,
    amount: "$29.99",
    invoiceUrl: `/invoices/january-${year}.pdf`,
  },
];

export default function BillingTab({
  user,
  billingInfo,
}: {
  user: SessionUser;
  billingInfo: { price: Price; product: Product };
}) {
  const [selectedYear, setSelectedYear] = useState("2024");

  const years = ["2024", "2023", "2022", "2021", "2020"];

  const { price, product } = billingInfo;
  const unitAmount = Number(price.unitAmount) / 100; // Convert BigInt to number and divide by 100 if it's in cents

  return (
    <span className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Subscription Details</CardTitle>
          <CardDescription>Manage your subscription plan</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2" id="billing-history">
              {product.name}
            </h3>
            {billingInfo ? (
              <div className="flex flex-col gap-2">
                <p>{product.description}</p>
                {/* <Image
                  src={product.image ?? ""}
                  alt={`${product.name} image`}
                  width={320}
                  height={240}
                  className="w-full max-w-xs h-auto object-contain"
                /> */}
                <h4>
                  ${unitAmount} {price.currency?.toUpperCase()}
                </h4>
              </div>
            ) : (
              <h4>No active subscription</h4>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex space-x-4">
          <Link target="_blank" href={`/subscribe`}>
            <Button>
              <span className="sr-only">
                Access customer portal to manage your subscription plan
              </span>
              <span aria-hidden="true">
                {billingInfo ? "Change Plan" : "View Plans"}
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Billing Information</CardTitle>
          <CardDescription>
            Manage your billing details and view your invoices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2" id="billing-history">
              Billing History
            </h3>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedYear} <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {years.map((year) => (
                  <DropdownMenuItem
                    key={year}
                    onSelect={() => setSelectedYear(year)}
                  >
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <ul className="space-y-2 mt-4" aria-labelledby="billing-history">
              {mockBillingHistory(selectedYear).map((item) => (
                <li
                  key={item.date}
                  className="flex justify-between items-center hover:bg-gray-50 transition-colors duration-300 p-2 rounded-md"
                >
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
      </Card>
    </span>
  );
}
