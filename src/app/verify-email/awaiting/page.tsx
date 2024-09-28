"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AwaitingVerification() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [resendStatus, setResendStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleResendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsResending(true);
    setResendStatus("idle");

    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setResendStatus("success");
    } catch (error) {
      setResendStatus("error");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="w-[400px] max-w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center">
            <Mail className="h-12 w-12 text-blue-500" />
          </div>
          <p className="text-center text-gray-600">
            We've sent a verification email to your inbox. Please check your
            email and click on the verification link to activate your account.
          </p>
          {resendStatus === "success" && (
            <Alert>
              <AlertTitle>Email Sent!</AlertTitle>
              <AlertDescription>
                A new verification email has been sent to your inbox.
              </AlertDescription>
            </Alert>
          )}
          {resendStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to resend verification email. Please try again later.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleResendEmail} className="w-full space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={isResending}>
              {isResending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resending...
                </>
              ) : (
                "Resend Verification Email"
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
