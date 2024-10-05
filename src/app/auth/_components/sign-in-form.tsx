"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { RiGoogleFill } from "@remixicon/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getGoogleOauthConsentUrl, signIn } from "@/actions/auth.actions";
import { BeatLoader } from "react-spinners";
import ForgotPasswordForm from "./forgot-password-form";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignInSchema = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const router = useRouter();

  const form = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (values: SignInSchema) => {
    setIsSubmitting(true);
    try {
      const res = await signIn(values);
      if (res.success) {
        toast.success("Login successful");
        router.push("/dashboard");
      } else {
        toast.error(res.error || "Login failed");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const res = await getGoogleOauthConsentUrl();
      if (res.url) {
        window.location.href = res.url;
      } else {
        toast.error(res.error || "Failed to get Google sign-in URL");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <Card className="min-w-[400px]">
      <CardHeader>
        <CardTitle>
          {isResetPassword ? "Reset Password" : "Welcome back!"}
        </CardTitle>
        <CardDescription>
          {isResetPassword
            ? "Enter your email to reset your password."
            : "Sign in to your account to continue."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isResetPassword ? (
          <ForgotPasswordForm setIsResetPassword={setIsResetPassword} />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password..."
                        {...field}
                        onChange={(e) => field.onChange(e.target.value.trim())}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <BeatLoader size={10} color="white" />
                ) : (
                  "Login"
                )}
              </Button>
            </form>
            <Button
              variant="link"
              className="p-0 h-auto font-normal w-full"
              onClick={() => setIsResetPassword(true)}
            >
              Forgot Password? Click here to reset
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            <Button
              onClick={handleGoogleSignIn}
              variant="secondary"
              className="w-full"
            >
              <RiGoogleFill className="w-4 h-4 mr-2" />
              Google
            </Button>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default SignInForm;
