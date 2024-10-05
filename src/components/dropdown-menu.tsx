"use client";

import { useState } from "react";
import { logout } from "@/actions/auth.actions";
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
import { LogOut, Settings, User } from "lucide-react";
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
        <Avatar
          className="cursor-pointer"
          role="button"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="User menu"
        >
          <AvatarImage src={user.avatar} alt="" />
          <AvatarFallback className="bg-red-500 text-white text-xs">
            {getInitials(user.name!)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 mt-1 rounded-t-none border-none"
        role="menu"
        aria-label="User account options"
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {[
            {
              href: "/dashboard",
              label: "Dashboard",
              icon: User,
            },
            {
              href: "/settings",
              label: "Settings",
              icon: Settings,
            },
            {
              href: "#",
              label: "Sign Out",
              icon: LogOut,
              onClick: handleLogout,
            },
          ].map((item, index) => (
            <DropdownMenuItem asChild key={index}>
              {
                <Link
                  href={item.href}
                  className="flex items-center justify-between w-full"
                  onClick={item.onClick ?? closeDropdown}
                  role="menuitem"
                >
                  <span>{item.label}</span>
                  <item.icon className="text-sm" aria-hidden="true" />
                </Link>
              }
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownWrapper>
  );
}
