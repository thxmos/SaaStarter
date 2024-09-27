"use client";

import { logout } from "@/app/auth/auth.action";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {
  user: any;
}

const LoginButton: React.FC<Props> = ({ user }) => {
  if (user) {
    return (
      <Button onClick={() => logout()} variant="destructive">
        Log Out
      </Button>
    );
  } else {
    return (
      <Link
        href="/auth"
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        Log In
      </Link>
    );
  }
};

export default LoginButton;
