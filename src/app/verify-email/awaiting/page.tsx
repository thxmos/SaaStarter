"use client";

import { useState, useTransition } from "react";
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
import { Loader2, Mail, AlertCircle, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import React from "react";
import { toast } from "sonner";
import { sendResetEmail } from "@/actions/email.actions";

export default function AwaitingVerification({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const [email, setEmail] = useState(searchParams.email ?? "");
  const [isPending, startTransition] = useTransition();
  const [resendStatus, setResendStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleResendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResendStatus("idle");

    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement;

    if (!emailInput || !emailInput.value) {
      setResendStatus("error");
      toast.error("Please enter your email address");
      return;
    }

    const email = emailInput.value;

    startTransition(async () => {
      try {
        const result = await sendResetEmail(email);
        setResendStatus("success");
        toast.success("Verification email sent successfully");
      } catch (error) {
        console.error("Error sending reset email:", error);
        setResendStatus("error");
        toast.error("An unexpected error occurred. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-[400px] max-w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Verify Your Email
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-center" aria-hidden="true">
            <Mail className="h-12 w-12 text-blue-500" />
          </div>
          <p className="text-center text-gray-600">
            We've sent a verification email to your inbox. Please check your
            email and click on the verification link to activate your account.
          </p>
          {resendStatus === "success" && (
            <Alert>
              <CheckCircle className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Email Sent!</AlertTitle>
              <AlertDescription>
                A new verification email has been sent to your inbox.
              </AlertDescription>
            </Alert>
          )}
          {resendStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Failed to resend verification email. Please try again later.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        {resendStatus !== "success" && (
          <CardFooter>
            <form onSubmit={handleResendEmail} className="w-full space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-required="true"
                  aria-invalid={resendStatus === "error"}
                  aria-describedby="email-error"
                />
                {resendStatus === "error" && (
                  <p id="email-error" className="text-red-500" role="alert">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <Button
                className="w-full"
                type="submit"
                disabled={isPending}
                aria-disabled={isPending}
                aria-busy={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2
                      className="mr-2 h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    <span className="sr-only">
                      Resending verification email
                    </span>
                    Resending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </Button>
            </form>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
