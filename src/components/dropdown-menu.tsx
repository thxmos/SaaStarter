"use client";

import { useState } from "react";
import { logout } from "@/app/auth/auth.action";
import Link from "next/link";
import {
  DropdownMenu as DropdownWrapper,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LogOut, User } from "lucide-react";
import { getInitials } from "@/helpers";

interface Props {
  user: any;
}

export default function DropdownMenu({ user }: Props) {
  const [open, setOpen] = useState(false);

  if (!user) return null;

  const closeDropdown = () => setOpen(false);

  const handleLogout = async () => {
    closeDropdown();
    await logout();
  };

  return (
    <DropdownWrapper open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-red-500 text-white text-xs">
            {getInitials(user.name!)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-1 rounded-t-none border-none">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href="/dashboard"
              className="flex items-center justify-between w-full"
              onClick={closeDropdown}
            >
              <p>Dashboard</p>
              <User className="text-sm" />
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <button
              onClick={handleLogout}
              className="flex items-center justify-between w-full"
            >
              <p>Sign Out</p>
              <LogOut className="text-sm" />
            </button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownWrapper>
  );
}
