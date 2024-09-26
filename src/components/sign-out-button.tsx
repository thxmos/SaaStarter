"use client";

import { logout } from "@/app/auth/auth.action";
import { Button } from "./ui/button";

interface Props {
  children: React.ReactNode;
}

const SignOutButton: React.FC<Props> = ({ children }) => {
  return (
    <Button onClick={() => logout()} variant="destructive">
      {children}
    </Button>
  );
};

export default SignOutButton;
