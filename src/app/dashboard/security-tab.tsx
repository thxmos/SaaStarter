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
import { Switch } from "@/components/ui/switch";
import { TabsContent } from "@/components/ui/tabs";
import React, { useState, useTransition, useRef } from "react";
import { passwordReset } from "./dashboard.action";
import { toast } from "sonner";

interface Props {
  user: any;
}

const SecurityTab: React.FC<Props> = ({ user }) => {
  const [isPending, startTransition] = useTransition();
  const [is2faEnabled, setIs2faEnabled] = useState(user.is2faEnabled);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        const result = await passwordReset(formData, user.id);
        if (result.success) {
          toast.success(result.message);
          formRef.current?.reset();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the password");
      }
    });
  };

  //TODO: Implement handle2faToggle function
  const handle2faToggle = (checked: boolean) => {
    setIs2faEnabled(checked);
    toast.success(
      `Two-factor authentication ${checked ? "enabled" : "disabled"}`,
    );
  };

  return (
    <TabsContent value="security" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="2fa"
              checked={is2faEnabled}
              onCheckedChange={handle2faToggle}
            />
            <Label htmlFor="2fa">Enable Two-Factor Authentication</Label>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SecurityTab;
