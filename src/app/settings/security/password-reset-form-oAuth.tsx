"use client";

import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useTransition, useRef } from "react";
import { toast } from "sonner";
import { setPasswordOAuth } from "./security.actions";
import { UserDto } from "@/data-access/user";
import { useRouter } from "next/navigation";

type Props = {
  user: UserDto;
};

const PasswordResetFormOAuth: React.FC<Props> = ({ user }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      try {
        await setPasswordOAuth(formData, user.id);
        toast.success("Successfully set password");
        formRef.current?.reset();
        router.refresh();
      } catch (error) {
        toast.error("An error occurred while updating the password");
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      ref={formRef}
      aria-label="Password Change Form"
    >
      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm">
          Looks like you've signed with an external account provider.
        </p>
        <p className="text-muted-foreground text-sm">
          Set a password below to enable password-based authentication for your
          account.
        </p>
        <div className="space-y-2">
          <Label htmlFor="new-password">Set Password</Label>
          <Input
            id="new-password"
            name="newPassword"
            type="password"
            required
            minLength={8}
            aria-describedby="new-password-hint"
            aria-required="true"
          />
          <p id="new-password-hint" className="text-sm text-muted-foreground">
            New password must be at least 8 characters long
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirm-password">Confirm Password</Label>
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            minLength={8}
            aria-describedby="confirm-password-hint"
            aria-required="true"
          />
          <p
            id="confirm-password-hint"
            className="text-sm text-muted-foreground"
          >
            Confirm password must match the new password
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          aria-live="polite"
        >
          {isPending ? "Updating..." : "Set Password"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default PasswordResetFormOAuth;
