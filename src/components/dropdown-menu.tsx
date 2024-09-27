"use client";

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

const DropdownMenu: React.FC<Props> = ({ user }) => {
  if (user)
    return (
      <DropdownWrapper>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer">
            <AvatarImage src={user.avatar} />
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
      </DropdownWrapper>
    );
  else return;
};

export default DropdownMenu;
