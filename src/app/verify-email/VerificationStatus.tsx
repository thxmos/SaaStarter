"use client";

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
    <CheckCircle className="h-12 w-12 text-green-500" />
  ) : (
    <AlertCircle className="h-12 w-12 text-red-500" />
  );

  const buttonText = isVerified
    ? "Go to Dashboard"
    : "Resend Verification Email";
  const buttonHref = isVerified ? "/auth" : "/resend-verification";

  return (
    <Card className="w-[350px] max-w-[90%]">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">{icon}</div>
        <CardTitle className="text-2xl font-bold text-center">
          Email Verification
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-center text-gray-600">{message}</p>
      </CardContent>
      <CardFooter className="flex justify-center flex-col">
        <Button asChild>
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
        <div className="flex items-center justify-center mb-4">
          {isVerified && <TimedRedirect />}
        </div>
      </CardFooter>
    </Card>
  );
}
