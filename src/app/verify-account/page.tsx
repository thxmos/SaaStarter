"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VerificationStatus {
  isVerified: boolean;
  isNewlyVerified: boolean;
  isTokenExpired: boolean;
}

const mockStatus: VerificationStatus = {
  isVerified: false,
  isNewlyVerified: false,
  isTokenExpired: false,
};

export default function EmailVerification() {
  const [status, setStatus] = useState<VerificationStatus | null>(mockStatus);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const checkVerificationStatus = async () => {
    setIsLoading(true);
    try {
      // Replace this with your actual API call
      const response = await fetch("/api/verify-email");
      const data: VerificationStatus = await response.json();
      // setStatus(data);
    } catch (error) {
      console.error("Error checking verification status:", error);
      // setStatus({
      //   isVerified: false,
      //   isNewlyVerified: false,
      //   isTokenExpired: true,
      // });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkVerificationStatus();
  }, []);

  const handleContinue = () => {
    // Redirect to the main app or dashboard
    router.push("/dashboard");
  };

  const handleResendEmail = async () => {
    setIsLoading(true);
    try {
      // Replace this with your actual API call to resend the verification email
      await fetch("/api/resend-verification-email", { method: "POST" });
      toast({
        title: "Verification Email Sent",
        description: "Please check your inbox for the new verification link.",
      });
    } catch (error) {
      console.error("Error resending verification email:", error);
      toast({
        title: "Error",
        description: "Failed to resend verification email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (status === null) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {status.isVerified
              ? "Email Verified"
              : status.isTokenExpired
              ? "Verification Expired"
              : "Verification Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {status.isVerified ? (
            <CheckCircle2 className="w-16 h-16 mx-auto text-green-500 mb-4" />
          ) : status.isTokenExpired ? (
            <AlertCircle className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
          ) : (
            <XCircle className="w-16 h-16 mx-auto text-red-500 mb-4" />
          )}
          <CardDescription className="text-lg">
            {status.isVerified
              ? status.isNewlyVerified
                ? "Your account has been successfully verified."
                : "Your account is already verified."
              : status.isTokenExpired
              ? "Your verification link has expired. Please request a new one."
              : "We couldn't verify your email. Please try again or contact support."}
          </CardDescription>
          {status.isTokenExpired && (
            <p className="mt-2 text-sm text-muted-foreground">
              Verification links expire after 48 hours for security reasons.
            </p>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          {status.isVerified ? (
            <Button onClick={handleContinue}>Continue to Dashboard</Button>
          ) : status.isTokenExpired ? (
            <Button onClick={handleResendEmail} disabled={isLoading}>
              {isLoading ? "Sending..." : "Resend Verification Email"}
            </Button>
          ) : (
            <Button onClick={checkVerificationStatus} disabled={isLoading}>
              {isLoading ? "Checking..." : "Try Again"}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
