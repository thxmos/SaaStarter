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
import { CreditCard, Download, Settings } from "lucide-react";
import { TabsContent } from "@radix-ui/react-tabs";

interface Props {
  user: any;
}

const BillingTab: React.FC<Props> = ({ user }) => {
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
            <p className="text-gray-500">Pro Plan</p>
          </div>
          <Badge variant="secondary" className="text-sm">
            Active
          </Badge>
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
            <li className="flex justify-between items-center">
              <span>July 1, 2024</span>
              <span className="text-gray-500">$29.99</span>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Invoice
              </Button>
            </li>
            <li className="flex justify-between items-center">
              <span>June 1, 2024</span>
              <span className="text-gray-500">$29.99</span>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Invoice
              </Button>
            </li>
          </ul>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-4 place-content-end">
        <Button variant="outline">Change Plan</Button>
        <Button>
          <Settings className="h-4 w-4 mr-2" />
          Manage Billing
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BillingTab;
