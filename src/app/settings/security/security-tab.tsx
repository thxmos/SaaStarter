"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { UserDto } from "@/data-access/user";
import PasswordResetForm from "./password-reset-form";
import PasswordResetFormOAuth from "./password-reset-form-oAuth";

export default function SecurityTab({
  user,
  hasPassword,
}: {
  user: UserDto;
  hasPassword: boolean;
}) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Security Settings</CardTitle>
          <CardDescription>Manage your account's security.</CardDescription>
        </CardHeader>
        {user.oAuthProvider && !hasPassword ? (
          <PasswordResetFormOAuth user={user} />
        ) : (
          <PasswordResetForm user={user} />
        )}
      </Card>
    </>
  );
}
