"use client";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import SignOutButton from "./sign-out-button";
import { Cpu, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/app/auth/auth.action";

interface Props {
  user: User | null;
}

const Navbar: React.FC<Props> = ({ user }) => {
  const getInitials = (name: string): string => {
    const words = name.split(" ");
    const initials = words.map((word) => word.charAt(0).toUpperCase()).join("");
    return initials;
  };

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Link className="flex items-center justify-center" href="/">
        <Cpu className="h-6 w-6 text-primary" />
        <span className="sr-only">SaaSy</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/#features"
        >
          Features
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/#pricing"
        >
          Pricing
        </Link>
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/#contact"
        >
          Contact
        </Link>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.avatar ?? ""} />
                <AvatarFallback className="bg-red-500 text-white text-xs">
                  {getInitials(user.name!)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mt-1 rounded-t-none border-none">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <Link
                    href="/dashboard"
                    className="flex items-center justify-between w-full"
                  >
                    <p>Dashboard</p>
                    <User className="text-sm" />
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => logout()}>
                  <div className="flex items-center justify-between w-full">
                    <p>Sign Out</p>
                    <LogOut className="text-sm" />
                  </div>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {/* {user && <SignOutButton>Sign Out</SignOutButton>} */}
        {!user && (
          <Link
            href="/auth"
            className="text-sm font-medium hover:underline underline-offset-4"
          >
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
