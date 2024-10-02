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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useTransition, useRef, useEffect, useState } from "react";
import { toast } from "sonner";
import { passwordReset } from "./settings.action";
import { SessionUser } from "@/lib/lucia";
import { getUserAction } from "@/actions/lucia.actions";

export default function SecurityTab() {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const [user, setUser] = useState<SessionUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { user } = await getUserAction();
        setUser(user);
      } catch (error) {
        console.error("Failed to fetch user:", error);
        toast.error("Failed to load user data");
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (!user) {
      toast.error("User data not available");
      return;
    }

    startTransition(async () => {
      try {
        const result = await passwordReset(formData, user.id);
        if (result.success) {
          toast.success(result.message);
          formRef.current?.reset();
        } else {
          throw new Error(result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the password");
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Security Settings</CardTitle>
          <CardDescription>Manage your account's security.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} ref={formRef}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                required
                minLength={8}
                aria-describedby="current-password-hint"
              />
              <p
                id="current-password-hint"
                className="text-sm text-muted-foreground"
              >
                Password must be at least 8 characters long
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                name="newPassword"
                type="password"
                required
                minLength={8}
                aria-describedby="new-password-hint"
              />
              <p
                id="new-password-hint"
                className="text-sm text-muted-foreground"
              >
                New password must be at least 8 characters long
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                aria-describedby="confirm-password-hint"
              />
              <p
                id="confirm-password-hint"
                className="text-sm text-muted-foreground"
              >
                Confirm password must be at least 8 characters long
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending || !user}>
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </>
  );
}
