import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TimedRedirect from "@/components/timed-redirect";

interface VerificationProps {
  message: string;
  isVerified: boolean;
}

export default function VerificationStatus({
  message,
  isVerified,
}: VerificationProps) {
  const icon = isVerified ? (
    <CheckCircle className="h-12 w-12 text-green-500" aria-hidden="true" />
  ) : (
    <AlertCircle className="h-12 w-12 text-red-500" aria-hidden="true" />
  );

  const buttonText = isVerified ? "Go to Login" : "Resend Verification Email";

  return (
    <Card
      className="w-[350px] max-w-[90%]"
      role="region"
      aria-label="Email Verification Status"
    >
      <CardHeader>
        <div
          className="flex items-center justify-center mb-4"
          aria-hidden="true"
        >
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold text-center">
          Email Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-600" aria-live="polite">
          {message}
        </p>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
        <Button asChild>
          <Link href="/auth" aria-label={buttonText}>
            {buttonText}
          </Link>
        </Button>
        <div className="flex items-center justify-center mb-4">
          {isVerified && <TimedRedirect />}
        </div>
      </CardFooter>
    </Card>
  );
}
