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
import React, { useTransition, useRef } from "react";
import { toast } from "sonner";
import { passwordReset } from "./dashboard.action";

interface User {
  id: string;
  // is2faEnabled: boolean;
}

interface Props {
  user: User;
}

export default function SecurityTab({ user }: Props) {
  const [isPending, startTransition] = useTransition();
  // const [is2faEnabled, setIs2faEnabled] = useState(user.is2faEnabled);
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
          throw new Error(result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while updating the password");
      }
    });
  };

  // const handle2faToggle = (checked: boolean) => {
  //   startTransition(async () => {
  //     try {
  //       const formData = new FormData();
  //       formData.append("id", user.id);
  //       formData.append("is2faEnabled", checked.toString());

  //       const result = await updateUser(formData);

  //       if (result.success) {
  //         console.log("2FA status updated");
  //         setIs2faEnabled(checked);
  //         toast.success(
  //           `Two-factor authentication ${checked ? "enabled" : "disabled"}`,
  //         );
  //       } else {
  //         console.log("Error updating 2FA status:", result.message);
  //         throw new Error(result.message);
  //       }
  //     } catch (error) {
  //       console.error("Error updating 2FA status:", error);
  //       toast.error("Couldn't update two-factor authentication status");
  //     }
  //   });
  // };

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
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Update Password"}
            </Button>
          </CardFooter>
        </form>
      </Card>
      {/* <Card>
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
              disabled={isPending}
            />
            <Label htmlFor="2fa">
              {isPending ? "Updating..." : "Enable Two-Factor Authentication"}
            </Label>
          </div>
        </CardContent>
      </Card> */}
    </>
  );
}
